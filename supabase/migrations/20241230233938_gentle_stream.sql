/*
  # Add profiles and credits management

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `name` (text)
      - `credits` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Functions
    - `add_user_credits`: Function to safely add credits to user
    - `handle_new_user`: Trigger function to create profile on signup
    - `handle_toy_posted`: Trigger function to add credits when toy is posted

  3. Security
    - RLS policies for profiles table
    - Secure functions with SECURITY DEFINER
*/

-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text,
  credits integer DEFAULT 100,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view any profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies
CREATE POLICY "Users can view any profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Function to add credits
CREATE OR REPLACE FUNCTION add_user_credits(user_id uuid, credits_to_add integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_credits integer;
BEGIN
  UPDATE profiles
  SET credits = credits + credits_to_add,
      updated_at = now()
  WHERE id = user_id
  RETURNING credits INTO new_credits;
  
  RETURN new_credits;
END;
$$;

-- Handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO profiles (id, name, credits)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    100
  );
  RETURN new;
END;
$$;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Handle toy posting credits
CREATE OR REPLACE FUNCTION handle_toy_posted()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Add 10 credits for posting a toy
  PERFORM add_user_credits(new.owner_id, 10);
  RETURN new;
END;
$$;

-- Create trigger for toy posting
DROP TRIGGER IF EXISTS on_toy_posted ON toys;
CREATE TRIGGER on_toy_posted
  AFTER INSERT ON toys
  FOR EACH ROW
  EXECUTE FUNCTION handle_toy_posted();