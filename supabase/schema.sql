-- ==============================================================================
-- NOVA AI — PRIVATE PERSONAL AI PARTNER CONSOLIDATED DATABASE SCHEMA
-- Paste this entire SQL into your Supabase Dashboard -> SQL Editor and click RUN.
-- ==============================================================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'New conversation',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON public.conversations(updated_at DESC);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations"
  ON public.conversations FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations"
  ON public.conversations FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
  ON public.conversations FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
  ON public.conversations FOR DELETE USING (auth.uid() = user_id);

-- 3. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON public.messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at ASC);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own messages"
  ON public.messages FOR SELECT
  USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = messages.conversation_id AND c.user_id = auth.uid())
  );

CREATE POLICY "Users can insert their own messages"
  ON public.messages FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = messages.conversation_id AND c.user_id = auth.uid())
  );

CREATE POLICY "Users can update their own messages"
  ON public.messages FOR UPDATE
  USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = messages.conversation_id AND c.user_id = auth.uid())
  )
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = messages.conversation_id AND c.user_id = auth.uid())
  );

CREATE POLICY "Users can delete their own messages"
  ON public.messages FOR DELETE
  USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.conversations c WHERE c.id = messages.conversation_id AND c.user_id = auth.uid())
  );

-- 4. DOCUMENTS TABLE (PRIVATE KNOWLEDGE BASE)
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  storage_path TEXT,
  mime_type TEXT,
  file_size BIGINT DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ready' CHECK (status IN ('uploading', 'processing', 'ready', 'failed')),
  page_count INTEGER DEFAULT 1,
  title TEXT,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_documents_user_id ON public.documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON public.documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_status ON public.documents(status);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents"
  ON public.documents FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
  ON public.documents FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
  ON public.documents FOR DELETE USING (auth.uid() = user_id);

-- 5. DOCUMENT CHUNKS TABLE (SEMANTIC & VECTOR SEARCH)
CREATE TABLE IF NOT EXISTS public.document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  page_number INTEGER DEFAULT 1,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  embedding TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chunks_document_id ON public.document_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_chunks_user_id ON public.document_chunks(user_id);
CREATE INDEX IF NOT EXISTS idx_chunks_page_number ON public.document_chunks(page_number);

ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own document chunks"
  ON public.document_chunks FOR SELECT
  USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_chunks.document_id AND d.user_id = auth.uid())
  );

CREATE POLICY "Users can insert their own document chunks"
  ON public.document_chunks FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_chunks.document_id AND d.user_id = auth.uid())
  );

CREATE POLICY "Users can update their own document chunks"
  ON public.document_chunks FOR UPDATE
  USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_chunks.document_id AND d.user_id = auth.uid())
  )
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_chunks.document_id AND d.user_id = auth.uid())
  );

CREATE POLICY "Users can delete their own document chunks"
  ON public.document_chunks FOR DELETE
  USING (
    auth.uid() = user_id
    AND EXISTS (SELECT 1 FROM public.documents d WHERE d.id = document_chunks.document_id AND d.user_id = auth.uid())
  );

-- 6. LONG-TERM PERSONAL MEMORIES TABLE
CREATE TABLE IF NOT EXISTS public.memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'fact' CHECK (category IN ('preference', 'project', 'education', 'work', 'personal', 'instruction', 'fact', 'other')),
  importance INTEGER NOT NULL DEFAULT 3 CHECK (importance BETWEEN 1 AND 5),
  embedding TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_memories_user_id ON public.memories(user_id);
CREATE INDEX IF NOT EXISTS idx_memories_category ON public.memories(category);
CREATE INDEX IF NOT EXISTS idx_memories_importance ON public.memories(importance DESC);

ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own memories"
  ON public.memories FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own memories"
  ON public.memories FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memories"
  ON public.memories FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own memories"
  ON public.memories FOR DELETE USING (auth.uid() = user_id);

-- 7. KNOWLEDGE ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.knowledge_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  embedding TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_knowledge_user_id ON public.knowledge_items(user_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON public.knowledge_items(category);

ALTER TABLE public.knowledge_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own knowledge items"
  ON public.knowledge_items FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own knowledge items"
  ON public.knowledge_items FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own knowledge items"
  ON public.knowledge_items FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own knowledge items"
  ON public.knowledge_items FOR DELETE USING (auth.uid() = user_id);
