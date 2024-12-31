/*
  # Create toys table and related schemas

  1. New Tables
    - `toys`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `age_range` (text)
      - `condition` (text)
      - `images` (jsonb array)
      - `owner_id` (uuid, references auth.users)
      - `location` (jsonb)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `likes` (uuid array)

  2. Security
    - Enable RLS on toys table
    - Add policies for CRUD operations
*/

-- Create enum for toy conditions
CREATE TYPE toy_condition AS ENUM ('New', 'Like New', 'Good', 'Fair');

-- Create toys table
CREATE TABLE IF NOT EXISTS toys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  age_range text NOT NULL,
  condition toy_condition NOT NULL,
  images jsonb[] NOT NULL,
  owner_id uuid NOT NULL REFERENCES auth.users(id),
  location jsonb NOT NULL,
  status text NOT NULL DEFAULT 'available',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  likes uuid[] DEFAULT ARRAY[]::uuid[]
);

-- Enable RLS
ALTER TABLE toys ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view available toys"
  ON toys
  FOR SELECT
  USING (status = 'available');

CREATE POLICY "Users can create their own toys"
  ON toys
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own toys"
  ON toys
  FOR UPDATE
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own toys"
  ON toys
  FOR DELETE
  USING (auth.uid() = owner_id);

-- Create indexes
CREATE INDEX toys_status_idx ON toys(status);
CREATE INDEX toys_owner_id_idx ON toys(owner_id);
CREATE INDEX toys_created_at_idx ON toys(created_at DESC);