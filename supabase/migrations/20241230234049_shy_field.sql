/*
  # Add toys table and related functions

  1. New Tables
    - `toys`
      - `id` (uuid)
      - `name` (text)
      - `description` (text)
      - `age_range` (text)
      - `condition` (text)
      - `images` (jsonb)
      - `owner_id` (uuid, references profiles)
      - `location` (jsonb)
      - `status` (text)
      - `likes` (uuid[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - RLS policies for toys table
    - Policies for viewing, creating, updating, and deleting toys
*/

-- Create toys table
CREATE TABLE IF NOT EXISTS toys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  age_range text NOT NULL,
  condition text NOT NULL,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  owner_id uuid REFERENCES auth.users(id) NOT NULL,
  location jsonb NOT NULL,
  status text NOT NULL DEFAULT 'available',
  likes uuid[] DEFAULT ARRAY[]::uuid[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE toys ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view available toys" ON toys;
DROP POLICY IF EXISTS "Users can create toys" ON toys;
DROP POLICY IF EXISTS "Users can update own toys" ON toys;
DROP POLICY IF EXISTS "Users can delete own toys" ON toys;

-- Create new policies
CREATE POLICY "Anyone can view available toys"
  ON toys
  FOR SELECT
  USING (status = 'available');

CREATE POLICY "Users can create toys"
  ON toys
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update own toys"
  ON toys
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete own toys"
  ON toys
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Add indexes
CREATE INDEX IF NOT EXISTS toys_owner_id_idx ON toys(owner_id);
CREATE INDEX IF NOT EXISTS toys_status_idx ON toys(status);
CREATE INDEX IF NOT EXISTS toys_created_at_idx ON toys(created_at DESC);

-- Drop existing constraint if it exists
ALTER TABLE toys DROP CONSTRAINT IF EXISTS toys_status_check;

-- Add constraint for valid status values
ALTER TABLE toys ADD CONSTRAINT toys_status_check 
  CHECK (status IN ('available', 'matched', 'deleted'));