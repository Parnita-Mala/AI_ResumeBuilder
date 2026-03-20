-- SQL Script for Setting Up AI Resume Builder

-- 1. Create the resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    user_id UUID DEFAULT auth.uid(),
    user_email TEXT NOT NULL,
    content JSONB NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- 3. Create Policies

-- Allow users to view their own resumes by user_id
CREATE POLICY "Users can view their own resumes by ID" 
ON public.resumes FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to view their own resumes by email (for non-authenticated lookups)
CREATE POLICY "Users can view their own resumes by email" 
ON public.resumes FOR SELECT 
USING (user_email = auth.jwt()->>'email');

-- Allow users to insert their own resumes
CREATE POLICY "Users can insert their own resumes" 
ON public.resumes FOR INSERT 
WITH CHECK (
    (auth.uid() = user_id) OR 
    (auth.uid() IS NULL AND user_email IS NOT NULL)
);

-- Allow users to update their own resumes
CREATE POLICY "Users can update their own resumes" 
ON public.resumes FOR UPDATE 
USING (auth.uid() = user_id OR user_email = auth.jwt()->>'email');

-- Allow users to delete their own resumes
CREATE POLICY "Users can delete their own resumes" 
ON public.resumes FOR DELETE 
USING (auth.uid() = user_id OR user_email = auth.jwt()->>'email');
