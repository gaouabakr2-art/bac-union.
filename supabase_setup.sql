-- Database schema setup for EduDash Student Dashboard
-- Copy and run this script inside the SQL Editor of your Supabase Dashboard

-- 1. Profiles Table (Holds registered student names and IDs)
CREATE TABLE IF NOT EXISTS public.profiles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Anonymous profiles Policies
CREATE POLICY "Allow anonymous read on profiles" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Allow anonymous write on profiles" 
ON public.profiles FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anonymous update on profiles" 
ON public.profiles FOR UPDATE USING (true);


-- 2. Progress Table (Holds student checkmarks per subject)
CREATE TABLE IF NOT EXISTS public.progress (
    student_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL,
    completed_chapters TEXT[] DEFAULT '{}'::text[] NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (student_id, subject_id)
);

-- Enable RLS for Progress
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Anonymous progress Policies
CREATE POLICY "Allow anonymous read/write/update on progress" 
ON public.progress FOR ALL USING (true) WITH CHECK (true);


-- 3. Student Files Table (Holds custom files uploaded by students)
CREATE TABLE IF NOT EXISTS public.student_files (
    id TEXT PRIMARY KEY,
    student_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    size BIGINT NOT NULL,
    content TEXT NOT NULL, -- base64 string
    section TEXT NOT NULL,
    subject TEXT NOT NULL,
    folder TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for Student Files
ALTER TABLE public.student_files ENABLE ROW LEVEL SECURITY;

-- Anonymous student files Policies
CREATE POLICY "Allow anonymous read/write/delete on student_files" 
ON public.student_files FOR ALL USING (true) WITH CHECK (true);
