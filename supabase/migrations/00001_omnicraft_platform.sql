-- OmniCraft Platform Schema: Categories, Tools, Blog, Feedback, Contact, Usage, System Settings
-- 100% Open Access (Zero Login / Auth Dependencies)

-- Tool Categories
CREATE TABLE IF NOT EXISTS public.tool_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color_gradient TEXT NOT NULL DEFAULT 'from-indigo-500 to-purple-600',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tools Registry
CREATE TABLE IF NOT EXISTS public.tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES public.tool_categories(id) ON DELETE CASCADE,
  icon TEXT NOT NULL,
  keywords TEXT[] NOT NULL DEFAULT '{}',
  processing_type TEXT NOT NULL DEFAULT 'client' CHECK (processing_type IN ('client', 'server', 'ai', 'hybrid')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  usage_count BIGINT NOT NULL DEFAULT 0,
  views_count BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Anonymous Tool Usage Analytics
CREATE TABLE IF NOT EXISTS public.tool_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id TEXT NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  session_id TEXT,
  processing_time_ms INTEGER NOT NULL DEFAULT 0,
  success BOOLEAN NOT NULL DEFAULT true,
  error_type TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blog Posts & Engineering Articles
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'OmniCraft Editorial',
  cover_image TEXT,
  reading_time_min INTEGER NOT NULL DEFAULT 4,
  is_published BOOLEAN NOT NULL DEFAULT true,
  views BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tool Feedback & Suggestions
CREATE TABLE IF NOT EXISTS public.tool_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id TEXT NOT NULL REFERENCES public.tools(id) ON DELETE CASCADE,
  session_id TEXT,
  is_helpful BOOLEAN NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact & Support Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived', 'replied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- System Settings
CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS for public read / insert safety
ALTER TABLE public.tool_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tool_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies for catalogs
CREATE POLICY "Public read for active tool_categories" ON public.tool_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Public read for active tools" ON public.tools FOR SELECT USING (is_active = true);
CREATE POLICY "Public read for published blog_posts" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read system settings" ON public.system_settings FOR SELECT USING (true);

-- Public insert policies for feedback, usage analytics, contact
CREATE POLICY "Public insert tool usage" ON public.tool_usage FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert feedback" ON public.tool_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_tools_category ON public.tools(category_id);
CREATE INDEX IF NOT EXISTS idx_tools_slug ON public.tools(slug);
CREATE INDEX IF NOT EXISTS idx_tools_popular ON public.tools(is_popular);
CREATE INDEX IF NOT EXISTS idx_tools_featured ON public.tools(is_featured);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_tool_usage_tool ON public.tool_usage(tool_id);
CREATE INDEX IF NOT EXISTS idx_tool_feedback_tool ON public.tool_feedback(tool_id);
