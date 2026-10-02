# 🛠️ OmniCraft — Every Tool You Need. One Place.

**OmniCraft** is a production-ready, ultra-fast, privacy-first all-in-one web utility platform providing over **240+ specialized online tools** across 17 domains. Built with **Next.js 16+ (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**, OmniCraft executes computations directly in the user's browser using **WebAssembly (Wasm)**, **Web Crypto API**, and **HTML5 Canvas** engines.

---

## 🚀 Main Features

- **240+ Production Utilities**: Extensive tool catalog spanning PDF manipulation, image optimization, audio/video editing, developer formatters, mathematical calculators, QR codes, and cryptography.
- **100% Client-Side Privacy**: Over 95% of tools process files entirely within local browser memory. Files never touch a remote server or database unless explicitly requested.
- **Zero Paywalls & No Accounts**: No sign-up walls, subscriptions, API keys, or countdown timers. Every tool is immediately functional.
- **Wasm & Canvas Hardware Acceleration**: Sub-second execution for PDF merging/splitting, image compression, and format encoding.
- **Full Technical SEO Architecture**:
  - Dynamic canonical URL generation (`getCanonicalUrl()`)
  - Unique page titles and meta descriptions
  - Schema.org JSON-LD structured data (`WebSite`, `Organization`, `WebApplication`, `BreadcrumbList`, `FAQPage`, `HowTo`, `BlogPosting`)
  - Dynamic, self-updating `sitemap.xml` and crawler-safe `robots.txt`
  - Automated Open Graph and Twitter card previews
  - Custom 404 page with integrated tool search
- **Google AdSense & Monetization Ready**:
  - Modular, non-CLS `AdBanner` component with slot types (`header`, `in-content`, `tool-bottom`, `sidebar`, `footer`)
  - Dynamic AdSense script injection (`AdSenseScript`) controlled via environment variables
  - Fully compliant trust pages: Privacy Policy (with Google DART cookie disclosures), Terms of Service, Cookie Policy, Disclaimer, and Contact
  - WCAG 2.2 accessible cookie consent banner (`CookieConsent`)
- **Responsive & Accessible**: Touch targets, keyboard navigation (`Cmd+K` palette, `Escape` handlers), dark/light mode toggle, and mobile layouts tested from 320px to 4K displays.

---

## 💻 Tech Stack

- **Framework**: Next.js 16.3+ (App Router, Turbopack, Server & Client Components)
- **Language**: TypeScript 5 (Strict Mode)
- **Runtime & UI**: React 19, Lucide Icons
- **Styling**: Tailwind CSS v4, PostCSS
- **Client Libraries**:
  - `pdf-lib` & `pdf-parse`: Browser PDF manipulation
  - `qrcode` & `jsbarcode`: Barcode & vector QR generation
  - `crypto-js`: Cryptographic hashing & encoding
  - `canvas-confetti`: Interactive success feedback
- **Backend & Integrations**:
  - `@supabase/ssr` & `@supabase/supabase-js`: Optional storage & feedback archive
  - `@emailjs/browser`: Direct contact form message delivery

---

## 🛠️ Local Development

### 1. Clone the repository
```bash
git clone https://github.com/your-username/omnicraft.git
cd omnicraft
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the template configuration file:
```bash
cp .env.example .env.local
```

### 4. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

OmniCraft uses centralized configuration (`src/lib/siteConfig.ts`). Define the following variables in your hosting dashboard or `.env.local`:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production domain URL | `https://omnicraft.dev` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token | `your_verification_token` |
| `NEXT_PUBLIC_GOOGLE_ADSENSE_ID` | Google AdSense publisher ID | `ca-pub-XXXXXXXXXXXXXXXX` |
| `NEXT_PUBLIC_ENABLE_ADS` | Toggle ad unit rendering on/off | `false` (default) |
| `NEXT_PUBLIC_SHOW_AD_PLACEHOLDERS` | Show non-intrusive ad wireframes in staging | `false` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 tracking ID (optional) | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project API URL (optional) | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous API public key (optional) | `your_anon_key` |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID for contact delivery | `service_xxxxxxx` |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template ID for contact delivery | `template_xxxxxxx` |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public account key | `your_public_key` |

---

## 🏗️ Production Build & Verification

To test the optimized production build locally:

```bash
# Build the project with Next.js Turbopack
npm run build

# Start the production server
npm run start
```

---

## 🚢 Deployment (Vercel)

OmniCraft is designed to run natively on **Vercel** or any standard Node.js server.

1. Push your code to a GitHub, GitLab, or Bitbucket repository:
   ```bash
   git add .
   git commit -m "feat: production optimization and SEO readiness"
   git push origin main
   ```
2. Go to [Vercel Dashboard](https://vercel.com/new) and import your repository.
3. In **Build and Output Settings**, keep the default settings:
   - Framework Preset: `Next.js`
   - Build Command: `next build`
   - Output Directory: `.next`
4. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-custom-domain.com`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = (your Google Search Console token)
   - Other optional variables as needed.
5. Click **Deploy**. Vercel will build and deploy your project with global Edge caching and free SSL certificates.

---

## 🔍 SEO & Google Search Console Setup

Follow this step-by-step workflow to verify your domain and submit your sitemap:

1. **Deploy Website & Connect Custom Domain**:
   - In Vercel, navigate to **Project Settings → Domains** and attach your custom domain (e.g., `omnicraft.dev`).
   - Configure your DNS A and CNAME records with your registrar and ensure automatic HTTPS is active.
2. **Set Canonical Production Domain**:
   - Set `NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com` in Vercel environment variables and redeploy.
3. **Verify Google Search Console**:
   - Open [Google Search Console](https://search.google.com/search-console).
   - Add a new property using the **URL Prefix** method (`https://your-custom-domain.com`).
   - Choose **HTML Tag** verification. Copy the string within `content="..."`.
   - Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_token` in your environment variables and redeploy.
   - Click **Verify** in Search Console.
4. **Submit Dynamic Sitemap**:
   - In Search Console, navigate to **Index → Sitemaps**.
   - Enter `sitemap.xml` and click **Submit**.
   - Verify that Google successfully parses all URLs across tools, categories, blog posts, and trust pages.
5. **Verify Robots.txt**:
   - Navigate to `https://your-custom-domain.com/robots.txt` in your browser.
   - Confirm public tools are allowed and internal routes (`/admin`, `/dashboard`, `/chat`, `/api/`) are blocked.
6. **Request Indexing**:
   - Use the **URL Inspection** tool on your homepage, key category pages, and top tool pages (`/tools/pdf-merge`, `/tools/image-compressor`, `/tools/json-formatter`) to request priority indexing.

---

## 💰 Google AdSense Setup & Review Guide

OmniCraft is pre-configured with compliant ad slots and mandatory privacy disclosures for Google AdSense approval:

### 1. Pre-Application Checklist
- [x] High-value, functional content (240+ working browser utilities).
- [x] Clear navigation with zero dead links or broken buttons.
- [x] Mandatory policy pages: Privacy Policy (including Google DART cookie clause), Terms of Service, Cookie Policy, Disclaimer, and Contact.
- [x] No fake ad containers, deceptive buttons, or clickbait prompts.
- [x] Fully responsive across mobile, tablet, and desktop screens.

### 2. Submitting for Review
1. Go to [Google AdSense](https://adsense.google.com/) and register with your production domain.
2. Google will assign you a Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`).
3. Set in your environment variables:
   ```env
   NEXT_PUBLIC_GOOGLE_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_ENABLE_ADS=true
   ```
4. Redeploy your site. The `AdSenseScript` component automatically renders Google's verification tag in the `<head>`.
5. In Google AdSense, click **Request Review**.
6. While awaiting approval, keep ads non-intrusive. Once approved, the `AdBanner` units will begin serving Google ads in designated locations (`header`, `in-content`, `tool-bottom`, `sidebar`, `footer`) without causing layout shifts.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
