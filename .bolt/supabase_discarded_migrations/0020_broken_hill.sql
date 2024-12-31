/*
  # Complete Toys Table Rebuild
  
  1. Changes:
    - Drop and recreate toys table with improved structure
    - Add comprehensive constraints and checks
    - Setup RLS policies
    - Create management functions and triggers
    
  2. Schema Details:
    - UUID primary key with auto-generation
    - Required fields: name, description, age_range, condition
    - JSON validation for images and location
    - Proper foreign key relationships
    
  3. Security:
    - Enable RLS
    - Policies for CRUD operations
    - Security definer functions
*/

-- Drop existing objects for clean slate
DROP TABLE IF EXISTS public.toys CASCADE;
DROP FUNCTION IF EXISTS handle_toy_posting CASCADE;
DROP FUNCTION IF EXISTS update_toys_updated_at CASCADE;

-- Create toys table
CREATE TABLE public.toys (
  -- Primary fields
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  age_range TEXT NOT NULL,
  condition TEXT NOT NULL CHECK (condition IN ('New', 'Like New', 'Good', 'Fair')),
  
  -- Images and media
  images JSONB NOT NULL CHECK (jsonb_array_length(images) > 0),
  
  -- Owner information
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_name TEXT NOT NULL,
  owner_location TEXT NOT NULL,
  
  -- Location data
  location JSONB NOT NULL,
  
  -- Status and engagement
  status TEXT NOT NULL DEFAULT 'available' 
    CHECK (status IN ('available', 'exchanged', 'deleted')),
  likes UUID[] DEFAULT ARRAY[]::UUID[],
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Additional constraints
  CONSTRAINT valid_location_json CHECK (jsonb_typeof(location) = 'object'),
  CONSTRAINT valid_images_array CHECK (jsonb_typeof(images) = 'array')
);

-- Enable RLS
ALTER TABLE public.toys ENABLE ROW LEVEL SECURITY;

-- Create RLS policies with unique names
CREATE POLICY "toys_select_policy_0021" ON public.toys
  FOR SELECT USING (status = 'available');

CREATE POLICY "toys_insert_policy_0021" ON public.toys
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "toys_update_policy_0021" ON public.toys
  FOR UPDATE TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "toys_delete_policy_0021" ON public.toys
  FOR DELETE TO authenticated
  USING (auth.uid() = owner_id);

-- Create timestamp management function
CREATE OR REPLACE FUNCTION update_toys_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create timestamp trigger
CREATE TRIGGER toys_updated_at
  BEFORE UPDATE ON public.toys
  FOR EACH ROW
  EXECUTE FUNCTION update_toys_updated_at();

-- Create posting reward function
CREATE OR REPLACE FUNCTION handle_toy_posting()
RETURNS TRIGGER AS $$
BEGIN
  -- Add credits to the user who posted the toy
  UPDATE profiles
  SET credits = credits + 10
  WHERE id = NEW.owner_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create posting reward trigger
CREATE TRIGGER on_toy_posted
  AFTER INSERT ON public.toys
  FOR EACH ROW
  EXECUTE FUNCTION handle_toy_posting();