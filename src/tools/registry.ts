import { ToolDefinition } from "./types";

export const TOOLS_REGISTRY: ToolDefinition[] = [
  // ==========================================
  // 1. PDF TOOLS
  // ==========================================
  {
    id: "pdf-merge",
    name: "PDF Merge",
    slug: "pdf-merge",
    category: "pdf",
    description: "Combine multiple PDF documents into a single organized file in seconds.",
    icon: "Combine",
    keywords: ["merge pdf", "combine pdf", "join pdf", "pdf binder", "merge files"],
    synonyms: ["merge documents", "pdf joiner", "put pdfs together"],
    inputType: "files",
    processingType: "client",
    isPopular: true,
    usageCount: 42300,
    seoTitle: "PDF Merge — Combine PDF Files Online for Free | OmniCraft",
    seoDescription: "Merge multiple PDF files into one clean document directly in your browser. 100% private, free, and fast.",
    howToUse: [
      { step: 1, title: "Select PDF Files", description: "Upload or drag & drop two or more PDF documents." },
      { step: 2, title: "Reorder Pages/Files", description: "Arrange files in the desired order using drag controls." },
      { step: 3, title: "Merge & Download", description: "Click Merge PDFs to instantly download your combined document." }
    ],
    features: ["Zero upload to server (100% private in browser)", "Unlimited page count", "Custom page ordering"],
    faq: [
      { question: "Are my PDFs uploaded to any server?", answer: "No. PDF Merge runs entirely in your browser using WebAssembly and PDF-Lib. Your files never leave your computer." },
      { question: "Is there a limit on file size?", answer: "You can merge files up to several hundred megabytes smoothly in modern browsers." }
    ],
    relatedToolSlugs: ["pdf-split", "pdf-compress", "pdf-rotate", "pdf-watermark"],
    componentName: "PdfMergeTool"
  },
  {
    id: "pdf-split",
    name: "PDF Split",
    slug: "pdf-split",
    category: "pdf",
    description: "Separate specific pages or split your PDF into individual single-page documents.",
    icon: "Scissors",
    keywords: ["split pdf", "extract pdf pages", "separate pdf", "cut pdf", "break pdf"],
    synonyms: ["divide pdf", "pdf page extractor"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 29800,
    seoTitle: "PDF Split — Extract Pages from PDF Online | OmniCraft",
    seoDescription: "Split PDF files into individual pages or extract specific page ranges instantly.",
    howToUse: [
      { step: 1, title: "Upload PDF", description: "Choose the PDF you wish to split." },
      { step: 2, title: "Specify Range", description: "Select page ranges like 1-3, 5, 8-10 or extract all pages." },
      { step: 3, title: "Download Split PDFs", description: "Save the resulting files individually or as a ZIP." }
    ],
    features: ["Extract custom ranges", "Split every page to individual PDF", "Browser-side speed"],
    relatedToolSlugs: ["pdf-merge", "pdf-rotate", "pdf-delete-pages"],
    componentName: "PdfSplitTool"
  },
  {
    id: "pdf-compress",
    name: "PDF Compress",
    slug: "pdf-compress",
    category: "pdf",
    description: "Reduce PDF file size while maintaining sharp text and image quality.",
    icon: "Minimize2",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "pdf size reducer", "make pdf smaller"],
    synonyms: ["shrink document", "optimize pdf", "decrease pdf mb"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 65100,
    seoTitle: "PDF Compressor — Reduce PDF File Size Online | OmniCraft",
    seoDescription: "Compress large PDF documents without losing quality. Fast, free, and completely private in browser.",
    howToUse: [
      { step: 1, title: "Select PDF", description: "Drop your large PDF document into the tool." },
      { step: 2, title: "Select Compression Level", description: "Choose between Extreme, Recommended, or High Quality." },
      { step: 3, title: "Download Optimized File", description: "Save your lightweight PDF with up to 80% size savings." }
    ],
    features: ["Lossless & lossy compression options", "Shows before & after size reduction", "No watermarks added"],
    relatedToolSlugs: ["pdf-merge", "pdf-split", "image-compressor"],
    componentName: "PdfCompressTool"
  },
  {
    id: "pdf-rotate",
    name: "PDF Rotate",
    slug: "pdf-rotate",
    category: "pdf",
    description: "Rotate individual PDF pages or entire documents 90°, 180°, or 270° degrees.",
    icon: "RotateCw",
    keywords: ["rotate pdf", "turn pdf", "change pdf orientation", "landscape to portrait pdf"],
    inputType: "file",
    processingType: "client",
    usageCount: 14200,
    seoTitle: "PDF Rotate — Rotate PDF Pages Permanently Online | OmniCraft",
    seoDescription: "Rotate upside-down or sideways PDF pages 90, 180, or 270 degrees and download immediately.",
    howToUse: [
      { step: 1, title: "Upload PDF", description: "Choose the PDF containing pages to rotate." },
      { step: 2, title: "Rotate Pages", description: "Click 90° Clockwise or Counter-Clockwise." },
      { step: 3, title: "Save PDF", description: "Download the corrected PDF document." }
    ],
    relatedToolSlugs: ["pdf-merge", "pdf-split", "pdf-compress"],
    componentName: "PdfRotateTool"
  },
  {
    id: "pdf-watermark",
    name: "PDF Watermark",
    slug: "pdf-watermark",
    category: "pdf",
    description: "Add customized text or confidentiality watermarks across your PDF pages.",
    icon: "Stamp",
    keywords: ["pdf watermark", "add watermark to pdf", "confidential watermark", "stamp pdf"],
    inputType: "file",
    processingType: "client",
    usageCount: 11500,
    seoTitle: "PDF Watermark — Add Text Stamp to PDF Documents | OmniCraft",
    seoDescription: "Apply custom text watermarks, opacity, color, and positioning to protect PDF files.",
    howToUse: [
      { step: 1, title: "Upload File", description: "Select your PDF file." },
      { step: 2, title: "Set Watermark", description: "Type text like 'CONFIDENTIAL' or 'DRAFT' and pick color/opacity." },
      { step: 3, title: "Apply & Download", description: "Export the watermarked document instantly." }
    ],
    relatedToolSlugs: ["pdf-compress", "pdf-rotate", "pdf-merge"],
    componentName: "PdfWatermarkTool"
  },

  // ==========================================
  // 2. IMAGE TOOLS
  // ==========================================
  {
    id: "image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    category: "image",
    description: "Compress JPG, PNG, and WebP images by up to 80% without visible loss in quality.",
    icon: "Minimize",
    keywords: ["compress image", "shrink photo", "reduce jpg size", "png compressor", "make photo smaller"],
    synonyms: ["optimize photo", "shrink image file", "compress jpeg"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 88400,
    seoTitle: "Image Compressor — Reduce JPG, PNG, WEBP File Size | OmniCraft",
    seoDescription: "Compress images online for free. Boost web loading speed with optimized JPG, PNG, and WEBP photos.",
    howToUse: [
      { step: 1, title: "Upload Image", description: "Drop your image (JPG, PNG, WEBP) into the compressor." },
      { step: 2, title: "Adjust Quality", description: "Use the slider to fine-tune quality vs file size savings." },
      { step: 3, title: "Download Image", description: "Download your lightweight optimized image file." }
    ],
    features: ["Visual before/after preview slider", "Interactive quality adjustment", "Instant client-side canvas engine"],
    relatedToolSlugs: ["image-resizer", "jpg-to-png", "png-to-jpg", "image-cropper"],
    componentName: "ImageCompressorTool"
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    slug: "image-resizer",
    category: "image",
    description: "Resize photos by exact pixel dimensions (width/height) or percentage while keeping aspect ratio.",
    icon: "Maximize2",
    keywords: ["resize image", "change photo dimensions", "scale image", "pixel resizer", "crop size"],
    synonyms: ["change image resolution", "make picture bigger or smaller"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 45200,
    seoTitle: "Image Resizer — Change Image Dimensions in Pixels or Percent | OmniCraft",
    seoDescription: "Resize images to exact dimensions in pixels or percentage with aspect ratio lock.",
    howToUse: [
      { step: 1, title: "Select Photo", description: "Upload the picture you want to resize." },
      { step: 2, title: "Input Dimensions", description: "Type target width/height or preset percentage." },
      { step: 3, title: "Save Resized Image", description: "Export high-resolution resized photo immediately." }
    ],
    relatedToolSlugs: ["image-compressor", "image-cropper", "passport-photo-maker"],
    componentName: "ImageResizerTool"
  },
  {
    id: "image-converter",
    name: "Image Converter",
    slug: "image-converter",
    category: "image",
    description: "Convert photos seamlessly between JPG, PNG, WebP, SVG, and GIF formats.",
    icon: "RefreshCw",
    keywords: ["convert image", "jpg to png", "png to jpg", "webp to png", "convert photo format"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 52100,
    seoTitle: "Image Converter — Convert JPG, PNG, WEBP Online | OmniCraft",
    seoDescription: "Easily switch image formats between JPG, PNG, WEBP, and BMP with 1-click in browser.",
    howToUse: [
      { step: 1, title: "Upload File", description: "Upload any image file." },
      { step: 2, title: "Select Target Format", description: "Choose PNG, JPG, WEBP, etc." },
      { step: 3, title: "Convert & Download", description: "Download converted image with perfect color fidelity." }
    ],
    relatedToolSlugs: ["image-compressor", "image-resizer", "image-base64"],
    componentName: "ImageConverterTool"
  },
  {
    id: "image-cropper",
    name: "Image Cropper",
    slug: "image-cropper",
    category: "image",
    description: "Crop photos to custom shapes or standard aspect ratios (16:9, 4:3, 1:1 square, 9:16).",
    icon: "Crop",
    keywords: ["crop image", "cut photo", "square crop", "16:9 cropper", "photo trimmer"],
    inputType: "file",
    processingType: "client",
    usageCount: 22000,
    seoTitle: "Image Cropper — Crop Photos with Aspect Ratios Online | OmniCraft",
    seoDescription: "Crop photos with precise aspect ratio presets for Instagram, YouTube, and avatar profiles.",
    howToUse: [
      { step: 1, title: "Upload Image", description: "Select the photo you want to frame." },
      { step: 2, title: "Adjust Bounding Box", description: "Drag corners or choose aspect ratio presets." },
      { step: 3, title: "Download Cropped Image", description: "Export the cropped section cleanly." }
    ],
    relatedToolSlugs: ["image-resizer", "image-compressor", "passport-photo-maker"],
    componentName: "ImageCropperTool"
  },
  {
    id: "image-color-picker",
    name: "Image Color Picker",
    slug: "image-color-picker",
    category: "image",
    description: "Extract dominant color palettes and pick exact HEX, RGB, and HSL colors from any uploaded image.",
    icon: "Pipette",
    keywords: ["color picker from image", "extract palette", "hex code from photo", "eye dropper"],
    inputType: "file",
    processingType: "client",
    isNew: true,
    usageCount: 18400,
    seoTitle: "Image Color Picker — Extract HEX & RGB from Photos | OmniCraft",
    seoDescription: "Upload any photo to extract dominant color palettes and inspect individual pixels with magnifying loupe.",
    howToUse: [
      { step: 1, title: "Upload Image", description: "Drop any graphic or screenshot." },
      { step: 2, title: "Click Pixel", description: "Hover over the image and click to sample any color." },
      { step: 3, title: "Copy Codes", description: "Copy HEX, RGB, HSL values or the extracted 6-color palette." }
    ],
    relatedToolSlugs: ["color-converter", "css-gradient-generator", "image-converter"],
    componentName: "ImageColorPickerTool"
  },
  {
    id: "meme-generator",
    name: "Meme Generator",
    slug: "meme-generator",
    category: "image",
    description: "Create funny memes with custom top and bottom caption text, fonts, and template styles.",
    icon: "Smile",
    keywords: ["meme generator", "make meme", "caption photo", "custom meme maker"],
    inputType: "file",
    processingType: "client",
    isNew: true,
    usageCount: 16700,
    seoTitle: "Meme Generator — Create Custom Memes Online Free | OmniCraft",
    seoDescription: "Upload any photo, add top & bottom impact text with black stroke, and export high-res memes.",
    howToUse: [
      { step: 1, title: "Select Template or Upload", description: "Upload your image or pick classic templates." },
      { step: 2, title: "Add Text", description: "Type Top & Bottom text, adjust font size and casing." },
      { step: 3, title: "Download Meme", description: "Save your viral meme in PNG format." }
    ],
    relatedToolSlugs: ["image-converter", "image-cropper", "image-watermark"],
    componentName: "MemeGeneratorTool"
  },

  // ==========================================
  // 3. QR & BARCODE TOOLS
  // ==========================================
  {
    id: "qr-generator",
    name: "QR Code Generator",
    slug: "qr-generator",
    category: "qr-barcode",
    description: "Generate customized high-resolution QR codes for URLs, WiFi passwords, vCards, emails, and text.",
    icon: "QrCode",
    keywords: ["qr generator", "make qr code", "wifi qr code", "custom qr with logo", "free qr code"],
    synonyms: ["create qr code", "qr maker", "barcode 2d"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 92400,
    seoTitle: "QR Code Generator — Create Custom QR Codes Free | OmniCraft",
    seoDescription: "Create custom QR codes with color accents, WiFi presets, vCard contacts, and download as PNG/SVG.",
    howToUse: [
      { step: 1, title: "Select QR Type", description: "Choose URL, Plain Text, WiFi Network, Email, or vCard Contact." },
      { step: 2, title: "Customize Design", description: "Pick foreground & background colors and error correction level." },
      { step: 3, title: "Download QR", description: "Save high-resolution QR code image in PNG format." }
    ],
    features: ["WiFi network auto-connect QR", "High error correction (H) level", "No expiry date on generated codes"],
    relatedToolSlugs: ["barcode-generator", "url-shortener", "wifi-qr"],
    componentName: "QrGeneratorTool"
  },
  {
    id: "barcode-generator",
    name: "Barcode Generator",
    slug: "barcode-generator",
    category: "qr-barcode",
    description: "Create standard 1D barcodes including Code 128, EAN-13, UPC-A, Code 39, and ITF.",
    icon: "Barcode",
    keywords: ["barcode generator", "code 128 barcode", "ean 13 generator", "upc generator", "product barcode"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 31200,
    seoTitle: "Barcode Generator — Free Code 128, EAN-13 & UPC Maker | OmniCraft",
    seoDescription: "Generate scannable industrial and retail barcodes online. Free download in PNG format.",
    howToUse: [
      { step: 1, title: "Choose Format", description: "Select Code 128, EAN-13, UPC, Code 39, or ITF." },
      { step: 2, title: "Enter Value", description: "Type your product number or tracking ID." },
      { step: 3, title: "Download Barcode", description: "Export high-contrast vector-quality barcode." }
    ],
    relatedToolSlugs: ["qr-generator", "sku-generator"],
    componentName: "BarcodeGeneratorTool"
  },

  // ==========================================
  // 4. CONVERTERS
  // ==========================================
  {
    id: "unit-converter",
    name: "Universal Unit Converter",
    slug: "unit-converter",
    category: "converters",
    description: "Convert units across Length, Weight, Temperature, Area, Volume, Speed, Time, Pressure, and Data Storage.",
    icon: "ArrowLeftRight",
    keywords: ["unit converter", "length converter", "kg to lbs", "celsius to fahrenheit", "bytes to gb"],
    synonyms: ["measurement conversion", "convert units"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 57800,
    seoTitle: "Unit Converter — Convert Length, Weight, Temp & Storage | OmniCraft",
    seoDescription: "Instant unit conversion for meters, feet, inches, kg, pounds, Celsius, Fahrenheit, MB to GB.",
    howToUse: [
      { step: 1, title: "Select Category", description: "Pick Length, Mass, Temperature, Digital Storage, Speed, etc." },
      { step: 2, title: "Choose Units", description: "Select Source and Target units." },
      { step: 3, title: "Type Value", description: "Live calculation updates in real-time." }
    ],
    relatedToolSlugs: ["currency-converter", "time-converter", "basic-calculator"],
    componentName: "UnitConverterTool"
  },
  {
    id: "currency-converter",
    name: "Live Currency Converter",
    slug: "currency-converter",
    category: "converters",
    description: "Convert 160+ world currencies with live real-time market exchange rates and historic reference.",
    icon: "Coins",
    keywords: ["currency converter", "usd to inr", "eur to usd", "live exchange rates", "forex converter"],
    synonyms: ["money converter", "dollar to rupee", "currency rates"],
    inputType: "form",
    processingType: "hybrid",
    isPopular: true,
    usageCount: 71200,
    seoTitle: "Currency Converter — Real-Time Exchange Rates | OmniCraft",
    seoDescription: "Convert USD, EUR, INR, GBP, JPY, CAD, and 160+ currencies with live updated market rates.",
    howToUse: [
      { step: 1, title: "Enter Amount", description: "Type the money amount to convert." },
      { step: 2, title: "Pick Currencies", description: "Select From and To currencies from the search dropdown." },
      { step: 3, title: "View Live Rate", description: "See instant calculation with market rate timestamp." }
    ],
    features: ["160+ world currencies", "Live external exchange API integration", "Swap button"],
    relatedToolSlugs: ["unit-converter", "emi-calculator", "investment-calculator"],
    componentName: "CurrencyConverterTool"
  },

  // ==========================================
  // 5. CALCULATORS
  // ==========================================
  {
    id: "scientific-calculator",
    name: "Scientific Calculator",
    slug: "scientific-calculator",
    category: "calculators",
    description: "Full-featured scientific calculator with trigonometry, logarithms, powers, roots, and calculation history.",
    icon: "Calculator",
    keywords: ["scientific calculator", "math calculator", "trigonometry calculator", "online calculator"],
    inputType: "custom",
    processingType: "client",
    isPopular: true,
    usageCount: 68900,
    seoTitle: "Scientific Calculator — Online Advanced Math Calculator | OmniCraft",
    seoDescription: "Perform advanced arithmetic, sin/cos/tan, log, exponentiation, and memory functions with instant feedback.",
    howToUse: [
      { step: 1, title: "Enter Expression", description: "Use keyboard or on-screen buttons to build math equations." },
      { step: 2, title: "Press Equals", description: "Get instantaneous exact precision answers." },
      { step: 3, title: "Recall History", description: "Inspect prior calculation steps with one click." }
    ],
    relatedToolSlugs: ["percentage-calculator", "emi-calculator", "bmi-calculator"],
    componentName: "ScientificCalculatorTool"
  },
  {
    id: "emi-calculator",
    name: "EMI & Loan Calculator",
    slug: "emi-calculator",
    category: "calculators",
    description: "Calculate monthly EMI, total interest payable, and amortization breakdown for home, car, or personal loans.",
    icon: "Landmark",
    keywords: ["emi calculator", "loan calculator", "home loan emi", "car loan calculator", "mortgage calculator"],
    synonyms: ["calculate loan payment", "monthly installment calculator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 84300,
    seoTitle: "EMI Calculator — Loan EMI & Interest Calculator | OmniCraft",
    seoDescription: "Calculate exact loan EMI installments, principal vs interest split, and total loan payment breakdown.",
    howToUse: [
      { step: 1, title: "Enter Loan Amount", description: "Type principal amount." },
      { step: 2, title: "Set Interest Rate & Tenure", description: "Specify annual interest rate (%) and loan duration in years/months." },
      { step: 3, title: "View EMI Summary", description: "See monthly installment, total interest, and visual pie chart." }
    ],
    features: ["Visual Principal vs Interest ratio chart", "Monthly & Yearly amortization", "Custom tenure toggles"],
    relatedToolSlugs: ["compound-interest-calculator", "currency-converter", "scientific-calculator"],
    componentName: "EmiCalculatorTool"
  },
  {
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    slug: "compound-interest-calculator",
    category: "calculators",
    description: "Project long-term investment growth, compounding frequencies, and recurring monthly contributions.",
    icon: "TrendingUp",
    keywords: ["compound interest calculator", "investment calculator", "sip calculator", "future value calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 39500,
    seoTitle: "Compound Interest Calculator — Investment Growth Forecast | OmniCraft",
    seoDescription: "Calculate future wealth with compounding frequency (Daily, Monthly, Annual) and regular monthly deposits.",
    howToUse: [
      { step: 1, title: "Initial Principal", description: "Enter your starting investment." },
      { step: 2, title: "Growth Rate & Duration", description: "Set annual return % and number of years." },
      { step: 3, title: "Review Total Returns", description: "Explore the compound interest multiplication effect." }
    ],
    relatedToolSlugs: ["emi-calculator", "percentage-calculator", "scientific-calculator"],
    componentName: "CompoundInterestTool"
  },
  {
    id: "percentage-calculator",
    name: "Percentage Calculator",
    slug: "percentage-calculator",
    category: "calculators",
    description: "Solve all percentage problems: % of a number, percentage increase/decrease, and discount values.",
    icon: "Percent",
    keywords: ["percentage calculator", "calculate percentage", "percent increase", "discount calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 47200,
    seoTitle: "Percentage Calculator — Find % of Number, Increase & Discount | OmniCraft",
    seoDescription: "Quickly calculate what is X% of Y, percentage difference between two numbers, and markup/markdown.",
    howToUse: [
      { step: 1, title: "Choose Formula Mode", description: "Select X% of Y, % Increase, or What % is X of Y." },
      { step: 2, title: "Input Numbers", description: "Type values to calculate." },
      { step: 3, title: "Copy Result", description: "Instant answer with step-by-step mathematical explanation." }
    ],
    relatedToolSlugs: ["scientific-calculator", "discount-calculator", "gst-calculator"],
    componentName: "PercentageCalculatorTool"
  },
  {
    id: "bmi-calculator",
    name: "BMI Calculator",
    slug: "bmi-calculator",
    category: "calculators",
    description: "Calculate Body Mass Index (BMI), ideal weight range, and WHO health categorization.",
    icon: "Activity",
    keywords: ["bmi calculator", "body mass index", "ideal weight calculator", "health calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 38100,
    seoTitle: "BMI Calculator — Calculate Body Mass Index Online | OmniCraft",
    seoDescription: "Calculate BMI using Metric (kg/cm) or Imperial (lbs/ft) units and view healthy weight classifications.",
    howToUse: [
      { step: 1, title: "Select Unit System", description: "Choose Metric or Imperial." },
      { step: 2, title: "Enter Height & Weight", description: "Input your metrics and age/gender." },
      { step: 3, title: "View Health Score", description: "Get your exact BMI score and healthy target weight bracket." }
    ],
    relatedToolSlugs: ["age-calculator", "calorie-calculator", "scientific-calculator"],
    componentName: "BmiCalculatorTool"
  },
  {
    id: "age-calculator",
    name: "Age & Date Difference Calculator",
    slug: "age-calculator",
    category: "calculators",
    description: "Calculate exact chronological age in years, months, days, hours, and find date intervals.",
    icon: "Calendar",
    keywords: ["age calculator", "date difference", "how old am i", "days between dates", "birthday calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 31000,
    seoTitle: "Age Calculator — Exact Age in Years, Months & Days | OmniCraft",
    seoDescription: "Find your precise age in years, months, days, total hours, and days until your next birthday.",
    howToUse: [
      { step: 1, title: "Pick Date of Birth", description: "Select birth day, month, and year." },
      { step: 2, title: "Calculate", description: "Get breakdown of life milestones and days lived." }
    ],
    relatedToolSlugs: ["bmi-calculator", "time-converter", "scientific-calculator"],
    componentName: "AgeCalculatorTool"
  },

  // ==========================================
  // 6. TEXT TOOLS
  // ==========================================
  {
    id: "word-counter",
    name: "Word & Character Counter",
    slug: "word-counter",
    category: "text",
    description: "Count words, characters, sentences, paragraphs, reading time, and speaking time in real-time.",
    icon: "FileSignature",
    keywords: ["word counter", "character counter", "sentence counter", "reading time calculator", "letter count"],
    synonyms: ["count words", "text statistics", "essay length"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 78900,
    seoTitle: "Word Counter — Count Words, Characters & Reading Time | OmniCraft",
    seoDescription: "Real-time word and character counter with estimated reading time, keyword density, and speaking time.",
    howToUse: [
      { step: 1, title: "Paste or Type Text", description: "Type your essay, article, or post into the editor." },
      { step: 2, title: "Inspect Live Metrics", description: "Words, characters (with & without spaces), reading time update instantly." },
      { step: 3, title: "Copy Clean Stats", description: "Export statistics or copy cleaned text." }
    ],
    features: ["Estimated reading and speaking time", "Top 5 keyword density table", "Spaces vs non-space counts"],
    relatedToolSlugs: ["case-converter", "remove-duplicate-lines", "lorem-ipsum-generator"],
    componentName: "WordCounterTool"
  },
  {
    id: "case-converter",
    name: "Case Converter",
    slug: "case-converter",
    category: "text",
    description: "Convert text instantly between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
    icon: "CaseSensitive",
    keywords: ["case converter", "uppercase converter", "lowercase", "title case", "camelcase", "snake case"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 54100,
    seoTitle: "Case Converter — UPPERCASE, lowercase, Title Case & camelCase | OmniCraft",
    seoDescription: "Change letter casing with 1 click: UPPERCASE, lowercase, Capitalize Words, snake_case, kebab-case.",
    howToUse: [
      { step: 1, title: "Input Text", description: "Paste any text string." },
      { step: 2, title: "Click Case Button", description: "Select UPPER, lower, Title Case, camelCase, PascalCase, or snake_case." },
      { step: 3, title: "Copy Output", description: "Copy converted text to clipboard." }
    ],
    relatedToolSlugs: ["word-counter", "text-cleaner", "slug-generator"],
    componentName: "CaseConverterTool"
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    slug: "remove-duplicate-lines",
    category: "text",
    description: "Remove duplicate lines from lists or text files while preserving original order or sorting alphabetically.",
    icon: "ListFilter",
    keywords: ["remove duplicate lines", "deduplicate text", "unique lines", "clean list", "sort list"],
    inputType: "text",
    processingType: "client",
    usageCount: 36700,
    seoTitle: "Remove Duplicate Lines — Clean & Deduplicate Lists Online | OmniCraft",
    seoDescription: "Deduplicate lines in lists, emails, or code with case sensitivity options and alphabetical sorting.",
    howToUse: [
      { step: 1, title: "Paste List", description: "Insert list containing redundant items." },
      { step: 2, title: "Select Options", description: "Choose Case Insensitive or Trim Whitespace." },
      { step: 3, title: "Copy Unique List", description: "Get deduplicated list with item counter." }
    ],
    relatedToolSlugs: ["text-diff", "word-counter", "text-cleaner"],
    componentName: "RemoveDuplicateLinesTool"
  },
  {
    id: "text-diff",
    name: "Text Diff & Comparison",
    slug: "text-diff",
    category: "text",
    description: "Compare two text snippets or code blocks side-by-side to highlight added, removed, and modified lines.",
    icon: "Split",
    keywords: ["text diff", "compare text", "diff checker", "code comparison", "find differences"],
    inputType: "custom",
    processingType: "client",
    isPopular: true,
    usageCount: 42100,
    seoTitle: "Text Diff Checker — Compare Text & Code Differences Online | OmniCraft",
    seoDescription: "Highlight character and line differences between two versions of text or code side-by-side.",
    howToUse: [
      { step: 1, title: "Original Text", description: "Paste base version in left pane." },
      { step: 2, title: "Modified Text", description: "Paste changed version in right pane." },
      { step: 3, title: "Inspect Diff", description: "View inline or side-by-side color-coded additions and deletions." }
    ],
    relatedToolSlugs: ["remove-duplicate-lines", "word-counter", "json-formatter"],
    componentName: "TextDiffTool"
  },
  {
    id: "lorem-ipsum-generator",
    name: "Lorem Ipsum Generator",
    slug: "lorem-ipsum-generator",
    category: "text",
    description: "Generate placeholder filler dummy text in paragraphs, sentences, words, or HTML markup format.",
    icon: "AlignLeft",
    keywords: ["lorem ipsum generator", "dummy text", "placeholder text", "filler text maker"],
    inputType: "form",
    processingType: "client",
    usageCount: 29800,
    seoTitle: "Lorem Ipsum Generator — Custom Placeholder Text Online | OmniCraft",
    seoDescription: "Generate classic Latin Lorem Ipsum text in paragraphs, sentences, or bulleted lists.",
    howToUse: [
      { step: 1, title: "Choose Amount", description: "Select number of Paragraphs, Sentences, or Words." },
      { step: 2, title: "Generate & Copy", description: "1-click copy formatted placeholder text." }
    ],
    relatedToolSlugs: ["word-counter", "case-converter", "markdown-preview"],
    componentName: "LoremIpsumTool"
  },

  // ==========================================
  // 7. DEVELOPER TOOLS
  // ==========================================
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    slug: "json-formatter",
    category: "developer",
    description: "Format, validate, beautify, and minify JSON data with syntax highlighting and instant error detection.",
    icon: "Braces",
    keywords: ["json formatter", "format json", "json validator", "beautify json", "minify json", "json parser"],
    synonyms: ["pretty print json", "fix json syntax", "compress json"],
    inputType: "code",
    processingType: "client",
    isPopular: true,
    usageCount: 96500,
    seoTitle: "JSON Formatter & Validator — Beautify & Minify JSON | OmniCraft",
    seoDescription: "Format and validate JSON data online with tree view, 2/4-space indent options, and instant syntax validation.",
    howToUse: [
      { step: 1, title: "Paste JSON", description: "Insert unformatted or minified JSON payload." },
      { step: 2, title: "Click Format or Minify", description: "Beautify with 2/4-space indentation or compress to 1 line." },
      { step: 3, title: "Copy or Download", description: "Copy validated JSON or save as .json file." }
    ],
    features: ["Accurate line & column syntax error highlighter", "2-space, 4-space, tab indentation", "1-click minification"],
    relatedToolSlugs: ["base64-converter", "jwt-decoder", "xml-formatter", "text-diff"],
    componentName: "JsonFormatterTool"
  },
  {
    id: "base64-converter",
    name: "Base64 Encoder & Decoder",
    slug: "base64-converter",
    category: "developer",
    description: "Encode text and files to Base64 strings or decode Base64 strings back to UTF-8 text and downloads.",
    icon: "Binary",
    keywords: ["base64 encoder", "base64 decoder", "text to base64", "base64 to text", "base64 image"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 62400,
    seoTitle: "Base64 Encoder & Decoder — Convert Text & Files Online | OmniCraft",
    seoDescription: "Encode strings into Base64 format and decode Base64 back into plain readable text.",
    howToUse: [
      { step: 1, title: "Input Content", description: "Paste text or Base64 string." },
      { step: 2, title: "Select Mode", description: "Toggle between Encode (Text -> Base64) and Decode (Base64 -> Text)." },
      { step: 3, title: "Copy Output", description: "Copy resulting string with 1-click." }
    ],
    relatedToolSlugs: ["url-encoder", "hash-generator", "json-formatter"],
    componentName: "Base64ConverterTool"
  },
  {
    id: "url-encoder",
    name: "URL Encoder & Decoder",
    slug: "url-encoder",
    category: "developer",
    description: "Encode special characters into percent-encoded URL safe format or decode URL strings.",
    icon: "Link",
    keywords: ["url encoder", "url decoder", "percent encoding", "encode uri", "decode url query"],
    inputType: "text",
    processingType: "client",
    usageCount: 34500,
    seoTitle: "URL Encoder & Decoder — Percent Encode URL Strings | OmniCraft",
    seoDescription: "Safely encode URI components with percent-encoding and decode percent-encoded URLs.",
    howToUse: [
      { step: 1, title: "Insert String", description: "Paste standard URL or encoded query string." },
      { step: 2, title: "Choose Action", description: "Click Encode URI Component or Decode URI." },
      { step: 3, title: "Copy Output", description: "Get safe URL string ready for API queries." }
    ],
    relatedToolSlugs: ["base64-converter", "json-formatter", "jwt-decoder"],
    componentName: "UrlEncoderTool"
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder & Inspector",
    slug: "jwt-decoder",
    category: "developer",
    description: "Decode JSON Web Tokens (JWT) to inspect Header, Payload claims, expiration timestamps, and signature.",
    icon: "KeyRound",
    keywords: ["jwt decoder", "decode jwt", "inspect json web token", "jwt expiration", "token parser"],
    inputType: "code",
    processingType: "client",
    isPopular: true,
    usageCount: 51200,
    seoTitle: "JWT Decoder — Decode & Inspect JSON Web Tokens | OmniCraft",
    seoDescription: "Decode JWT tokens client-side without sending tokens to any server. Inspect claims, issued at, and expiration.",
    howToUse: [
      { step: 1, title: "Paste Token", description: "Insert your encoded JWT token (header.payload.signature)." },
      { step: 2, title: "Inspect Decoded Data", description: "View formatted Header and Payload JSON with highlighted expiration date." }
    ],
    features: ["100% client-side (no token exposure)", "Automatic UNIX timestamp human date conversion"],
    relatedToolSlugs: ["json-formatter", "base64-converter", "uuid-generator"],
    componentName: "JwtDecoderTool"
  },
  {
    id: "uuid-generator",
    name: "UUID & GUID Generator",
    slug: "uuid-generator",
    category: "developer",
    description: "Generate cryptographically secure v4 UUIDs, GUIDs, and NanoIDs in bulk with formatting options.",
    icon: "Hash",
    keywords: ["uuid generator", "guid generator", "random uuid v4", "bulk uuid", "generate uuid"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 48900,
    seoTitle: "UUID Generator — Bulk UUID v4 & GUID Maker | OmniCraft",
    seoDescription: "Generate RFC4122 compliant version-4 UUIDs in bulk with uppercase, lowercase, and hyphen options.",
    howToUse: [
      { step: 1, title: "Specify Quantity", description: "Choose quantity (1 to 100 UUIDs)." },
      { step: 2, title: "Set Options", description: "Select uppercase or strip hyphens if needed." },
      { step: 3, title: "Generate & Copy", description: "Copy single or list of UUIDs to clipboard." }
    ],
    relatedToolSlugs: ["password-generator", "hash-generator", "json-formatter"],
    componentName: "UuidGeneratorTool"
  },
  {
    id: "hash-generator",
    name: "Hash Generator (MD5, SHA-256)",
    slug: "hash-generator",
    category: "developer",
    description: "Generate cryptographic hashes from text using MD5, SHA-1, SHA-256, and SHA-512 algorithms.",
    icon: "Fingerprint",
    keywords: ["hash generator", "md5 generator", "sha256 hash", "sha512", "sha1 hash maker"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 56300,
    seoTitle: "Hash Generator — MD5, SHA-1, SHA-256 & SHA-512 | OmniCraft",
    seoDescription: "Calculate cryptographic hashes in real-time directly in your browser. Verify message digests securely.",
    howToUse: [
      { step: 1, title: "Type or Paste String", description: "Insert message or password." },
      { step: 2, title: "View Hashes", description: "Simultaneously generate MD5, SHA-1, SHA-256, and SHA-512 hashes." },
      { step: 3, title: "Copy Hash", description: "Click copy button next to desired hash format." }
    ],
    relatedToolSlugs: ["password-generator", "uuid-generator", "base64-converter"],
    componentName: "HashGeneratorTool"
  },
  {
    id: "unix-timestamp",
    name: "Unix Timestamp Converter",
    slug: "unix-timestamp",
    category: "developer",
    description: "Convert Unix epoch timestamps (seconds/milliseconds) to human-readable date strings and vice versa.",
    icon: "Clock",
    keywords: ["unix timestamp converter", "epoch to date", "date to timestamp", "current timestamp"],
    inputType: "form",
    processingType: "client",
    usageCount: 38700,
    seoTitle: "Unix Timestamp Converter — Epoch to Human Date | OmniCraft",
    seoDescription: "Convert Unix timestamps in seconds or milliseconds to GMT/UTC and local time zones.",
    howToUse: [
      { step: 1, title: "Enter Timestamp or Date", description: "Input 10-digit epoch or select date from calendar." },
      { step: 2, title: "Instant Conversion", description: "View ISO 8601, RFC 2822, and localized date time." }
    ],
    relatedToolSlugs: ["age-calculator", "jwt-decoder", "json-formatter"],
    componentName: "UnixTimestampTool"
  },
  {
    id: "markdown-preview",
    name: "Markdown Live Editor & Preview",
    slug: "markdown-preview",
    category: "developer",
    description: "Real-time Markdown editor with live HTML preview, table generation, and export to HTML/PDF.",
    icon: "FileCode",
    keywords: ["markdown editor", "markdown preview", "md to html", "markdown table generator"],
    inputType: "code",
    processingType: "client",
    usageCount: 33400,
    seoTitle: "Markdown Editor & Live Preview — Real-Time HTML Viewer | OmniCraft",
    seoDescription: "Write GitHub-flavored markdown with side-by-side live rendered HTML, word stats, and 1-click HTML copy.",
    howToUse: [
      { step: 1, title: "Write Markdown", description: "Type markdown headers, lists, code blocks, tables." },
      { step: 2, title: "View Rendered Preview", description: "Instant side-by-side preview formatted beautifully." },
      { step: 3, title: "Copy HTML", description: "Export raw HTML code or copy formatted rich text." }
    ],
    relatedToolSlugs: ["json-formatter", "word-counter", "lorem-ipsum-generator"],
    componentName: "MarkdownPreviewTool"
  },

  // ==========================================
  // 8. SEO TOOLS
  // ==========================================
  {
    id: "meta-tag-generator",
    name: "Meta Tag & Open Graph Generator",
    slug: "meta-tag-generator",
    category: "seo",
    description: "Generate complete SEO meta tags, Open Graph (OG), and Twitter Card markup with live Google/Social preview.",
    icon: "Search",
    keywords: ["meta tag generator", "open graph generator", "twitter card maker", "seo preview", "serp preview"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 41200,
    seoTitle: "Meta Tag Generator — Create Open Graph & Twitter Cards | OmniCraft",
    seoDescription: "Generate HTML meta tags for SEO with live visual previews of Google SERP, Facebook, and Twitter cards.",
    howToUse: [
      { step: 1, title: "Enter Page Info", description: "Input Title, Description, Canonical URL, and Social Image URL." },
      { step: 2, title: "Inspect Visual Previews", description: "See exact Google search snippet and social card preview." },
      { step: 3, title: "Copy HTML Code", description: "Copy optimized HTML <head> tags directly into your site." }
    ],
    relatedToolSlugs: ["robots-generator", "sitemap-generator", "keyword-density"],
    componentName: "MetaTagGeneratorTool"
  },
  {
    id: "robots-generator",
    name: "Robots.txt Generator",
    slug: "robots-generator",
    category: "seo",
    description: "Generate customized robots.txt files with crawl delay, allow/disallow rules for Googlebot, Bingbot, and AI bots.",
    icon: "Bot",
    keywords: ["robots txt generator", "create robots txt", "disallow googlebot", "sitemap in robots"],
    inputType: "form",
    processingType: "client",
    usageCount: 21500,
    seoTitle: "Robots.txt Generator — Custom Search Engine Crawl Rules | OmniCraft",
    seoDescription: "Generate clean robots.txt files to manage search engine bots, block sensitive paths, and specify sitemaps.",
    howToUse: [
      { step: 1, title: "Set Default Access", description: "Choose to Allow or Disallow all web crawlers by default." },
      { step: 2, title: "Specify Restricted Paths", description: "Add paths like /admin, /private, /api." },
      { step: 3, title: "Download robots.txt", description: "Download or copy ready-to-upload robots.txt file." }
    ],
    relatedToolSlugs: ["meta-tag-generator", "sitemap-generator", "slug-generator"],
    componentName: "RobotsGeneratorTool"
  },

  // ==========================================
  // 9. AI TOOLS
  // ==========================================
  {
    id: "ai-text-summarizer",
    name: "AI Text Summarizer",
    slug: "ai-text-summarizer",
    category: "ai",
    description: "Summarize long articles, research papers, and meeting notes into bullet points or concise executive overviews.",
    icon: "Sparkles",
    keywords: ["ai text summarizer", "summarize article", "ai bullet point summary", "tldr generator"],
    inputType: "text",
    processingType: "ai",
    isPopular: true,
    isNew: true,
    usageCount: 61400,
    seoTitle: "AI Text Summarizer — Instant Article & Document Summary | OmniCraft",
    seoDescription: "Summarize long texts, essays, and reports into key takeaways and bullet summaries in seconds.",
    howToUse: [
      { step: 1, title: "Paste Long Text", description: "Insert your article or notes." },
      { step: 2, title: "Select Summary Style", description: "Choose Executive Summary, Bullet Points, or Quick TL;DR." },
      { step: 3, title: "Generate Summary", description: "Get clear structured synthesis with key findings." }
    ],
    relatedToolSlugs: ["ai-grammar-fixer", "ai-paraphraser", "word-counter"],
    componentName: "AiSummarizerTool"
  },
  {
    id: "ai-grammar-fixer",
    name: "AI Grammar & Tone Enhancer",
    slug: "ai-grammar-fixer",
    category: "ai",
    description: "Fix grammar mistakes, punctuation, spelling errors, and refine tone (Professional, Casual, Academic).",
    icon: "CheckCheck",
    keywords: ["ai grammar checker", "fix spelling", "improve writing tone", "proofreader online"],
    inputType: "text",
    processingType: "ai",
    isNew: true,
    usageCount: 48700,
    seoTitle: "AI Grammar Fixer — Fix Spelling & Enhance Writing Tone | OmniCraft",
    seoDescription: "Instantly correct grammar, typos, and improve sentence flow with professional tone adjustment.",
    howToUse: [
      { step: 1, title: "Insert Draft", description: "Paste your paragraph or email draft." },
      { step: 2, title: "Select Target Tone", description: "Choose Professional, Friendly, Academic, or Concise." },
      { step: 3, title: "Apply Improvements", description: "Inspect suggested corrections and copy perfected text." }
    ],
    relatedToolSlugs: ["ai-text-summarizer", "ai-paraphraser", "case-converter"],
    componentName: "AiGrammarTool"
  },

  // ==========================================
  // 10. SECURITY & PRIVACY TOOLS
  // ==========================================
  {
    id: "password-generator",
    name: "Strong Password Generator",
    slug: "password-generator",
    category: "security",
    description: "Generate highly secure random passwords with symbols, numbers, uppercase letters, and custom character exclusions.",
    icon: "ShieldAlert",
    keywords: ["password generator", "strong password", "random password maker", "secure passwords", "create password"],
    synonyms: ["safe password", "passphrase generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 89100,
    seoTitle: "Strong Password Generator — Secure Random Passwords | OmniCraft",
    seoDescription: "Create unbreakable, cryptographically secure passwords. 100% client-side with entropy strength meter.",
    howToUse: [
      { step: 1, title: "Set Password Length", description: "Choose length from 8 to 64 characters (16+ recommended)." },
      { step: 2, title: "Toggle Characters", description: "Include Uppercase, Lowercase, Numbers, and Symbols." },
      { step: 3, title: "Generate & Copy", description: "Copy password with visual entropy strength rating." }
    ],
    features: ["Cryptographically secure (window.crypto.getRandomValues)", "Visual Entropy (bits) meter", "Exclude ambiguous characters (l, 1, O, 0)"],
    relatedToolSlugs: ["hash-generator", "uuid-generator", "jwt-decoder"],
    componentName: "PasswordGeneratorTool"
  },

  // ==========================================
  // 11. OFFICE & DATA TOOLS
  // ==========================================
  {
    id: "csv-to-json",
    name: "CSV to JSON & JSON to CSV Converter",
    slug: "csv-to-json",
    category: "office",
    description: "Convert spreadsheet CSV data into structured JSON arrays and convert JSON back into CSV format.",
    icon: "Table",
    keywords: ["csv to json", "json to csv", "convert excel to json", "csv parser", "table to json"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 51900,
    seoTitle: "CSV to JSON Converter — Convert Spreadsheets to JSON | OmniCraft",
    seoDescription: "Convert comma/tab delimited CSV to formatted JSON array with auto header detection.",
    howToUse: [
      { step: 1, title: "Paste CSV or JSON", description: "Insert raw comma-separated text or JSON array." },
      { step: 2, title: "Select Conversion", description: "Click Convert to JSON or Convert to CSV." },
      { step: 3, title: "Download Result", description: "Copy converted data or download .json / .csv file." }
    ],
    relatedToolSlugs: ["json-formatter", "remove-duplicate-lines", "text-diff"],
    componentName: "CsvToJsonTool"
  },

  // ==========================================
  // 12. DESIGN TOOLS
  // ==========================================
  {
    id: "css-gradient-generator",
    name: "CSS Gradient Generator",
    slug: "css-gradient-generator",
    category: "design",
    description: "Design vibrant linear and radial CSS background gradients with color stops, angle controls, and ready CSS code.",
    icon: "Palette",
    keywords: ["css gradient generator", "linear gradient maker", "radial gradient", "gradient css code", "color stops"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 46200,
    seoTitle: "CSS Gradient Generator — Create Linear & Radial Gradients | OmniCraft",
    seoDescription: "Design custom CSS gradients with multi-stop colors, angle control, and 1-click CSS snippet copy.",
    howToUse: [
      { step: 1, title: "Choose Gradient Type", description: "Select Linear or Radial." },
      { step: 2, title: "Adjust Colors & Angle", description: "Add color stops, adjust slider angles (0° to 360°)." },
      { step: 3, title: "Copy CSS", description: "Copy background-image CSS declaration directly." }
    ],
    relatedToolSlugs: ["image-color-picker", "css-box-shadow", "color-converter"],
    componentName: "CssGradientTool"
  },
  {
    id: "css-box-shadow",
    name: "CSS Box Shadow Generator",
    slug: "css-box-shadow",
    category: "design",
    description: "Design realistic, layered box shadows with horizontal/vertical offsets, blur radius, spread, and opacity.",
    icon: "Layers",
    keywords: ["css box shadow generator", "drop shadow maker", "smooth shadows css", "box shadow code"],
    inputType: "form",
    processingType: "client",
    usageCount: 38400,
    seoTitle: "CSS Box Shadow Generator — Design Realistic Drop Shadows | OmniCraft",
    seoDescription: "Create soft, layered CSS box shadows with interactive sliders and instant CSS copy.",
    howToUse: [
      { step: 1, title: "Adjust Sliders", description: "Tune X-Offset, Y-Offset, Blur, Spread, and Shadow Color/Opacity." },
      { step: 2, title: "Preview Live Box", description: "Test against light and dark background cards." },
      { step: 3, title: "Copy CSS", description: "Copy box-shadow CSS rule." }
    ],
    relatedToolSlugs: ["css-gradient-generator", "image-color-picker"],
    componentName: "CssBoxShadowTool"
  },

  // ==========================================
  // 13. PRODUCTIVITY TOOLS
  // ==========================================
  {
    id: "pomodoro-timer",
    name: "Pomodoro Focus Timer",
    slug: "pomodoro-timer",
    category: "productivity",
    description: "Enhance productivity with customizable Pomodoro work intervals (25m), short breaks (5m), and long breaks.",
    icon: "Timer",
    keywords: ["pomodoro timer", "focus timer", "productivity timer", "study timer", "25 minute timer"],
    inputType: "custom",
    processingType: "client",
    isPopular: true,
    usageCount: 52700,
    seoTitle: "Pomodoro Timer — Free Online Focus & Study Timer | OmniCraft",
    seoDescription: "Stay focused with the Pomodoro technique. Audio chimes, streak tracking, and customizable work/break durations.",
    howToUse: [
      { step: 1, title: "Select Mode", description: "Choose Pomodoro (25m), Short Break (5m), or Long Break (15m)." },
      { step: 2, title: "Start Timer", description: "Focus completely on your single priority task until the bell rings." },
      { step: 3, title: "Track Completed Intervals", description: "Keep track of completed daily Pomodoro cycles." }
    ],
    relatedToolSlugs: ["stopwatch", "decision-maker", "checklist-generator"],
    componentName: "PomodoroTimerTool"
  },
  {
    id: "decision-maker",
    name: "Decision Maker & Random Picker",
    slug: "decision-maker",
    category: "productivity",
    description: "Can't decide? Add your options to generate an unbiased random choice or spin the virtual wheel.",
    icon: "Dices",
    keywords: ["random picker", "decision maker", "random choice generator", "spin the wheel", "pick for me"],
    inputType: "form",
    processingType: "client",
    usageCount: 29400,
    seoTitle: "Decision Maker & Random Picker — Unbiased Random Chooser | OmniCraft",
    seoDescription: "Resolve choices instantly. Enter custom options to randomly pick winners, lunch spots, or task priorities.",
    howToUse: [
      { step: 1, title: "List Options", description: "Enter choices separated by commas or new lines." },
      { step: 2, title: "Click Decide", description: "Watch the animated random selection engine pick a fair winner." }
    ],
    relatedToolSlugs: ["pomodoro-timer", "uuid-generator", "password-generator"],
    componentName: "DecisionMakerTool"
  },

  // ==========================================
  // 14. AUDIO TOOLS
  // ==========================================
  {
    id: "audio-speed-changer",
    name: "Audio Speed & Pitch Controller",
    slug: "audio-speed-changer",
    category: "audio",
    description: "Adjust audio playback speed from 0.25x to 3.0x, preserve pitch, boost volume, and export modified audio files.",
    icon: "Gauge",
    keywords: ["audio speed changer", "change music speed", "slow down audio", "speed up song", "pitch preserver"],
    synonyms: ["music tempo changer", "audio rate"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    isNew: true,
    usageCount: 38700,
    seoTitle: "Audio Speed Changer — Change Music Speed & Tempo Online | OmniCraft",
    seoDescription: "Speed up or slow down audio files online without changing pitch. 100% private in browser with instant export.",
    howToUse: [
      { step: 1, title: "Upload Audio", description: "Drop your MP3, WAV, AAC, or OGG file." },
      { step: 2, title: "Adjust Speed Slider", description: "Select speed multiplier from 0.25x to 3.0x." },
      { step: 3, title: "Render & Download", description: "Export the tempo-adjusted audio file as WAV." }
    ],
    features: ["HTML5 Web Audio API rendering", "Pitch preservation engine", "Dynamic waveform visualizer"],
    relatedToolSlugs: ["audio-trimmer", "voice-recorder", "audio-volume-booster"],
    componentName: "AudioSpeedTool"
  },
  {
    id: "audio-trimmer",
    name: "Audio Trimmer & Cutter",
    slug: "audio-trimmer",
    category: "audio",
    description: "Trim, cut, and slice audio files with live waveform visualizer, millisecond precision, and instant export.",
    icon: "Scissors",
    keywords: ["audio trimmer", "cut mp3", "audio cutter", "ringtone maker", "slice audio"],
    synonyms: ["mp3 cutter", "trim song", "audio cropper"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    isNew: true,
    usageCount: 45200,
    seoTitle: "Audio Trimmer & Cutter — Cut MP3 & Audio Files Online | OmniCraft",
    seoDescription: "Cut and slice audio clips online with interactive waveform preview. Free, lossless, and browser-native.",
    howToUse: [
      { step: 1, title: "Upload Audio File", description: "Select song or voice recording." },
      { step: 2, title: "Set Start & End", description: "Specify start and end cut points." },
      { step: 3, title: "Cut & Download", description: "Download trimmed audio snippet immediately." }
    ],
    relatedToolSlugs: ["audio-speed-changer", "voice-recorder", "audio-volume-booster"],
    componentName: "AudioTrimmerTool"
  },
  {
    id: "voice-recorder",
    name: "Voice & Audio Recorder",
    slug: "voice-recorder",
    category: "audio",
    description: "Record voice notes and microphone audio directly in your browser with real-time frequency visualizer.",
    icon: "Mic",
    keywords: ["voice recorder", "audio recorder", "record microphone online", "record voice notes"],
    synonyms: ["dictaphone", "sound recorder"],
    inputType: "custom",
    processingType: "client",
    isNew: true,
    usageCount: 31200,
    seoTitle: "Online Voice Recorder — Record Audio in Browser Free | OmniCraft",
    seoDescription: "Record high-definition voice and microphone audio with visualizer and instant WebM download.",
    howToUse: [
      { step: 1, title: "Allow Microphone", description: "Click Start Recording and grant browser permissions." },
      { step: 2, title: "Speak into Mic", description: "Monitor the live frequency spectrum and duration counter." },
      { step: 3, title: "Stop & Download", description: "Listen to the playback and save your recording." }
    ],
    relatedToolSlugs: ["audio-trimmer", "audio-speed-changer"],
    componentName: "VoiceRecorderTool"
  },
  {
    id: "audio-volume-booster",
    name: "Audio Volume Booster",
    slug: "audio-volume-booster",
    category: "audio",
    description: "Boost quiet audio tracks and MP3s up to 400% loudness with soft-knee dynamic compression limiter.",
    icon: "Volume2",
    keywords: ["audio booster", "increase volume mp3", "louder audio", "sound amplifier online"],
    inputType: "file",
    processingType: "client",
    usageCount: 26800,
    seoTitle: "Audio Volume Booster — Increase MP3 Sound Volume Online | OmniCraft",
    seoDescription: "Make quiet songs and recordings louder with up to 400% gain boost without clipping distortion.",
    howToUse: [
      { step: 1, title: "Upload Audio", description: "Select quiet audio track." },
      { step: 2, title: "Set Amplification", description: "Choose boost level (150%, 200%, 300%, 400%)." },
      { step: 3, title: "Amplify & Download", description: "Export the louder audio track." }
    ],
    relatedToolSlugs: ["audio-speed-changer", "audio-trimmer"],
    componentName: "AudioVolumeBoosterTool"
  },

  // ==========================================
  // 15. VIDEO TOOLS
  // ==========================================
  {
    id: "video-speed-controller",
    name: "Video Speed & Playback Controller",
    slug: "video-speed-controller",
    category: "video",
    description: "Speed up or slow down videos (0.25x to 4x), inspect resolution, extract screenshot frames, and Picture-in-Picture.",
    icon: "Gauge",
    keywords: ["video speed controller", "change video speed", "slow motion video", "video playback rate"],
    synonyms: ["speed up video", "slow down video"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    isNew: true,
    usageCount: 42100,
    seoTitle: "Video Speed Controller — Change Video Playback Speed Online | OmniCraft",
    seoDescription: "Control video playback speed from 0.25x to 4x with frame capture and picture-in-picture mode.",
    howToUse: [
      { step: 1, title: "Upload Video", description: "Drop your MP4, WebM, or MOV video file." },
      { step: 2, title: "Select Speed", description: "Choose playback speed from 0.25x (Slow-Mo) to 4x." },
      { step: 3, title: "Inspect & Capture", description: "Grab high-res screenshot frames or play in PiP mode." }
    ],
    relatedToolSlugs: ["video-to-gif", "video-aspect-ratio-calculator", "video-audio-remover"],
    componentName: "VideoSpeedTool"
  },
  {
    id: "video-to-gif",
    name: "Video to GIF & Frame Extractor",
    slug: "video-to-gif",
    category: "video",
    description: "Sample video clips, adjust frame rate (FPS), and convert video sections into animated frame sequences.",
    icon: "Film",
    keywords: ["video to gif", "extract video frames", "mp4 to gif", "sample video"],
    synonyms: ["convert video to animation", "gif maker from video"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    isNew: true,
    usageCount: 39500,
    seoTitle: "Video to GIF — Extract Video Frames & Convert Online | OmniCraft",
    seoDescription: "Convert MP4 video clips into animated sequences and capture individual frame images.",
    howToUse: [
      { step: 1, title: "Upload Video", description: "Select MP4 or WebM video file." },
      { step: 2, title: "Set Interval & FPS", description: "Choose start time, duration, and frame rate." },
      { step: 3, title: "Extract Frames", description: "View live loop animation and save captured frames." }
    ],
    relatedToolSlugs: ["video-speed-controller", "video-aspect-ratio-calculator"],
    componentName: "VideoToGifTool"
  },
  {
    id: "video-aspect-ratio-calculator",
    name: "Video Aspect Ratio & Dimension Resizer",
    slug: "video-aspect-ratio-calculator",
    category: "video",
    description: "Calculate exact video dimensions, aspect ratio scalers (16:9, 9:16, 1:1, 4:5, 21:9), and standard resolution ladders.",
    icon: "Ratio",
    keywords: ["video aspect ratio calculator", "16:9 resolution calculator", "9:16 tiktok dimensions", "video scaler"],
    inputType: "form",
    processingType: "client",
    isNew: true,
    usageCount: 28400,
    seoTitle: "Video Aspect Ratio Calculator — 16:9, 9:16 & 4K Resolutions | OmniCraft",
    seoDescription: "Calculate exact scaling dimensions for YouTube (16:9), TikTok / Reels (9:16), and Instagram posts.",
    howToUse: [
      { step: 1, title: "Select Preset Ratio", description: "Pick 16:9, 9:16 Vertical, 1:1 Square, or 21:9 Cinema." },
      { step: 2, title: "Adjust Width/Height", description: "Type dimensions to see proportional updates." },
      { step: 3, title: "Copy Standard Res", description: "1-click select 4K, 1440p, 1080p, or 720p standards." }
    ],
    relatedToolSlugs: ["video-speed-controller", "image-resizer"],
    componentName: "VideoAspectRatioTool"
  },
  {
    id: "video-audio-remover",
    name: "Video Audio Remover & Muter",
    slug: "video-audio-remover",
    category: "video",
    description: "Strip audio track from video files completely in your browser and export lightweight video-only files.",
    icon: "VolumeX",
    keywords: ["mute video", "remove audio from video", "strip sound from video", "silent video maker"],
    inputType: "file",
    processingType: "client",
    usageCount: 24100,
    seoTitle: "Mute Video — Remove Sound Track from Video Online | OmniCraft",
    seoDescription: "Remove audio and background noise from video files 100% in browser with no file uploads.",
    howToUse: [
      { step: 1, title: "Upload Video", description: "Drop video containing audio." },
      { step: 2, title: "Process & Strip", description: "Click Mute & Export Video." },
      { step: 3, title: "Download", description: "Save silent video file." }
    ],
    relatedToolSlugs: ["video-speed-controller", "audio-volume-booster"],
    componentName: "VideoMuteTool"
  },

  // ==========================================
  // 16. SOCIAL & WEB TOOLS
  // ==========================================
  {
    id: "social-aspect-ratio-helper",
    name: "Social Media Post Previewer & Safe Zones",
    slug: "social-aspect-ratio-helper",
    category: "social",
    description: "Simulate Instagram posts, Twitter tweets, YouTube thumbnails, and LinkedIn feeds before publishing.",
    icon: "Share2",
    keywords: ["social media preview", "instagram post mockup", "twitter tweet preview", "social card tester"],
    inputType: "form",
    processingType: "client",
    isNew: true,
    usageCount: 31900,
    seoTitle: "Social Post Previewer — Test Instagram, X & YouTube Previews | OmniCraft",
    seoDescription: "Preview how your post, image, handle, and caption will appear on Instagram, Twitter/X, and YouTube.",
    howToUse: [
      { step: 1, title: "Choose Platform", description: "Select Instagram, Twitter/X, or YouTube." },
      { step: 2, title: "Add Content", description: "Upload image and enter display name, handle, and text." },
      { step: 3, title: "Inspect Mockup", description: "Verify layout, line wraps, and visual hierarchy." }
    ],
    relatedToolSlugs: ["meta-tag-generator", "video-aspect-ratio-calculator"],
    componentName: "SocialPostPreviewTool"
  },
  {
    id: "user-agent-parser",
    name: "User-Agent & Device Inspector",
    slug: "user-agent-parser",
    category: "web",
    description: "Inspect your client User-Agent string, browser engine, OS, GPU rendering, screen dimensions, and CPU concurrency.",
    icon: "Globe",
    keywords: ["user agent parser", "my user agent", "browser inspector", "device specifications"],
    inputType: "custom",
    processingType: "client",
    usageCount: 29800,
    seoTitle: "User-Agent Parser & Device Inspector — What Is My UA | OmniCraft",
    seoDescription: "Inspect your active browser User-Agent string, operating system, screen resolution, and hardware specs.",
    howToUse: [
      { step: 1, title: "Inspect Detected Data", description: "View parsed browser, OS, and device parameters." },
      { step: 2, title: "Copy or Export JSON", description: "1-click copy full diagnostic specification." }
    ],
    relatedToolSlugs: ["http-status-codes", "unix-timestamp"],
    componentName: "UserAgentTool"
  },
  {
    id: "http-status-codes",
    name: "HTTP Status Code Reference",
    slug: "http-status-codes",
    category: "web",
    description: "Searchable directory of HTTP Status Codes (2xx, 3xx, 4xx, 5xx) with descriptions, headers, and REST API examples.",
    icon: "Server",
    keywords: ["http status codes", "404 not found", "500 internal server error", "rest api status codes"],
    inputType: "custom",
    processingType: "client",
    usageCount: 35100,
    seoTitle: "HTTP Status Code Reference — Searchable 2xx, 4xx, 5xx Codes | OmniCraft",
    seoDescription: "Look up HTTP status codes (200, 301, 400, 401, 403, 404, 500, 502) with use cases and guidelines.",
    howToUse: [
      { step: 1, title: "Search Code", description: "Type status number or keyword (e.g., 404 or Unauthorized)." },
      { step: 2, title: "Filter by Class", description: "Filter 2xx Success, 4xx Client Errors, or 5xx Server Errors." },
      { step: 3, title: "Copy Definition", description: "Copy standardized response definitions for API docs." }
    ],
    relatedToolSlugs: ["user-agent-parser", "meta-tag-generator"],
    componentName: "HttpStatusCodeTool"
  },

  // ==========================================
  // EXTENDED TOOLS (PDF)
  // ==========================================
  {
    id: "pdf-to-text",
    name: "PDF to Text Extractor",
    slug: "pdf-to-text",
    category: "pdf",
    description: "Extract readable text from PDF pages and export to txt directly in your browser.",
    icon: "FileText",
    keywords: ["pdf to text", "extract text from pdf", "pdf text reader", "read pdf text"],
    synonyms: ["pdf text converter", "pdf text export"],
    inputType: "file",
    processingType: "client",
    isNew: true,
    usageCount: 18200,
    seoTitle: "PDF to Text Extractor — Extract Text from PDF Online | OmniCraft",
    seoDescription: "Extract text content from any PDF document directly in your browser. 100% private and free.",
    howToUse: [
      { step: 1, title: "Upload PDF", description: "Select your PDF document." },
      { step: 2, title: "View Text", description: "Review the extracted text content in the workspace." },
      { step: 3, title: "Copy or Download", description: "Copy text to clipboard or download as .txt." }
    ],
    features: ["100% Client-side privacy", "Download as .txt", "Fast WebAssembly engine"],
    relatedToolSlugs: ["pdf-merge", "pdf-compress", "pdf-page-extractor"],
    componentName: "PdfToTextTool"
  },
  {
    id: "image-to-pdf",
    name: "Image to PDF Converter",
    slug: "image-to-pdf",
    category: "pdf",
    description: "Convert JPG, PNG, and WebP images into a clean, multi-page PDF document.",
    icon: "FilePlus",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "photos to pdf", "combine images into pdf"],
    synonyms: ["picture to pdf", "convert photos to document"],
    inputType: "files",
    processingType: "client",
    isPopular: true,
    usageCount: 38400,
    seoTitle: "Image to PDF Converter — Convert JPG & PNG to PDF Online | OmniCraft",
    seoDescription: "Convert images to PDF online for free. Combine multiple photos into a single PDF document in seconds.",
    howToUse: [
      { step: 1, title: "Upload Images", description: "Select one or more JPG, PNG, or WebP files." },
      { step: 2, title: "Configure Sizing", description: "Choose A4, US Letter, or Fit to Image page size." },
      { step: 3, title: "Download PDF", description: "Click Convert to generate and download your PDF." }
    ],
    features: ["Multiple image support", "Custom page margins", "A4 & Letter presets"],
    relatedToolSlugs: ["pdf-merge", "image-compressor", "pdf-compress"],
    componentName: "ImageToPdfTool"
  },
  {
    id: "pdf-page-deleter",
    name: "PDF Page Deleter",
    slug: "pdf-page-deleter",
    category: "pdf",
    description: "Permanently delete unwanted pages or page ranges from any PDF document.",
    icon: "Trash2",
    keywords: ["delete pdf pages", "remove pages from pdf", "pdf page remover", "cut pdf pages"],
    inputType: "file",
    processingType: "client",
    isNew: true,
    usageCount: 14100,
    seoTitle: "PDF Page Deleter — Delete Pages from PDF Online | OmniCraft",
    seoDescription: "Remove unwanted pages or page ranges from PDF documents instantly in your browser.",
    howToUse: [
      { step: 1, title: "Upload PDF", description: "Choose the PDF to modify." },
      { step: 2, title: "Specify Pages", description: "Enter page numbers to remove (e.g., 2, 4-6)." },
      { step: 3, title: "Download", description: "Export your updated PDF without deleted pages." }
    ],
    features: ["Range deletion support", "Client-side processing", "Instant download"],
    relatedToolSlugs: ["pdf-split", "pdf-page-extractor", "pdf-merge"],
    componentName: "PdfPageDeleterTool"
  },
  {
    id: "pdf-page-extractor",
    name: "PDF Page Extractor",
    slug: "pdf-page-extractor",
    category: "pdf",
    description: "Extract specific pages from a PDF document into a new standalone PDF.",
    icon: "Scissors",
    keywords: ["extract pdf pages", "export pages from pdf", "select pdf pages", "pull pages from pdf"],
    inputType: "file",
    processingType: "client",
    isNew: true,
    usageCount: 16800,
    seoTitle: "PDF Page Extractor — Extract Chosen Pages Online | OmniCraft",
    seoDescription: "Extract chosen pages or page ranges into a separate PDF file. Fast and 100% private.",
    howToUse: [
      { step: 1, title: "Upload PDF", description: "Select the source PDF file." },
      { step: 2, title: "Pick Pages", description: "Enter page numbers to extract (e.g., 1-3, 5)." },
      { step: 3, title: "Save PDF", description: "Download your new extracted PDF." }
    ],
    relatedToolSlugs: ["pdf-split", "pdf-page-deleter", "pdf-merge"],
    componentName: "PdfPageExtractorTool"
  },
  {
    id: "pdf-metadata",
    name: "PDF Metadata Viewer & Editor",
    slug: "pdf-metadata",
    category: "pdf",
    description: "Inspect and update PDF title, author, subject, creator, and keyword properties.",
    icon: "Info",
    keywords: ["pdf metadata", "edit pdf metadata", "pdf author changer", "pdf properties editor"],
    inputType: "file",
    processingType: "client",
    usageCount: 9400,
    seoTitle: "PDF Metadata Viewer & Editor — Edit PDF Info Online | OmniCraft",
    seoDescription: "View and edit PDF document metadata, author, title, and keywords in browser.",
    howToUse: [
      { step: 1, title: "Upload PDF", description: "Select a PDF document." },
      { step: 2, title: "Edit Fields", description: "Modify title, author, subject, or keywords." },
      { step: 3, title: "Save PDF", description: "Download your updated PDF with new metadata." }
    ],
    relatedToolSlugs: ["pdf-watermark", "pdf-compress"],
    componentName: "PdfMetadataTool"
  },
  {
    id: "pdf-header-footer",
    name: "PDF Header & Page Numbers",
    slug: "pdf-header-footer",
    category: "pdf",
    description: "Add page numbers and custom header or footer notices across all PDF pages.",
    icon: "Hash",
    keywords: ["pdf page numbers", "add page numbers to pdf", "pdf header", "pdf footer generator"],
    inputType: "file",
    processingType: "client",
    isNew: true,
    usageCount: 15300,
    seoTitle: "PDF Page Numbers & Header/Footer Tool | OmniCraft",
    seoDescription: "Add page numbering (Page X of Y) and header notices to PDF files online for free.",
    howToUse: [
      { step: 1, title: "Upload PDF", description: "Choose the PDF to number." },
      { step: 2, title: "Set Format", description: "Select numbering format and optional header text." },
      { step: 3, title: "Apply", description: "Download your numbered PDF." }
    ],
    relatedToolSlugs: ["pdf-watermark", "pdf-merge"],
    componentName: "PdfHeaderFooterTool"
  },

  // ==========================================
  // EXTENDED TOOLS (IMAGE)
  // ==========================================
  {
    id: "image-rotator",
    name: "Image Rotator & Flipper",
    slug: "image-rotator",
    category: "image",
    description: "Rotate images 90°, 180°, 270° or mirror flip horizontally and vertically in browser.",
    icon: "RotateCw",
    keywords: ["rotate image", "flip photo", "turn photo", "mirror image", "flip horizontal"],
    inputType: "file",
    processingType: "client",
    usageCount: 22100,
    seoTitle: "Image Rotator & Flipper — Rotate & Mirror Photos Online | OmniCraft",
    seoDescription: "Rotate and mirror flip JPG, PNG, and WebP images directly in your browser.",
    howToUse: [
      { step: 1, title: "Upload Image", description: "Choose the photo to transform." },
      { step: 2, title: "Rotate / Flip", description: "Click 90° CW, CCW, Flip H, or Flip V." },
      { step: 3, title: "Download", description: "Export your transformed image." }
    ],
    relatedToolSlugs: ["image-cropper", "image-resizer"],
    componentName: "ImageRotatorTool"
  },
  {
    id: "image-to-base64",
    name: "Image to Base64 Converter",
    slug: "image-to-base64",
    category: "image",
    description: "Convert JPG, PNG, WebP, SVG images into Data URLs, raw Base64, and HTML tags.",
    icon: "Code",
    keywords: ["image to base64", "photo to base64", "data url generator", "base64 image encoder"],
    inputType: "file",
    processingType: "client",
    usageCount: 31200,
    seoTitle: "Image to Base64 Converter — Data URI & HTML Embed | OmniCraft",
    seoDescription: "Convert images to Base64 data strings for direct CSS and HTML embedding.",
    howToUse: [
      { step: 1, title: "Upload Image", description: "Select the image to encode." },
      { step: 2, title: "Pick Format", description: "Choose Data URL, Raw Base64, or HTML <img> tag." },
      { step: 3, title: "Copy", description: "1-click copy Base64 string to clipboard." }
    ],
    relatedToolSlugs: ["base64-to-image", "base64-converter"],
    componentName: "ImageToBase64Tool"
  },
  {
    id: "base64-to-image",
    name: "Base64 to Image Decoder",
    slug: "base64-to-image",
    category: "image",
    description: "Decode Base64 strings into previewable, downloadable PNG and JPG image files.",
    icon: "Image",
    keywords: ["base64 to image", "decode base64 image", "base64 to png", "data uri to photo"],
    inputType: "text",
    processingType: "client",
    usageCount: 26500,
    seoTitle: "Base64 to Image Decoder — Download Base64 as PNG | OmniCraft",
    seoDescription: "Decode Base64 strings into PNG and JPG images in seconds directly in your browser.",
    howToUse: [
      { step: 1, title: "Paste Base64", description: "Paste your raw Base64 or Data URI string." },
      { step: 2, title: "Preview", description: "Verify the rendered image output." },
      { step: 3, title: "Download", description: "Save image to your computer." }
    ],
    relatedToolSlugs: ["image-to-base64", "base64-converter"],
    componentName: "Base64ToImageTool"
  },
  {
    id: "image-filters",
    name: "Image Filters & Adjustments",
    slug: "image-filters",
    category: "image",
    description: "Fine-tune Brightness, Contrast, Saturation, Blur, Grayscale, and Sepia effects.",
    icon: "Sliders",
    keywords: ["image filters", "photo brightness", "photo contrast", "grayscale photo", "blur image"],
    inputType: "file",
    processingType: "client",
    usageCount: 24300,
    seoTitle: "Image Filters & Photo Adjustments Online | OmniCraft",
    seoDescription: "Enhance photos online. Adjust brightness, contrast, saturation, blur, and grayscale.",
    howToUse: [
      { step: 1, title: "Upload Photo", description: "Select the image to adjust." },
      { step: 2, title: "Tweak Sliders", description: "Adjust contrast, brightness, and color saturation." },
      { step: 3, title: "Download", description: "Export your enhanced image in full quality." }
    ],
    relatedToolSlugs: ["image-compressor", "image-watermark"],
    componentName: "ImageFiltersTool"
  },
  {
    id: "image-watermark",
    name: "Image Watermark Maker",
    slug: "image-watermark",
    category: "image",
    description: "Add custom text watermarks with opacity, rotation, and custom positioning.",
    icon: "Stamp",
    keywords: ["watermark image", "add watermark to photo", "protect photo", "copyright stamp image"],
    inputType: "file",
    processingType: "client",
    usageCount: 19800,
    seoTitle: "Image Watermark Maker — Protect Photos Online | OmniCraft",
    seoDescription: "Add text watermarks, copyright notices, and stamps to photos online for free.",
    howToUse: [
      { step: 1, title: "Upload Image", description: "Choose the photo to watermark." },
      { step: 2, title: "Customize Text", description: "Type watermark text and set font size/opacity." },
      { step: 3, title: "Download", description: "Save protected watermarked image." }
    ],
    relatedToolSlugs: ["image-filters", "pdf-watermark"],
    componentName: "ImageWatermarkTool"
  },
  {
    id: "favicon-generator",
    name: "Favicon & App Icon Generator",
    slug: "favicon-generator",
    category: "image",
    description: "Generate 16x16, 32x32, Apple Touch Icons (180x180), and PWA icons (192 & 512px).",
    icon: "Sparkles",
    keywords: ["favicon generator", "app icon generator", "pwa icon maker", "apple touch icon generator"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 41200,
    seoTitle: "Favicon & App Icon Generator — Multi-Size Icon Package | OmniCraft",
    seoDescription: "Generate complete favicon packages for websites and PWAs directly from any logo.",
    howToUse: [
      { step: 1, title: "Upload Logo", description: "Select a square logo or image." },
      { step: 2, title: "Preview Sizes", description: "Inspect 16px, 32px, 180px, and 512px renders." },
      { step: 3, title: "Download Package", description: "1-click download all favicon sizes." }
    ],
    relatedToolSlugs: ["social-image-resizer", "image-resizer"],
    componentName: "FaviconGeneratorTool"
  },
  {
    id: "social-image-resizer",
    name: "Social Media Image Resizer",
    slug: "social-image-resizer",
    category: "image",
    description: "Resize photos for Instagram Square/Story, X/Twitter, YouTube Banner, and LinkedIn.",
    icon: "Layout",
    keywords: ["social media image resizer", "instagram size tool", "youtube banner resizer", "twitter header size"],
    inputType: "file",
    processingType: "client",
    usageCount: 36700,
    seoTitle: "Social Media Image Resizer — Instagram, YouTube, X Sizing | OmniCraft",
    seoDescription: "Resize and crop images for Instagram posts, YouTube banners, and LinkedIn covers.",
    howToUse: [
      { step: 1, title: "Upload Photo", description: "Select image to format." },
      { step: 2, title: "Pick Platform", description: "Choose preset like Instagram Story or YouTube Thumbnail." },
      { step: 3, title: "Download", description: "Export perfectly sized social asset." }
    ],
    relatedToolSlugs: ["favicon-generator", "image-resizer"],
    componentName: "SocialImageResizerTool"
  },
  {
    id: "image-dimensions",
    name: "Image Dimension Analyzer",
    slug: "image-dimensions",
    category: "image",
    description: "Inspect exact pixel resolution, aspect ratio, megapixels, and file metrics.",
    icon: "Maximize2",
    keywords: ["image dimensions", "photo aspect ratio checker", "megapixels calculator", "resolution detector"],
    inputType: "file",
    processingType: "client",
    usageCount: 17400,
    seoTitle: "Image Dimension & Aspect Ratio Analyzer | OmniCraft",
    seoDescription: "Inspect image width, height, aspect ratio, megapixels, and file details in browser.",
    howToUse: [
      { step: 1, title: "Upload Image", description: "Drop any image file." },
      { step: 2, title: "View Specs", description: "Check resolution, simplified ratio, and MP count." }
    ],
    relatedToolSlugs: ["image-resizer", "social-image-resizer"],
    componentName: "ImageDimensionAnalyzerTool"
  },

  // ==========================================
  // EXTENDED TOOLS (QR & BARCODE)
  // ==========================================
  {
    id: "wifi-qr-generator",
    name: "WiFi QR Code Generator",
    slug: "wifi-qr-generator",
    category: "qr-barcode",
    description: "Create WiFi connect QR codes for guests and offices with one-scan instant connection.",
    icon: "Wifi",
    keywords: ["wifi qr code", "connect wifi qr", "wifi password qr", "guest wifi qr generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 52100,
    seoTitle: "WiFi QR Code Generator — Share WiFi Password Fast | OmniCraft",
    seoDescription: "Generate a custom WiFi QR code. Let guests scan to connect to your WiFi network without typing passwords.",
    howToUse: [
      { step: 1, title: "Enter SSID", description: "Type network name and password." },
      { step: 2, title: "Pick Encryption", description: "Select WPA/WPA2, WEP, or Open." },
      { step: 3, title: "Download QR", description: "Print or save your WiFi QR code." }
    ],
    relatedToolSlugs: ["qr-generator", "vcard-qr-generator"],
    componentName: "WifiQrTool"
  },
  {
    id: "vcard-qr-generator",
    name: "vCard Contact QR Code",
    slug: "vcard-qr-generator",
    category: "qr-barcode",
    description: "Generate digital business card QR codes containing name, phone, email, and company.",
    icon: "User",
    keywords: ["vcard qr code", "business card qr", "contact qr code generator", "vcf qr generator"],
    inputType: "form",
    processingType: "client",
    usageCount: 33400,
    seoTitle: "vCard Contact QR Code Generator — Digital Business Card | OmniCraft",
    seoDescription: "Create vCard QR codes to share contact details, phone numbers, and websites instantly.",
    howToUse: [
      { step: 1, title: "Enter Details", description: "Fill in name, phone, email, and company." },
      { step: 2, title: "Scan Preview", description: "Verify vCard 3.0 information." },
      { step: 3, title: "Download", description: "Save and print on your business cards." }
    ],
    relatedToolSlugs: ["qr-generator", "wifi-qr-generator"],
    componentName: "VcardQrTool"
  },
  {
    id: "email-sms-qr",
    name: "Email & SMS QR Generator",
    slug: "email-sms-qr",
    category: "qr-barcode",
    description: "Generate QR codes that open pre-filled email messages or SMS texts on mobile devices.",
    icon: "Mail",
    keywords: ["email qr code", "sms qr code", "mailto qr generator", "text message qr"],
    inputType: "form",
    processingType: "client",
    usageCount: 21300,
    seoTitle: "Email & SMS QR Code Generator | OmniCraft",
    seoDescription: "Create QR codes that automatically compose pre-addressed emails and SMS text messages.",
    howToUse: [
      { step: 1, title: "Choose Mode", description: "Pick Email or SMS." },
      { step: 2, title: "Type Message", description: "Enter recipient and pre-populated text." },
      { step: 3, title: "Download", description: "Export high-res QR code PNG." }
    ],
    relatedToolSlugs: ["qr-generator", "wifi-qr-generator"],
    componentName: "EmailSmsQrTool"
  },

  // ==========================================
  // EXTENDED TOOLS (CONVERTERS)
  // ==========================================
  {
    id: "number-base-converter",
    name: "Number Base Converter",
    slug: "number-base-converter",
    category: "converters",
    description: "Convert numbers simultaneously between Decimal (10), Binary (2), Hex (16), and Octal (8).",
    icon: "Hash",
    keywords: ["number base converter", "decimal to binary", "hex to decimal", "binary to hex", "octal converter"],
    inputType: "form",
    processingType: "client",
    usageCount: 29400,
    seoTitle: "Number Base Converter — Decimal, Binary, Hex, Octal | OmniCraft",
    seoDescription: "Convert numbers across Decimal, Binary, Hexadecimal, and Octal formats with instant copy.",
    howToUse: [
      { step: 1, title: "Enter Number", description: "Type decimal value." },
      { step: 2, title: "View Conversions", description: "Inspect binary, hex, and octal outputs." },
      { step: 3, title: "Copy", description: "Copy converted values in 1-click." }
    ],
    relatedToolSlugs: ["unit-converter", "roman-numeral-converter"],
    componentName: "NumberBaseTool"
  },
  {
    id: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    slug: "roman-numeral-converter",
    category: "converters",
    description: "Convert numbers to Roman numerals (e.g. 2026 to MMXXVI) and Roman numerals to numbers.",
    icon: "ArrowLeftRight",
    keywords: ["roman numeral converter", "number to roman", "roman numerals 2026", "arabic to roman"],
    inputType: "form",
    processingType: "client",
    usageCount: 19500,
    seoTitle: "Roman Numeral Converter — Numbers to Roman & Back | OmniCraft",
    seoDescription: "Convert Roman numerals to decimal integers and decimal numbers to Roman numerals.",
    howToUse: [
      { step: 1, title: "Type Value", description: "Enter number (1-3999) or Roman string." },
      { step: 2, title: "View Result", description: "Instant conversion breakdown." }
    ],
    relatedToolSlugs: ["number-base-converter", "unit-converter"],
    componentName: "RomanNumeralTool"
  },
  {
    id: "data-storage-converter",
    name: "Digital Storage Converter",
    slug: "data-storage-converter",
    category: "converters",
    description: "Convert Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), and Terabytes (TB).",
    icon: "Database",
    keywords: ["data storage converter", "gb to mb", "mb to gb", "bytes to gigabytes", "terabytes to gigabytes"],
    inputType: "form",
    processingType: "client",
    usageCount: 27800,
    seoTitle: "Digital Storage Converter — Bytes, KB, MB, GB, TB | OmniCraft",
    seoDescription: "Convert digital storage sizes across Bytes, Megabytes, Gigabytes, and Terabytes.",
    howToUse: [
      { step: 1, title: "Enter Size", description: "Type data value and select unit." },
      { step: 2, title: "View Equivalents", description: "See equivalents in B, MB, GB, and TB." }
    ],
    relatedToolSlugs: ["unit-converter", "number-base-converter"],
    componentName: "DataStorageTool"
  },

  // ==========================================
  // EXTENDED TOOLS (CALCULATORS)
  // ==========================================
  {
    id: "sip-calculator",
    name: "SIP Wealth Calculator",
    slug: "sip-calculator",
    category: "calculators",
    description: "Calculate mutual fund SIP compounding, future maturity value, and estimated returns.",
    icon: "DollarSign",
    keywords: ["sip calculator", "mutual fund calculator", "systematic investment plan", "wealth calculator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 48900,
    seoTitle: "SIP Calculator — Calculate Mutual Fund Wealth Returns | OmniCraft",
    seoDescription: "Calculate future returns on monthly SIP mutual fund investments with compounding formula.",
    howToUse: [
      { step: 1, title: "Enter Investment", description: "Set monthly investment amount." },
      { step: 2, title: "Set Rate & Time", description: "Enter expected return % and tenure in years." },
      { step: 3, title: "View Growth", description: "Inspect total invested amount and wealth gained." }
    ],
    relatedToolSlugs: ["compound-interest-calculator", "emi-calculator"],
    componentName: "SipCalculatorTool"
  },
  {
    id: "gst-calculator",
    name: "GST & Sales Tax Calculator",
    slug: "gst-calculator",
    category: "calculators",
    description: "Calculate GST and sales tax additions or removals (inclusive / exclusive) in seconds.",
    icon: "Percent",
    keywords: ["gst calculator", "sales tax calculator", "tax inclusive calculator", "vat calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 39100,
    seoTitle: "GST & Sales Tax Calculator — Inclusive & Exclusive Tax | OmniCraft",
    seoDescription: "Calculate GST amounts, net prices, and gross totals with customizable tax percentages.",
    howToUse: [
      { step: 1, title: "Enter Amount", description: "Type base price or total bill." },
      { step: 2, title: "Select Rate", description: "Pick 5%, 12%, 18%, 28% or custom tax rate." },
      { step: 3, title: "View Breakdown", description: "Inspect tax portion and net amount." }
    ],
    relatedToolSlugs: ["percentage-calculator", "tip-calculator"],
    componentName: "GstTaxTool"
  },
  {
    id: "tip-calculator",
    name: "Tip & Bill Split Calculator",
    slug: "tip-calculator",
    category: "calculators",
    description: "Calculate restaurant tips and split total bills evenly across groups of people.",
    icon: "Users",
    keywords: ["tip calculator", "bill splitter", "split bill calculator", "restaurant tip calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 31800,
    seoTitle: "Tip & Bill Split Calculator — Split Restaurant Bills | OmniCraft",
    seoDescription: "Calculate tip percentages and split the bill among guests quickly and accurately.",
    howToUse: [
      { step: 1, title: "Enter Bill", description: "Type total restaurant bill." },
      { step: 2, title: "Set Tip %", description: "Choose 15%, 18%, 20% tip." },
      { step: 3, title: "Split", description: "Adjust number of guests to get per-person share." }
    ],
    relatedToolSlugs: ["gst-calculator", "percentage-calculator"],
    componentName: "TipCalculatorTool"
  },
  {
    id: "date-difference",
    name: "Date Difference Calculator",
    slug: "date-difference",
    category: "calculators",
    description: "Calculate exact days, weeks, months, and hours between any two calendar dates.",
    icon: "Calendar",
    keywords: ["date difference", "days between dates", "how many days until", "date duration calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 34500,
    seoTitle: "Date Difference Calculator — Days Between Dates | OmniCraft",
    seoDescription: "Calculate exact days, weeks, months, and hours between two dates online.",
    howToUse: [
      { step: 1, title: "Select Dates", description: "Pick start date and end date." },
      { step: 2, title: "Inspect Result", description: "View total days, weeks, and hours." }
    ],
    relatedToolSlugs: ["age-calculator", "unix-timestamp"],
    componentName: "DateDifferenceTool"
  },

  // ==========================================
  // EXTENDED TOOLS (TEXT)
  // ==========================================
  {
    id: "sort-lines",
    name: "Sort Lines Alphabetically",
    slug: "sort-lines",
    category: "text",
    description: "Sort lines of text alphabetically (A-Z, Z-A), by character length, or natural order.",
    icon: "ArrowUpDown",
    keywords: ["sort lines", "alphabetize list", "sort text a-z", "order lines alphabetically"],
    inputType: "text",
    processingType: "client",
    usageCount: 27400,
    seoTitle: "Sort Lines Alphabetically — Text Sorter Online | OmniCraft",
    seoDescription: "Sort text lists alphabetically, by length, or natural order with deduplication option.",
    howToUse: [
      { step: 1, title: "Paste Lines", description: "Enter your list of text lines." },
      { step: 2, title: "Pick Order", description: "Choose A-Z, Z-A, or By Length." },
      { step: 3, title: "Copy", description: "Copy your sorted list in 1 click." }
    ],
    relatedToolSlugs: ["remove-duplicate-lines", "case-converter"],
    componentName: "SortLinesTool"
  },
  {
    id: "find-and-replace",
    name: "Find and Replace Text",
    slug: "find-and-replace",
    category: "text",
    description: "Find and replace substrings or regex patterns across multiline text documents.",
    icon: "Search",
    keywords: ["find and replace text", "replace words online", "batch text replacer", "regex replace"],
    inputType: "text",
    processingType: "client",
    usageCount: 32600,
    seoTitle: "Find and Replace Text Online — Plain Text & RegEx | OmniCraft",
    seoDescription: "Find and replace words, phrases, or regular expression patterns in browser.",
    howToUse: [
      { step: 1, title: "Paste Text", description: "Enter your original document." },
      { step: 2, title: "Set Query", description: "Type search term and replacement." },
      { step: 3, title: "Copy Result", description: "Copy updated text immediately." }
    ],
    relatedToolSlugs: ["case-converter", "remove-duplicate-lines"],
    componentName: "FindReplaceTool"
  },
  {
    id: "text-to-binary",
    name: "Text to Binary & Hex",
    slug: "text-to-binary",
    category: "text",
    description: "Convert plain text into binary ASCII bits and hexadecimal representation.",
    icon: "Code",
    keywords: ["text to binary", "binary translator", "text to hex", "ascii to binary converter"],
    inputType: "text",
    processingType: "client",
    usageCount: 28900,
    seoTitle: "Text to Binary & Hex Converter — ASCII Translator | OmniCraft",
    seoDescription: "Convert plain text into binary bits and hexadecimal numbers online.",
    howToUse: [
      { step: 1, title: "Type Text", description: "Enter plain words or sentences." },
      { step: 2, title: "View Output", description: "Inspect binary ASCII bytes and hex values." }
    ],
    relatedToolSlugs: ["base64-converter", "number-base-converter"],
    componentName: "TextToBinaryTool"
  },

  // ==========================================
  // EXTENDED TOOLS (DEVELOPER)
  // ==========================================
  {
    id: "regex-tester",
    name: "Regex Tester & Matcher",
    slug: "regex-tester",
    category: "developer",
    description: "Test regular expressions in real-time with capture groups and flags (g, i, m, s).",
    icon: "Code",
    keywords: ["regex tester", "test regular expression", "regex matcher", "javascript regex evaluator"],
    inputType: "custom",
    processingType: "client",
    isPopular: true,
    usageCount: 54100,
    seoTitle: "Regex Tester & Matcher — Test Regular Expressions Online | OmniCraft",
    seoDescription: "Test regular expressions against sample text with live match highlighting and groups.",
    howToUse: [
      { step: 1, title: "Enter Regex", description: "Type regular expression pattern and flags." },
      { step: 2, title: "Enter Text", description: "Provide test string to evaluate." },
      { step: 3, title: "Inspect Matches", description: "View matched indices and capture groups." }
    ],
    relatedToolSlugs: ["json-formatter", "jwt-decoder"],
    componentName: "RegexTesterTool"
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter & Beautifier",
    slug: "sql-formatter",
    category: "developer",
    description: "Format, beautify, and indent messy SQL queries with standardized keyword casing.",
    icon: "Terminal",
    keywords: ["sql formatter", "beautify sql", "format sql query", "sql syntax beautifier"],
    inputType: "code",
    processingType: "client",
    usageCount: 37800,
    seoTitle: "SQL Formatter & Beautifier — Format SQL Queries | OmniCraft",
    seoDescription: "Format and beautify SQL queries online. Standardize SELECT, FROM, WHERE clauses.",
    howToUse: [
      { step: 1, title: "Paste SQL", description: "Enter your raw query." },
      { step: 2, title: "Format", description: "Inspect formatted output with indented clauses." },
      { step: 3, title: "Copy", description: "1-click copy formatted SQL." }
    ],
    relatedToolSlugs: ["json-formatter", "ai-sql-generator"],
    componentName: "SqlFormatterTool"
  },
  {
    id: "json-to-typescript",
    name: "JSON to TypeScript Interface",
    slug: "json-to-typescript",
    category: "developer",
    description: "Convert raw JSON objects into typed TypeScript interfaces and type definitions.",
    icon: "FileCode",
    keywords: ["json to typescript", "json to ts interface", "generate typescript types from json", "json type generator"],
    inputType: "code",
    processingType: "client",
    isPopular: true,
    usageCount: 46200,
    seoTitle: "JSON to TypeScript Interface Generator | OmniCraft",
    seoDescription: "Convert JSON data into clean, typed TypeScript interfaces and type definitions.",
    howToUse: [
      { step: 1, title: "Paste JSON", description: "Enter your sample JSON object or API response." },
      { step: 2, title: "Set Interface Name", description: "Specify root interface name." },
      { step: 3, title: "Copy TypeScript", description: "Copy generated TypeScript definitions." }
    ],
    relatedToolSlugs: ["json-formatter", "base64-converter"],
    componentName: "JsonToTypescriptTool"
  },
  {
    id: "nanoid-generator",
    name: "NanoID Generator",
    slug: "nanoid-generator",
    category: "developer",
    description: "Generate cryptographically secure, collision-resistant NanoIDs for database keys.",
    icon: "Key",
    keywords: ["nanoid generator", "generate nanoid", "random id generator", "unique identifier generator"],
    inputType: "custom",
    processingType: "client",
    usageCount: 31200,
    seoTitle: "NanoID Generator — Secure Unique Identifiers | OmniCraft",
    seoDescription: "Generate cryptographically secure, URL-friendly NanoIDs in batch.",
    howToUse: [
      { step: 1, title: "Set Length", description: "Choose identifier length (e.g. 21 characters)." },
      { step: 2, title: "Generate", description: "Create 1 or multiple unique IDs." },
      { step: 3, title: "Copy", description: "Copy generated NanoIDs to clipboard." }
    ],
    relatedToolSlugs: ["uuid-generator", "hash-generator"],
    componentName: "NanoidGeneratorTool"
  },

  // ==========================================
  // EXTENDED TOOLS (SEO)
  // ==========================================
  {
    id: "sitemap-generator",
    name: "XML Sitemap Generator",
    slug: "sitemap-generator",
    category: "seo",
    description: "Build clean, validated XML sitemaps with custom page priorities and change frequencies.",
    icon: "Globe",
    keywords: ["sitemap generator", "xml sitemap builder", "generate sitemap.xml", "google sitemap maker"],
    inputType: "form",
    processingType: "client",
    usageCount: 33900,
    seoTitle: "XML Sitemap Generator — Build sitemap.xml Online | OmniCraft",
    seoDescription: "Create validated XML sitemaps for Google Search Console directly in your browser.",
    howToUse: [
      { step: 1, title: "Enter Base URL", description: "Type your domain URL." },
      { step: 2, title: "Add Pages", description: "Set priority and change frequency per route." },
      { step: 3, title: "Download", description: "Download your sitemap.xml file." }
    ],
    relatedToolSlugs: ["robots-generator", "meta-tag-generator"],
    componentName: "SitemapGeneratorTool"
  },
  {
    id: "schema-markup-generator",
    name: "JSON-LD Schema Generator",
    slug: "schema-markup-generator",
    category: "seo",
    description: "Create Schema.org JSON-LD structured data for Organizations, Articles, FAQs, and Products.",
    icon: "Code",
    keywords: ["schema markup generator", "json-ld generator", "rich snippets generator", "schema.org builder"],
    inputType: "form",
    processingType: "client",
    usageCount: 29700,
    seoTitle: "JSON-LD Schema Markup Generator — Rich Snippets | OmniCraft",
    seoDescription: "Generate structured JSON-LD schema markup for Google rich search results.",
    howToUse: [
      { step: 1, title: "Pick Type", description: "Choose Organization, Article, Product, or FAQ." },
      { step: 2, title: "Fill Details", description: "Enter entity name, URL, price, or questions." },
      { step: 3, title: "Copy Tag", description: "Copy generated <script> tag for your website HTML." }
    ],
    relatedToolSlugs: ["meta-tag-generator", "serp-preview"],
    componentName: "SchemaMarkupTool"
  },
  {
    id: "serp-preview",
    name: "Google SERP Simulator",
    slug: "serp-preview",
    category: "seo",
    description: "Simulate Desktop and Mobile Google Search results with real-time character counters.",
    icon: "Search",
    keywords: ["serp preview", "google search simulator", "meta title preview", "serp snippet tool"],
    inputType: "form",
    processingType: "client",
    usageCount: 26100,
    seoTitle: "Google SERP Simulator — Meta Title & Description Preview | OmniCraft",
    seoDescription: "Preview how your web page appears in Google Search on desktop and mobile devices.",
    howToUse: [
      { step: 1, title: "Enter Title", description: "Type page title (up to 60 characters)." },
      { step: 2, title: "Add Description", description: "Enter meta description (up to 160 characters)." },
      { step: 3, title: "Check Preview", description: "Switch between Desktop and Mobile simulations." }
    ],
    relatedToolSlugs: ["meta-tag-generator", "slug-generator"],
    componentName: "SerpPreviewTool"
  },
  {
    id: "slug-generator",
    name: "URL Slug Generator",
    slug: "slug-generator",
    category: "seo",
    description: "Generate clean, SEO-friendly URL permalinks from titles and headlines.",
    icon: "Link",
    keywords: ["slug generator", "url slug maker", "seo permalink generator", "clean url maker"],
    inputType: "form",
    processingType: "client",
    usageCount: 23400,
    seoTitle: "URL Slug Generator — SEO Friendly Permalinks | OmniCraft",
    seoDescription: "Convert article titles into clean, hyphenated URL slugs for WordPress and web apps.",
    howToUse: [
      { step: 1, title: "Type Title", description: "Enter your headline or article name." },
      { step: 2, title: "Configure", description: "Choose hyphen or underscore separators." },
      { step: 3, title: "Copy Slug", description: "1-click copy clean URL slug." }
    ],
    relatedToolSlugs: ["meta-tag-generator", "serp-preview"],
    componentName: "SlugGeneratorTool"
  },

  // ==========================================
  // EXTENDED TOOLS (AI)
  // ==========================================
  {
    id: "ai-paraphraser",
    name: "AI Text Paraphraser",
    slug: "ai-paraphraser",
    category: "ai",
    description: "Paraphrase and rewrite text into Professional, Casual, Concise, or Creative tones.",
    icon: "Sparkles",
    keywords: ["ai paraphraser", "ai rewriter", "paraphrase text", "rewrite paragraph ai"],
    inputType: "text",
    processingType: "ai",
    usageCount: 36200,
    seoTitle: "AI Text Paraphraser — Rewrite Sentences & Articles | OmniCraft",
    seoDescription: "Rewrite paragraphs and sentences in multiple tones with intelligent AI processing.",
    howToUse: [
      { step: 1, title: "Paste Text", description: "Enter your original paragraph." },
      { step: 2, title: "Select Tone", description: "Choose Professional, Casual, or Concise." },
      { step: 3, title: "Paraphrase", description: "Generate refreshed copy in seconds." }
    ],
    relatedToolSlugs: ["ai-text-summarizer", "ai-grammar-fixer"],
    componentName: "AiParaphraserTool"
  },
  {
    id: "ai-email-writer",
    name: "AI Professional Email Writer",
    slug: "ai-email-writer",
    category: "ai",
    description: "Draft polished business emails, meeting requests, pitches, and status updates.",
    icon: "Mail",
    keywords: ["ai email writer", "write email ai", "professional email generator", "email draft assistant"],
    inputType: "form",
    processingType: "ai",
    isPopular: true,
    usageCount: 44700,
    seoTitle: "AI Professional Email Writer — Business Email Generator | OmniCraft",
    seoDescription: "Draft professional business emails from bullet points in seconds with AI.",
    howToUse: [
      { step: 1, title: "Set Purpose", description: "Pick Meeting Request, Status Update, or Pitch." },
      { step: 2, title: "Enter Key Points", description: "Type bullet points or thoughts to cover." },
      { step: 3, title: "Generate", description: "Copy ready-to-send email draft." }
    ],
    relatedToolSlugs: ["ai-paraphraser", "ai-text-summarizer"],
    componentName: "AiEmailWriterTool"
  },
  {
    id: "ai-sql-generator",
    name: "AI SQL Query Generator",
    slug: "ai-sql-generator",
    category: "ai",
    description: "Convert natural English query requirements into PostgreSQL, MySQL, and SQLite queries.",
    icon: "Terminal",
    keywords: ["ai sql generator", "text to sql", "natural language to sql", "sql query generator"],
    inputType: "form",
    processingType: "ai",
    usageCount: 38100,
    seoTitle: "AI SQL Query Generator — Text to SQL Online | OmniCraft",
    seoDescription: "Convert English questions into optimized SQL queries for PostgreSQL, MySQL, and SQLite.",
    howToUse: [
      { step: 1, title: "Describe Query", description: "Describe what data you want to retrieve." },
      { step: 2, title: "Select Dialect", description: "Choose PostgreSQL, MySQL, or SQLite." },
      { step: 3, title: "Copy SQL", description: "Copy formatted query into your database client." }
    ],
    relatedToolSlugs: ["sql-formatter", "json-to-typescript"],
    componentName: "AiSqlGeneratorTool"
  },

  // ==========================================
  // EXTENDED TOOLS (SECURITY)
  // ==========================================
  {
    id: "password-strength",
    name: "Password Strength & Entropy",
    slug: "password-strength",
    category: "security",
    description: "Evaluate password crack-time estimation, cryptographic bit entropy, and character complexity.",
    icon: "ShieldCheck",
    keywords: ["password strength checker", "password entropy calculator", "time to crack password", "check password security"],
    inputType: "form",
    processingType: "client",
    usageCount: 29800,
    seoTitle: "Password Strength & Entropy Calculator | OmniCraft",
    seoDescription: "Check password strength, entropy in bits, and estimated brute-force crack time.",
    howToUse: [
      { step: 1, title: "Type Password", description: "Enter password to test locally." },
      { step: 2, title: "Inspect Score", description: "View entropy bits and estimated crack time." }
    ],
    relatedToolSlugs: ["password-generator", "secret-scanner"],
    componentName: "PasswordStrengthTool"
  },
  {
    id: "hmac-generator",
    name: "HMAC Hash Generator",
    slug: "hmac-generator",
    category: "security",
    description: "Generate keyed HMAC-SHA256, HMAC-SHA512, and HMAC-MD5 signatures for API authentication.",
    icon: "Key",
    keywords: ["hmac generator", "hmac sha256 generator", "api signature generator", "keyed hash generator"],
    inputType: "form",
    processingType: "client",
    usageCount: 23100,
    seoTitle: "HMAC Hash Generator — HMAC-SHA256 & SHA512 | OmniCraft",
    seoDescription: "Compute keyed HMAC message authentication codes for webhook verification.",
    howToUse: [
      { step: 1, title: "Select Algo", description: "Choose HMAC-SHA256 or SHA512." },
      { step: 2, title: "Enter Secret", description: "Type secret key and payload message." },
      { step: 3, title: "Copy Hash", description: "1-click copy generated signature." }
    ],
    relatedToolSlugs: ["hash-generator", "password-generator"],
    componentName: "HmacGeneratorTool"
  },
  {
    id: "secret-scanner",
    name: "Secret & Leak Scanner",
    slug: "secret-scanner",
    category: "security",
    description: "Scan pasted text locally for accidental leaks: AWS keys, Stripe tokens, GitHub PATs, and private keys.",
    icon: "ShieldAlert",
    keywords: ["secret scanner", "scan credentials in text", "detect aws keys in code", "api key leak checker"],
    inputType: "text",
    processingType: "client",
    usageCount: 20400,
    seoTitle: "Secret & API Key Leak Scanner — 100% In-Browser | OmniCraft",
    seoDescription: "Scan logs and code for exposed AWS keys, Stripe secrets, and tokens directly in browser.",
    howToUse: [
      { step: 1, title: "Paste Text", description: "Paste code or configuration logs." },
      { step: 2, title: "Inspect Leaks", description: "Check detected credential warnings." }
    ],
    relatedToolSlugs: ["password-strength", "password-generator"],
    componentName: "SecretScannerTool"
  },

  // ==========================================
  // EXTENDED TOOLS (DESIGN)
  // ==========================================
  {
    id: "color-palette",
    name: "Color Palette Generator",
    slug: "color-palette",
    category: "design",
    description: "Generate 5-shade harmonic color palettes with HEX codes from any primary base color.",
    icon: "Palette",
    keywords: ["color palette generator", "color scheme generator", "harmonic colors generator", "ui palette maker"],
    inputType: "custom",
    processingType: "client",
    usageCount: 35600,
    seoTitle: "Color Palette Generator — UI & Tailwind Shades | OmniCraft",
    seoDescription: "Create harmonic color palettes and shade scales for web and UI design.",
    howToUse: [
      { step: 1, title: "Pick Base Color", description: "Choose or paste any HEX color." },
      { step: 2, title: "Inspect Palette", description: "View generated 50 to 900 tint scale." },
      { step: 3, title: "Copy HEX", description: "Click any swatch to copy color code." }
    ],
    relatedToolSlugs: ["css-gradient-generator", "wcag-contrast"],
    componentName: "ColorPaletteTool"
  },
  {
    id: "css-glassmorphism",
    name: "CSS Glassmorphism Generator",
    slug: "css-glassmorphism",
    category: "design",
    description: "Design modern frosted glass UI components with backdrop-filter blur and transparency.",
    icon: "Layers",
    keywords: ["css glassmorphism generator", "frosted glass css generator", "glass ui maker", "backdrop filter generator"],
    inputType: "custom",
    processingType: "client",
    usageCount: 31900,
    seoTitle: "CSS Glassmorphism Generator — Frosted Glass UI | OmniCraft",
    seoDescription: "Generate hardware-accelerated CSS glassmorphism code with live card preview.",
    howToUse: [
      { step: 1, title: "Adjust Blur", description: "Change backdrop-filter blur radius." },
      { step: 2, title: "Set Opacity", description: "Adjust background and border transparency." },
      { step: 3, title: "Copy CSS", description: "Copy ready-to-use CSS rules." }
    ],
    relatedToolSlugs: ["css-box-shadow", "css-gradient-generator"],
    componentName: "CssGlassmorphismTool"
  },
  {
    id: "wcag-contrast",
    name: "WCAG Color Contrast Checker",
    slug: "wcag-contrast",
    category: "design",
    description: "Test foreground and background text color contrast against WCAG AA and AAA accessibility standards.",
    icon: "Eye",
    keywords: ["wcag contrast checker", "color contrast ratio", "accessible colors checker", "accessibility contrast tool"],
    inputType: "custom",
    processingType: "client",
    usageCount: 28400,
    seoTitle: "WCAG Color Contrast Checker — Accessibility Compliance | OmniCraft",
    seoDescription: "Test color combinations for WCAG 2.1 AA and AAA compliance with live sample text.",
    howToUse: [
      { step: 1, title: "Select Colors", description: "Pick text and background colors." },
      { step: 2, title: "Check Ratio", description: "Inspect contrast ratio (e.g. 7.4:1)." },
      { step: 3, title: "Verify Compliance", description: "Review AA and AAA Pass/Fail status." }
    ],
    relatedToolSlugs: ["color-palette", "css-box-shadow"],
    componentName: "WcagContrastTool"
  },

  // ==========================================
  // EXTENDED TOOLS (PRODUCTIVITY)
  // ==========================================
  {
    id: "random-number-generator",
    name: "Random Number Generator",
    slug: "random-number-generator",
    category: "productivity",
    description: "Generate single or batch random numbers within any custom minimum and maximum range.",
    icon: "Dices",
    keywords: ["random number generator", "random digit generator", "rng tool", "pick random number"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 47600,
    seoTitle: "Random Number Generator — Min / Max Range Generator | OmniCraft",
    seoDescription: "Generate random numbers online within any custom range with no-duplicates option.",
    howToUse: [
      { step: 1, title: "Set Range", description: "Choose minimum and maximum values." },
      { step: 2, title: "Set Quantity", description: "Pick how many numbers to generate." },
      { step: 3, title: "Generate", description: "Click Generate Numbers." }
    ],
    relatedToolSlugs: ["decision-maker", "nanoid-generator"],
    componentName: "RandomNumberTool"
  },
  {
    id: "stopwatch-timer",
    name: "Stopwatch & Lap Timer",
    slug: "stopwatch-timer",
    category: "productivity",
    description: "High-precision millisecond stopwatch with split lap recording and start/pause controls.",
    icon: "Clock",
    keywords: ["stopwatch online", "lap timer", "timer with laps", "millisecond stopwatch"],
    inputType: "custom",
    processingType: "client",
    usageCount: 27900,
    seoTitle: "Stopwatch & Lap Timer Online — Precision Milliseconds | OmniCraft",
    seoDescription: "Online stopwatch with precision milliseconds, lap timer, and pause controls.",
    howToUse: [
      { step: 1, title: "Start Timer", description: "Click Start to begin measuring time." },
      { step: 2, title: "Record Laps", description: "Click Lap to save split times." },
      { step: 3, title: "Pause / Reset", description: "Pause and reset timer whenever needed." }
    ],
    relatedToolSlugs: ["pomodoro-timer", "decision-maker"],
    componentName: "StopwatchTool"
  },

  // ==========================================
  // EXTENDED TOOLS (SOCIAL)
  // ==========================================
  {
    id: "hashtag-generator",
    name: "Social Hashtag Generator",
    slug: "hashtag-generator",
    category: "social",
    description: "Generate curated, high-engagement hashtags for Instagram, X (Twitter), TikTok, and LinkedIn.",
    icon: "Hash",
    keywords: ["hashtag generator", "instagram hashtags", "trending hashtags", "tiktok tag generator"],
    inputType: "custom",
    processingType: "client",
    usageCount: 31500,
    seoTitle: "Social Hashtag Generator — Instagram, X & TikTok Tags | OmniCraft",
    seoDescription: "Generate high-engagement hashtag bundles for Instagram, TikTok, and Twitter/X.",
    howToUse: [
      { step: 1, title: "Pick Category", description: "Choose Technology, Business, Design, or Fitness." },
      { step: 2, title: "Copy Tags", description: "1-click copy full 30-tag bundle." }
    ],
    relatedToolSlugs: ["social-character-counter", "social-aspect-ratio-helper"],
    componentName: "HashtagGeneratorTool"
  },
  {
    id: "social-character-counter",
    name: "Social Character Counter",
    slug: "social-character-counter",
    category: "social",
    description: "Live character counter with real-time limit indicators for X (280), Threads, LinkedIn, and Instagram.",
    icon: "Type",
    keywords: ["social character counter", "twitter character count", "linkedin post character limit", "threads character limit"],
    inputType: "text",
    processingType: "client",
    usageCount: 36800,
    seoTitle: "Social Character Counter — Twitter, LinkedIn, Instagram | OmniCraft",
    seoDescription: "Live character and limit counter for Twitter/X (280), Threads (500), and LinkedIn (3000).",
    howToUse: [
      { step: 1, title: "Type Post", description: "Write or paste your post copy." },
      { step: 2, title: "Check Limits", description: "See real-time progress bars for each social network." }
    ],
    relatedToolSlugs: ["word-counter", "hashtag-generator"],
    componentName: "SocialCharacterCounterTool"
  },

  // ==========================================
  // EXTENDED TOOLS (WEB)
  // ==========================================
  {
    id: "url-parser",
    name: "URL & Query String Parser",
    slug: "url-parser",
    category: "web",
    description: "Deconstruct URLs into protocol, hostname, port, pathname, hash, and individual query parameters.",
    icon: "Link",
    keywords: ["url parser", "parse query string", "url deconstruct tool", "query parameter inspector"],
    inputType: "form",
    processingType: "client",
    usageCount: 29500,
    seoTitle: "URL & Query String Parser — Breakdown Web URLs | OmniCraft",
    seoDescription: "Breakdown URLs into protocol, host, port, path, and extract all query parameter key-values.",
    howToUse: [
      { step: 1, title: "Enter URL", description: "Paste any full web URL." },
      { step: 2, title: "Inspect Components", description: "View parsed components and query parameter table." }
    ],
    relatedToolSlugs: ["url-encoder", "html-entities"],
    componentName: "UrlParserTool"
  },
  {
    id: "html-entities",
    name: "HTML Entity Encoder / Decoder",
    slug: "html-entities",
    category: "web",
    description: "Encode special characters into HTML entities and decode entities back to plain text.",
    icon: "Code",
    keywords: ["html entity encoder", "html entity decoder", "encode html special characters", "decode html entities"],
    inputType: "text",
    processingType: "client",
    usageCount: 24100,
    seoTitle: "HTML Entity Encoder & Decoder Online | OmniCraft",
    seoDescription: "Convert special symbols to HTML named/numeric entities and decode HTML back to text.",
    howToUse: [
      { step: 1, title: "Select Mode", description: "Choose Encode or Decode." },
      { step: 2, title: "Enter Text", description: "Type or paste your content." },
      { step: 3, title: "Copy Result", description: "Copy processed HTML in 1 click." }
    ],
    relatedToolSlugs: ["url-encoder", "url-parser"],
    componentName: "HtmlEntityEncoderTool"
  }
,

  // ==========================================
  // EXPANDED HIGH-PERFORMANCE TOOLS
  // ==========================================
  {
    id: "pdf-page-numbering",
    name: "PDF Page Numbering",
    slug: "pdf-page-numbering",
    category: "pdf",
    description: "Insert customizable page numbers, headers, and footers into any PDF document.",
    icon: "Layers",
    keywords: ["page numbering","number pdf pages","add page numbers","pdf footer numbers"],
    inputType: "file",
    processingType: "client",
    isNew: true,
    usageCount: 18400,
    seoTitle: "PDF Page Numbering — Add Custom Page Numbers Online | OmniCraft",
    seoDescription: "Insert custom headers, footers and page numbering formats into your PDF documents in seconds.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfPageNumberingTool"
  },

  {
    id: "pdf-crop",
    name: "PDF Crop Margins",
    slug: "pdf-crop",
    category: "pdf",
    description: "Trim unwanted white space and adjust page boundary margins on all PDF pages.",
    icon: "Crop",
    keywords: ["crop pdf","trim pdf borders","pdf margin adjuster","cut pdf margins"],
    inputType: "file",
    processingType: "client",
    usageCount: 12100,
    seoTitle: "PDF Crop — Trim Margins & White Borders Online | OmniCraft",
    seoDescription: "Crop unwanted margins and borders from your PDF files with instant browser preview.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfCropTool"
  },

  {
    id: "pdf-resize",
    name: "PDF Canvas Resize",
    slug: "pdf-resize",
    category: "pdf",
    description: "Convert PDF canvas dimensions to standard A4, US Letter, Legal, or A3 formats.",
    icon: "Maximize2",
    keywords: ["resize pdf","convert pdf to a4","pdf canvas resizer","letter to a4 pdf"],
    inputType: "file",
    processingType: "client",
    usageCount: 15300,
    seoTitle: "PDF Resize — Convert to A4, Letter & Standard Formats | OmniCraft",
    seoDescription: "Resize PDF pages to standard paper formats like A4, Letter, and Legal instantly.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfResizeTool"
  },

  {
    id: "pdf-duplicate-pages",
    name: "PDF Duplicate Pages",
    slug: "pdf-duplicate-pages",
    category: "pdf",
    description: "Multiply and duplicate specific or all pages in your PDF document effortlessly.",
    icon: "Copy",
    keywords: ["duplicate pdf pages","copy pdf pages","multiply pdf pages","repeat pdf"],
    inputType: "file",
    processingType: "client",
    usageCount: 9200,
    seoTitle: "PDF Duplicate Pages — Multiply Document Pages Online | OmniCraft",
    seoDescription: "Duplicate all or specific pages within your PDF document seamlessly.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfDuplicatePagesTool"
  },

  {
    id: "pdf-metadata-cleaner",
    name: "PDF Metadata Cleaner & Sanitizer",
    slug: "pdf-metadata-cleaner",
    category: "pdf",
    description: "Wipe all author names, creator software, GPS tags, and editing history from PDF files.",
    icon: "ShieldCheck",
    keywords: ["sanitize pdf","clean pdf metadata","strip author from pdf","remove pdf tracking"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 31200,
    seoTitle: "PDF Metadata Cleaner — Sanitize & Strip Tracking Data | OmniCraft",
    seoDescription: "Permanently remove hidden author details, creation dates, and metadata from PDFs.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfMetadataCleanerTool"
  },

  {
    id: "pdf-page-size-analyzer",
    name: "PDF Page Size & Dimension Analyzer",
    slug: "pdf-page-size-analyzer",
    category: "pdf",
    description: "Inspect exact points, millimeters, and orientation for every individual PDF page.",
    icon: "Maximize2",
    keywords: ["pdf page size","check pdf dimensions","pdf orientation inspector","pdf points to mm"],
    inputType: "file",
    processingType: "client",
    usageCount: 8400,
    seoTitle: "PDF Page Size Analyzer — Inspect Dimensions & Orientation | OmniCraft",
    seoDescription: "Analyze exact dimensions, point sizes, millimeters, and aspect ratios of PDF pages.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfPageSizeAnalyzerTool"
  },

  {
    id: "pdf-version-checker",
    name: "PDF Specification & Version Checker",
    slug: "pdf-version-checker",
    category: "pdf",
    description: "Inspect PDF version standards (1.3 - 2.0), producer tools, and encryption status.",
    icon: "FileCode",
    keywords: ["pdf version","check pdf spec","pdf compliance","pdf producer header"],
    inputType: "file",
    processingType: "client",
    usageCount: 7900,
    seoTitle: "PDF Version Checker — Technical Spec & Header Inspector | OmniCraft",
    seoDescription: "Verify PDF version compliance, producer signatures, and encryption properties.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfVersionCheckerTool"
  },

  {
    id: "pdf-to-markdown",
    name: "PDF to Markdown Converter",
    slug: "pdf-to-markdown",
    category: "pdf",
    description: "Extract and convert structured PDF text, headers, and paragraphs into clean Markdown.",
    icon: "FileText",
    keywords: ["pdf to markdown","convert pdf to md","pdf markdown extractor","pdf to text markdown"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 41500,
    seoTitle: "PDF to Markdown — Convert PDF to Clean .md Format | OmniCraft",
    seoDescription: "Extract formatted text, headings, and lists from PDF documents into Markdown.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfToMarkdownTool"
  },

  {
    id: "pdf-to-html",
    name: "PDF to Semantic HTML5",
    slug: "pdf-to-html",
    category: "pdf",
    description: "Convert PDF document chapters and paragraphs into clean, semantic HTML5 code.",
    icon: "FileCode",
    keywords: ["pdf to html","convert pdf to html5","pdf web converter","export pdf to html"],
    inputType: "file",
    processingType: "client",
    usageCount: 22800,
    seoTitle: "PDF to HTML — Convert PDF Documents to Web Pages | OmniCraft",
    seoDescription: "Transform PDF documents into responsive semantic HTML5 markup.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfToHtmlTool"
  },

  {
    id: "pdf-to-csv",
    name: "PDF Table to CSV Extractor",
    slug: "pdf-to-csv",
    category: "pdf",
    description: "Extract structured tables, statements, and delimited rows from PDFs into CSV format.",
    icon: "Table",
    keywords: ["pdf to csv","extract table from pdf","pdf table converter","bank statement to csv"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 53100,
    seoTitle: "PDF to CSV — Extract Tabular Data from PDF Online | OmniCraft",
    seoDescription: "Extract data tables, financial statements, and delimited columns from PDFs to CSV.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfToCsvTool"
  },

  {
    id: "pdf-word-counter",
    name: "PDF Word & Character Counter",
    slug: "pdf-word-counter",
    category: "pdf",
    description: "Count exact words, characters, pages, and estimate reading time of any PDF document.",
    icon: "Type",
    keywords: ["pdf word counter","count words in pdf","pdf reading time","pdf character count"],
    inputType: "file",
    processingType: "client",
    usageCount: 26400,
    seoTitle: "PDF Word Counter — Analyze Words, Chars & Read Time | OmniCraft",
    seoDescription: "Count total words, characters, and estimated reading time across PDF files.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfWordCounterTool"
  },

  {
    id: "pdf-page-counter",
    name: "PDF Bulk Page Counter & Inspector",
    slug: "pdf-page-counter",
    category: "pdf",
    description: "Upload multiple PDF files simultaneously to calculate total combined page counts.",
    icon: "Layers",
    keywords: ["bulk pdf page counter","count pages in multiple pdfs","pdf batch counter"],
    inputType: "files",
    processingType: "client",
    usageCount: 19800,
    seoTitle: "PDF Bulk Page Counter — Batch Page Count Inspector | OmniCraft",
    seoDescription: "Upload multiple PDFs to calculate total cumulative pages and size statistics.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfPageCounterTool"
  },

  {
    id: "pdf-compare",
    name: "PDF Document Comparison Tool",
    slug: "pdf-compare",
    category: "pdf",
    description: "Compare two versions of a PDF document to identify page and file size discrepancies.",
    icon: "Search",
    keywords: ["compare pdfs","pdf diff tool","compare two pdf versions","pdf change detector"],
    inputType: "files",
    processingType: "client",
    usageCount: 16700,
    seoTitle: "PDF Compare — Compare Two PDF Files Side-by-Side | OmniCraft",
    seoDescription: "Compare original and revised PDF files side-by-side to detect changes.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfCompareTool"
  },

  {
    id: "pdf-image-extractor",
    name: "PDF Image Asset Extractor",
    slug: "pdf-image-extractor",
    category: "pdf",
    description: "Extract embedded photos, diagrams, and raster graphics from PDF documents.",
    icon: "FileText",
    keywords: ["extract images from pdf","pdf photo grabber","save pictures from pdf","pdf to images"],
    inputType: "file",
    processingType: "client",
    usageCount: 34100,
    seoTitle: "PDF Image Extractor — Extract Images & Photos from PDF | OmniCraft",
    seoDescription: "Extract embedded photos and graphic assets from PDF pages into image files.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfImageExtractorTool"
  },

  {
    id: "pdf-font-inspector",
    name: "PDF Embedded Font Inspector",
    slug: "pdf-font-inspector",
    category: "pdf",
    description: "Inspect embedded Type 1, TrueType, and OpenType fonts inside PDF files.",
    icon: "Type",
    keywords: ["pdf font inspector","check fonts in pdf","embedded fonts pdf","pdf typography viewer"],
    inputType: "file",
    processingType: "client",
    usageCount: 11200,
    seoTitle: "PDF Font Inspector — Discover Embedded Fonts | OmniCraft",
    seoDescription: "Inspect typography definitions and embedded font families in PDF files.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PdfFontInspectorTool"
  },

  {
    id: "image-flip",
    name: "Image Mirror & Flip Tool",
    slug: "image-flip",
    category: "image",
    description: "Mirror photos horizontally or flip vertically with instant canvas download.",
    icon: "ImageIcon",
    keywords: ["flip image","mirror photo","flip horizontal","flip vertical photo"],
    inputType: "file",
    processingType: "client",
    usageCount: 22100,
    seoTitle: "Image Flip — Mirror Photos Horizontally & Vertically | OmniCraft",
    seoDescription: "Mirror images horizontally or flip upside down with instant browser rendering.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ImageFlipTool"
  },

  {
    id: "image-blur",
    name: "Image Blur & Privacy Censor",
    slug: "image-blur",
    category: "image",
    description: "Apply adjustable Gaussian blur to photos and sensitive background elements.",
    icon: "Sparkles",
    keywords: ["blur image","blur photo background","blur picture online","soft focus image"],
    inputType: "file",
    processingType: "client",
    usageCount: 29400,
    seoTitle: "Image Blur Tool — Soften & Blur Photos Online | OmniCraft",
    seoDescription: "Apply adjustable blur filters to images for privacy or aesthetic effects.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ImageBlurTool"
  },

  {
    id: "image-pixelate",
    name: "Image Pixelate & Censor Tool",
    slug: "image-pixelate",
    category: "image",
    description: "Pixelate photos into retro mosaic blocks or censor confidential credentials.",
    icon: "Grid",
    keywords: ["pixelate image","mosaic photo filter","censor photo","retro pixel effect"],
    inputType: "file",
    processingType: "client",
    usageCount: 31800,
    seoTitle: "Image Pixelate — Retro Mosaic & Censor Effect | OmniCraft",
    seoDescription: "Convert photos into retro pixel art or censor sensitive details with block pixels.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ImagePixelateTool"
  },

  {
    id: "image-rounded-corners",
    name: "Image Rounded Corners & Avatar Maker",
    slug: "image-rounded-corners",
    category: "image",
    description: "Round image corners or crop circular profile avatars with transparent PNG output.",
    icon: "Circle",
    keywords: ["round image corners","circular avatar crop","round photo edges","circle profile picture"],
    inputType: "file",
    processingType: "client",
    usageCount: 27500,
    seoTitle: "Image Rounded Corners — Create Circular Avatars & Soft Edges | OmniCraft",
    seoDescription: "Create perfect circular avatars or smooth rounded corner photos with transparent PNG.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ImageRoundedCornersTool"
  },

  {
    id: "image-border",
    name: "Image Border & Picture Frame Maker",
    slug: "image-border",
    category: "image",
    description: "Add customizable solid or colored borders and framing around any picture.",
    icon: "Square",
    keywords: ["add border to image","photo frame maker","picture border generator","white frame photo"],
    inputType: "file",
    processingType: "client",
    usageCount: 18900,
    seoTitle: "Image Border Maker — Add Frames to Photos Online | OmniCraft",
    seoDescription: "Add custom colored borders and picture frames to photos with live preview.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ImageBorderTool"
  },

  {
    id: "exif-viewer",
    name: "EXIF Metadata Viewer & Inspector",
    slug: "exif-viewer",
    category: "image",
    description: "Inspect camera model, shutter speed, ISO, focal length, and metadata tags.",
    icon: "Eye",
    keywords: ["exif viewer","view photo metadata","camera info reader","read exif online"],
    inputType: "file",
    processingType: "client",
    usageCount: 24300,
    seoTitle: "EXIF Metadata Viewer — Inspect Camera Tags & Photo Specs | OmniCraft",
    seoDescription: "Read technical EXIF parameters, shutter speed, ISO, and device information.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ExifViewerTool"
  },

  {
    id: "exif-remover",
    name: "EXIF Metadata Remover & Privacy Sanitizer",
    slug: "exif-remover",
    category: "image",
    description: "Strip all hidden GPS coordinates, device identifiers, and timestamps from photos.",
    icon: "Shield",
    keywords: ["remove exif","strip gps from photo","clean image metadata","photo privacy tool"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 48900,
    seoTitle: "EXIF Remover — Strip GPS & Camera Metadata from Photos | OmniCraft",
    seoDescription: "Sanitize photos by wiping GPS location tags and camera serial numbers before sharing.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ExifRemoverTool"
  },

  {
    id: "palette-generator",
    name: "Image Color Palette Extractor",
    slug: "palette-generator",
    category: "image",
    description: "Extract harmonic 8-color palettes and HEX codes directly from any image.",
    icon: "Palette",
    keywords: ["extract color palette from image","image color scheme","photo hex code extractor"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 39500,
    seoTitle: "Image Palette Generator — Extract Color Schemes from Photos | OmniCraft",
    seoDescription: "Generate harmonious color palettes and HEX codes from any uploaded photo.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PaletteGeneratorTool"
  },

  {
    id: "ascii-art-generator",
    name: "Image to ASCII Text Art Generator",
    slug: "ascii-art-generator",
    category: "image",
    description: "Convert photos and graphics into copyable ASCII text characters and terminal art.",
    icon: "FileCode",
    keywords: ["image to ascii","ascii art generator","photo to text art","convert picture to ascii"],
    inputType: "file",
    processingType: "client",
    usageCount: 33400,
    seoTitle: "Image to ASCII Art — Convert Photos to Text Art Online | OmniCraft",
    seoDescription: "Transform graphics and portraits into retro ASCII text character art.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AsciiArtGeneratorTool"
  },

  {
    id: "og-image-generator",
    name: "Open Graph (OG) Social Banner Studio",
    slug: "og-image-generator",
    category: "image",
    description: "Design 1200x630 social share banners for Twitter, LinkedIn, and Facebook.",
    icon: "Share2",
    keywords: ["og image generator","open graph banner maker","social preview banner","1200x630 banner"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 42100,
    seoTitle: "OG Image Generator — Create Social Share Banners Online | OmniCraft",
    seoDescription: "Generate pixel-perfect 1200x630 Open Graph banners for social media previews.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "OgImageGeneratorTool"
  },

  {
    id: "image-grayscale",
    name: "Image Grayscale & Black/White Studio",
    slug: "image-grayscale",
    category: "image",
    description: "Convert photos to monochrome, high-contrast noir, or warm black & white.",
    icon: "ImageIcon",
    keywords: ["black and white photo","grayscale image","convert photo to monochrome","bw filter"],
    inputType: "file",
    processingType: "client",
    usageCount: 28400,
    seoTitle: "Image Grayscale — Convert Photos to Black & White | OmniCraft",
    seoDescription: "Transform color photos into classic monochrome or high-contrast noir B&W images.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ImageGrayscaleTool"
  },

  {
    id: "image-brightness-contrast",
    name: "Image Brightness & Contrast Adjuster",
    slug: "image-brightness-contrast",
    category: "image",
    description: "Fine-tune exposure, brightness, contrast, and color saturation with live preview.",
    icon: "Sliders",
    keywords: ["adjust brightness","increase contrast photo","saturation slider","photo lighting fix"],
    inputType: "file",
    processingType: "client",
    usageCount: 26100,
    seoTitle: "Image Brightness & Contrast — Fine-Tune Photo Exposure | OmniCraft",
    seoDescription: "Adjust lighting, contrast, and vibrant saturation levels on photos directly in browser.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ImageBrightnessContrastTool"
  },

  {
    id: "dpi-calculator",
    name: "Image DPI & Physical Print Size Calculator",
    slug: "dpi-calculator",
    category: "image",
    description: "Calculate print resolution, DPI, and physical dimensions in inches and centimeters.",
    icon: "Maximize2",
    keywords: ["dpi calculator","pixels to inches print","print size calculator","300 dpi resolution"],
    inputType: "form",
    processingType: "client",
    usageCount: 17200,
    seoTitle: "DPI Calculator — Calculate Print Resolution & Dimensions | OmniCraft",
    seoDescription: "Convert pixel dimensions to inches and cm for 72, 150, 300, and 600 DPI printing.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "DpiCalculatorTool"
  },

  {
    id: "svg-optimizer",
    name: "SVG Optimizer & Code Minifier",
    slug: "svg-optimizer",
    category: "image",
    description: "Strip unused metadata, editor namespaces, and whitespace from SVG vector code.",
    icon: "Zap",
    keywords: ["optimize svg","minify svg","clean svg code","reduce svg size"],
    inputType: "text",
    processingType: "client",
    usageCount: 35600,
    seoTitle: "SVG Optimizer — Minify & Clean Vector SVG Code | OmniCraft",
    seoDescription: "Clean and compress SVG markup with zero visual degradation.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SvgOptimizerTool"
  },

  {
    id: "invert-colors",
    name: "Invert Image Colors (Negative Filter)",
    slug: "invert-colors",
    category: "image",
    description: "Invert color channels to create negative film effects with instant download.",
    icon: "Contrast",
    keywords: ["invert colors","negative image filter","photo negative maker","reverse image colors"],
    inputType: "file",
    processingType: "client",
    usageCount: 14700,
    seoTitle: "Invert Image Colors — Negative Photo Filter Online | OmniCraft",
    seoDescription: "Create negative film photographs by inverting RGB color channels.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "InvertColorsTool"
  },

  {
    id: "sepia-filter",
    name: "Vintage Sepia Photo Filter",
    slug: "sepia-filter",
    category: "image",
    description: "Add warm nostalgic vintage sepia tones with adjustable intensity.",
    icon: "Sparkles",
    keywords: ["sepia filter","vintage photo filter","warm tone image","retro sepia picture"],
    inputType: "file",
    processingType: "client",
    usageCount: 16900,
    seoTitle: "Sepia Photo Filter — Add Vintage Warm Tones Online | OmniCraft",
    seoDescription: "Apply warm nostalgic sepia tones to modern photographs with live slider controls.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SepiaTool"
  },

  {
    id: "app-icon-generator",
    name: "Multi-Platform App Icon Generator",
    slug: "app-icon-generator",
    category: "image",
    description: "Generate standard icon sizes for iOS, Android, macOS, and PWA from a single logo.",
    icon: "Layers",
    keywords: ["app icon generator","ios app icon sizes","android icon maker","pwa icon generator"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 38200,
    seoTitle: "App Icon Generator — iOS, Android & PWA Icon Pack | OmniCraft",
    seoDescription: "Generate all standard mobile and web application icon dimensions in 1 click.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AppIconGeneratorTool"
  },

  {
    id: "geo-location-qr",
    name: "Geo-Location & Map Pin QR Generator",
    slug: "geo-location-qr",
    category: "qr-barcode",
    description: "Generate QR codes that open exact GPS coordinates directly in Google Maps & Apple Maps.",
    icon: "MapPin",
    keywords: ["location qr code","google maps qr","gps qr generator","geo qr code"],
    inputType: "form",
    processingType: "client",
    usageCount: 19400,
    seoTitle: "Geo-Location QR Code Generator — Direct Map Coordinates | OmniCraft",
    seoDescription: "Create GPS location QR codes that open Google Maps and Apple Maps instantly on mobile.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "GeoLocationQrTool"
  },

  {
    id: "whatsapp-qr",
    name: "WhatsApp Direct Chat QR Generator",
    slug: "whatsapp-qr",
    category: "qr-barcode",
    description: "Generate QR codes to initiate direct WhatsApp chats with pre-filled messages.",
    icon: "MessageCircle",
    keywords: ["whatsapp qr code","wa me qr generator","whatsapp chat qr","whatsapp business qr"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 46200,
    seoTitle: "WhatsApp QR Code Generator — Start Direct Chats | OmniCraft",
    seoDescription: "Generate customized WhatsApp click-to-chat QR codes with prefilled messages.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "WhatsAppQrTool"
  },

  {
    id: "crypto-qr",
    name: "Crypto & Bitcoin Wallet QR Generator",
    slug: "crypto-qr",
    category: "qr-barcode",
    description: "Generate payment QR codes for Bitcoin (BTC), Ethereum (ETH), and Solana (SOL) wallets.",
    icon: "DollarSign",
    keywords: ["bitcoin qr code","crypto wallet qr","ethereum qr generator","btc pay qr"],
    inputType: "form",
    processingType: "client",
    usageCount: 28100,
    seoTitle: "Crypto Wallet QR Code Generator — Bitcoin & Ethereum | OmniCraft",
    seoDescription: "Generate cryptocurrency wallet address QR codes with optional payment amount parameters.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CryptoQrTool"
  },

  {
    id: "event-calendar-qr",
    name: "Calendar Event (iCal) QR Generator",
    slug: "event-calendar-qr",
    category: "qr-barcode",
    description: "Create QR codes that automatically add conferences, webinars, and meetings to user calendars.",
    icon: "Calendar",
    keywords: ["calendar qr code","event qr generator","ical qr code","add to calendar qr"],
    inputType: "form",
    processingType: "client",
    usageCount: 21500,
    seoTitle: "Calendar Event QR Generator — 1-Click iCal Events | OmniCraft",
    seoDescription: "Generate iCal calendar event QR codes to let attendees save dates instantly.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "EventCalendarQrTool"
  },

  {
    id: "code128-barcode",
    name: "Code 128 Alphanumeric Barcode Generator",
    slug: "code128-barcode",
    category: "qr-barcode",
    description: "Generate high-density Code 128 barcodes for logistics, inventory, and packaging.",
    icon: "Barcode",
    keywords: ["code 128 barcode","generate code 128","alphanumeric barcode","shipping barcode"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 51200,
    seoTitle: "Code 128 Barcode Generator — High-Density Industrial Barcodes | OmniCraft",
    seoDescription: "Generate standard Code 128 barcodes with custom dimensions and SVG export.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "Code128BarcodeTool"
  },

  {
    id: "ean13-barcode",
    name: "EAN-13 Retail Barcode Generator",
    slug: "ean13-barcode",
    category: "qr-barcode",
    description: "Create international 13-digit EAN retail barcodes with automatic checksum calculation.",
    icon: "Barcode",
    keywords: ["ean 13 barcode","retail barcode generator","gtin 13 barcode","product barcode ean"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 44300,
    seoTitle: "EAN-13 Barcode Generator — International Retail Barcodes | OmniCraft",
    seoDescription: "Generate standard EAN-13 retail barcodes with automatic check digit validation.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "Ean13BarcodeTool"
  },

  {
    id: "code39-barcode",
    name: "Code 39 Industrial Barcode Generator",
    slug: "code39-barcode",
    category: "qr-barcode",
    description: "Generate classic 3-of-9 industrial barcodes used in automotive, defense, and manufacturing.",
    icon: "Barcode",
    keywords: ["code 39 barcode","3 of 9 barcode","industrial barcode generator","manufacturing barcode"],
    inputType: "text",
    processingType: "client",
    usageCount: 31000,
    seoTitle: "Code 39 Barcode Generator — Industrial 3-of-9 Barcodes | OmniCraft",
    seoDescription: "Generate Code 39 industrial barcodes with customizable heights and SVG download.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "Code39BarcodeTool"
  },

  {
    id: "upc-barcode",
    name: "UPC-A Retail Barcode Generator",
    slug: "upc-barcode",
    category: "qr-barcode",
    description: "Create North American standard 12-digit Universal Product Code (UPC-A) barcodes.",
    icon: "Barcode",
    keywords: ["upc barcode generator","upc a barcode","universal product code","us retail barcode"],
    inputType: "text",
    processingType: "client",
    usageCount: 38900,
    seoTitle: "UPC-A Barcode Generator — US & Canada Retail Barcodes | OmniCraft",
    seoDescription: "Generate compliant 12-digit UPC-A retail barcodes with high-resolution vector output.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "UpcBarcodeTool"
  },

  {
    id: "phone-call-qr",
    name: "Direct Phone Call QR Generator",
    slug: "phone-call-qr",
    category: "qr-barcode",
    description: "Create QR codes that instantly dial your business phone number on mobile devices.",
    icon: "Phone",
    keywords: ["phone call qr","tel qr generator","call me qr code","dial phone qr"],
    inputType: "form",
    processingType: "client",
    usageCount: 23400,
    seoTitle: "Phone Call QR Generator — 1-Click Dialing QR Codes | OmniCraft",
    seoDescription: "Create phone call QR codes that prompt mobile users to dial directly.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PhoneCallQrTool"
  },

  {
    id: "text-note-qr",
    name: "Plain Text & Secret Note QR Generator",
    slug: "text-note-qr",
    category: "qr-barcode",
    description: "Encode raw text, secret passwords, or offline notes into high-capacity QR codes.",
    icon: "FileText",
    keywords: ["text qr code","plain text qr","offline note qr","secret note qr generator"],
    inputType: "text",
    processingType: "client",
    usageCount: 20100,
    seoTitle: "Text QR Code Generator — Encode Plain Text & Notes | OmniCraft",
    seoDescription: "Encode text snippets, access codes, and notes into easily scannable QR codes.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "TextNoteQrTool"
  },

  {
    id: "paypal-qr",
    name: "PayPal Payment Link QR Generator",
    slug: "paypal-qr",
    category: "qr-barcode",
    description: "Generate instant payment QR codes linked directly to your PayPal.me username.",
    icon: "DollarSign",
    keywords: ["paypal qr code","paypal me qr generator","paypal payment qr","pay me qr"],
    inputType: "form",
    processingType: "client",
    usageCount: 27800,
    seoTitle: "PayPal QR Code Generator — Accept Instant Payments | OmniCraft",
    seoDescription: "Create custom PayPal payment QR codes for invoices, tips, and direct donations.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PayPalQrTool"
  },

  {
    id: "upi-payment-qr",
    name: "UPI Payment QR Code Generator",
    slug: "upi-payment-qr",
    category: "qr-barcode",
    description: "Generate Unified Payments Interface (UPI) QR codes for GPay, PhonePe, and Paytm.",
    icon: "CreditCard",
    keywords: ["upi qr code generator","bhim upi qr","gpay qr code","phonepe qr generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 61400,
    seoTitle: "UPI QR Code Generator — GPay, PhonePe & Paytm Payments | OmniCraft",
    seoDescription: "Generate standardized UPI payment QR codes with custom payee details and preset amounts.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "UpiPaymentQrTool"
  },

  {
    id: "itf-barcode",
    name: "ITF (Interleaved 2 of 5) Barcode Generator",
    slug: "itf-barcode",
    category: "qr-barcode",
    description: "Generate ITF-14 shipping and carton box barcodes for warehouse logistics.",
    icon: "Barcode",
    keywords: ["itf barcode","interleaved 2 of 5","itf 14 barcode generator","shipping carton barcode"],
    inputType: "text",
    processingType: "client",
    usageCount: 16400,
    seoTitle: "ITF Barcode Generator — Interleaved 2 of 5 Shipping Barcodes | OmniCraft",
    seoDescription: "Generate ITF and ITF-14 barcodes for corrugated packaging and pallet identification.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ItfBarcodeTool"
  },

  {
    id: "codabar-barcode",
    name: "Codabar Barcode Generator",
    slug: "codabar-barcode",
    category: "qr-barcode",
    description: "Generate Codabar barcodes widely used in blood banks, libraries, and air express shipping.",
    icon: "Barcode",
    keywords: ["codabar barcode","library barcode generator","blood bank barcode","usd-4 barcode"],
    inputType: "text",
    processingType: "client",
    usageCount: 14200,
    seoTitle: "Codabar Barcode Generator — Library & Medical Barcodes | OmniCraft",
    seoDescription: "Generate compliant Codabar barcodes with custom start and stop characters.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CodabarBarcodeTool"
  },

  {
    id: "length-converter",
    name: "Length & Distance Unit Converter",
    slug: "length-converter",
    category: "converters",
    description: "Convert meters, kilometers, miles, feet, inches, yards, and nautical miles.",
    icon: "ArrowLeftRight",
    keywords: ["length converter","meters to feet","miles to km","inches to cm converter"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 47800,
    seoTitle: "Length Converter — Meters, Miles, Feet & Kilometers | OmniCraft",
    seoDescription: "Instant unit conversion across metric and imperial length and distance measurements.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "LengthConverterTool"
  },

  {
    id: "weight-converter",
    name: "Weight & Mass Unit Converter",
    slug: "weight-converter",
    category: "converters",
    description: "Convert kilograms, pounds (lbs), grams, ounces, stones, and metric tons.",
    icon: "Scale",
    keywords: ["weight converter","kg to lbs","pounds to kilograms","grams to ounces converter"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 52100,
    seoTitle: "Weight Converter — Kilograms, Pounds & Ounces | OmniCraft",
    seoDescription: "Convert weight and mass measurements between metric and imperial systems instantly.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "WeightConverterTool"
  },

  {
    id: "temperature-converter",
    name: "Temperature Unit Converter",
    slug: "temperature-converter",
    category: "converters",
    description: "Convert between Celsius (°C), Fahrenheit (°F), and Kelvin (K) temperature scales.",
    icon: "Thermometer",
    keywords: ["temperature converter","celsius to fahrenheit","fahrenheit to celsius","kelvin converter"],
    inputType: "form",
    processingType: "client",
    usageCount: 36700,
    seoTitle: "Temperature Converter — Celsius, Fahrenheit & Kelvin | OmniCraft",
    seoDescription: "Calculate exact temperature conversions across Celsius, Fahrenheit, and Kelvin.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "TemperatureConverterTool"
  },

  {
    id: "typography-px-to-rem",
    name: "Typography PX to REM / EM Converter",
    slug: "typography-px-to-rem",
    category: "converters",
    description: "Convert pixel font sizes and spacing to modern CSS REM, EM, and PT values.",
    icon: "Type",
    keywords: ["px to rem","rem converter","pixels to rem css","px to em typography"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 59300,
    seoTitle: "PX to REM Converter — CSS Typography & Spacing Calculator | OmniCraft",
    seoDescription: "Convert pixel design values to responsive REM and EM units with customizable root base.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "TypographyPxToRemConverterTool"
  },

  {
    id: "coordinate-converter",
    name: "GPS Coordinate Converter (DD to DMS)",
    slug: "coordinate-converter",
    category: "converters",
    description: "Convert Decimal Degrees (DD) to Degrees Minutes Seconds (DMS) GPS coordinates.",
    icon: "Globe",
    keywords: ["coordinate converter","dd to dms","decimal degrees to dms","gps coordinate converter"],
    inputType: "form",
    processingType: "client",
    usageCount: 22400,
    seoTitle: "GPS Coordinate Converter — Decimal Degrees to DMS | OmniCraft",
    seoDescription: "Transform latitude and longitude between Decimal Degrees and Degrees Minutes Seconds.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CoordinateConverterTool"
  },

  {
    id: "mortgage-calculator",
    name: "Mortgage & Home Loan Calculator",
    slug: "mortgage-calculator",
    category: "calculators",
    description: "Calculate monthly mortgage payments, total loan principal, and interest amortizations.",
    icon: "DollarSign",
    keywords: ["mortgage calculator","home loan payment","monthly mortgage estimator","amortization calculator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 68900,
    seoTitle: "Mortgage Calculator — Estimate Monthly Payments & Interest | OmniCraft",
    seoDescription: "Calculate monthly home loan payments, down payment impact, and total interest over time.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "MortgageCalculatorTool"
  },

  {
    id: "salary-to-hourly",
    name: "Salary to Hourly Wage Calculator",
    slug: "salary-to-hourly",
    category: "calculators",
    description: "Convert annual salary into hourly, weekly, bi-weekly, and monthly paycheck wages.",
    icon: "Clock",
    keywords: ["salary to hourly","annual salary to hourly wage","hourly rate calculator","paycheck converter"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 54100,
    seoTitle: "Salary to Hourly Calculator — Convert Annual Pay to Hourly Rate | OmniCraft",
    seoDescription: "Convert yearly earnings into accurate hourly, bi-weekly, and monthly wage equivalents.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SalaryToHourlyCalculatorTool"
  },

  {
    id: "discount-sale-calculator",
    name: "Discount & Sale Savings Calculator",
    slug: "discount-sale-calculator",
    category: "calculators",
    description: "Calculate discounted purchase prices and exact dollar savings during retail sales.",
    icon: "Percent",
    keywords: ["discount calculator","sale price calculator","percent off calculator","shopping savings"],
    inputType: "form",
    processingType: "client",
    usageCount: 31200,
    seoTitle: "Discount Calculator — Calculate Sale Prices & Savings | OmniCraft",
    seoDescription: "Calculate post-discount retail prices and total savings from percentage off promotions.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "DiscountSaleCalculatorTool"
  },

  {
    id: "bmr-tdee-calculator",
    name: "BMR & TDEE Calorie Calculator",
    slug: "bmr-tdee-calculator",
    category: "calculators",
    description: "Estimate Basal Metabolic Rate and Total Daily Energy Expenditure calories via Mifflin-St Jeor.",
    icon: "Activity",
    keywords: ["tdee calculator","bmr calculator","daily calorie needs","maintenance calories"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 63800,
    seoTitle: "BMR & TDEE Calculator — Daily Calorie Expenditure | OmniCraft",
    seoDescription: "Calculate daily maintenance calorie targets and basal metabolic rate based on body stats.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "BmrTdeeCalculatorTool"
  },

  {
    id: "ohms-law-calculator",
    name: "Ohm's Law Electrical Calculator",
    slug: "ohms-law-calculator",
    category: "calculators",
    description: "Calculate Voltage (V), Current (I), Resistance (R), and Power (Watts) instantaneously.",
    icon: "Zap",
    keywords: ["ohms law calculator","voltage current resistance","electrical power calculator","watts calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 29700,
    seoTitle: "Ohm's Law Calculator — Voltage, Current, Resistance & Power | OmniCraft",
    seoDescription: "Calculate electrical circuit parameters using Ohm's Law formulas with live unit conversion.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "OhmsLawCalculatorTool"
  },

  {
    id: "electricity-cost-calculator",
    name: "Appliance Electricity Cost Calculator",
    slug: "electricity-cost-calculator",
    category: "calculators",
    description: "Calculate monthly and yearly power consumption costs based on appliance wattage and kWh rate.",
    icon: "Zap",
    keywords: ["electricity cost calculator","power consumption cost","appliance running cost","kwh calculator"],
    inputType: "form",
    processingType: "client",
    usageCount: 34500,
    seoTitle: "Electricity Cost Calculator — Appliance Power Consumption | OmniCraft",
    seoDescription: "Estimate running costs for household and office electronic appliances per month and year.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ElectricityCostCalculatorTool"
  },

  {
    id: "reverse-text",
    name: "Reverse Text & Word Inverter",
    slug: "reverse-text",
    category: "text",
    description: "Reverse text character-by-character, flip word orders, or reverse line sequences.",
    icon: "Repeat",
    keywords: ["reverse text","backwards text generator","reverse words","reverse lines"],
    inputType: "text",
    processingType: "client",
    usageCount: 24100,
    seoTitle: "Reverse Text Tool — Flip Characters, Words & Lines | OmniCraft",
    seoDescription: "Reverse character strings, word sequences, or line orders with 1-click clipboard copy.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ReverseTextTool"
  },

  {
    id: "clean-whitespace",
    name: "Clean Whitespace & Empty Lines",
    slug: "clean-whitespace",
    category: "text",
    description: "Remove duplicate spaces, fix irregular indentation, and strip empty lines.",
    icon: "AlignLeft",
    keywords: ["clean whitespace","remove extra spaces","strip empty lines","format text spacing"],
    inputType: "text",
    processingType: "client",
    usageCount: 38200,
    seoTitle: "Clean Whitespace — Remove Extra Spaces & Blank Lines | OmniCraft",
    seoDescription: "Clean messy text by stripping extra spaces, collapsing tabs, and deleting empty lines.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CleanWhitespaceTool"
  },

  {
    id: "add-line-numbers",
    name: "Add Line Numbers Tool",
    slug: "add-line-numbers",
    category: "text",
    description: "Prefix every line with sequential numbers, custom bullets, or roman numerals.",
    icon: "ListOrdered",
    keywords: ["add line numbers","number lines of text","sequential line prefix","line numbering tool"],
    inputType: "text",
    processingType: "client",
    usageCount: 19500,
    seoTitle: "Add Line Numbers — Prefix Sequential Numbers Online | OmniCraft",
    seoDescription: "Add custom sequential line numbers and prefixes to text documents and code snippets.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AddLineNumbersTool"
  },

  {
    id: "morse-code",
    name: "Morse Code Translator & Decoder",
    slug: "morse-code",
    category: "text",
    description: "Translate plain text into International Morse Code and decode Morse signals to text.",
    icon: "Hash",
    keywords: ["morse code translator","morse code decoder","text to morse","decode morse code"],
    inputType: "text",
    processingType: "client",
    usageCount: 32600,
    seoTitle: "Morse Code Translator — Encode & Decode Morse Code | OmniCraft",
    seoDescription: "Translate text to International Morse Code dots and dashes and decode back to text.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "MorseCodeTool"
  },

  {
    id: "extract-urls",
    name: "Extract URLs & Web Links Tool",
    slug: "extract-urls",
    category: "text",
    description: "Extract all HTTP/HTTPS links and web URLs from unstructured logs and documents.",
    icon: "Search",
    keywords: ["extract urls","url extractor","find links in text","extract web addresses"],
    inputType: "text",
    processingType: "client",
    usageCount: 28900,
    seoTitle: "Extract URLs — Extract Web Links from Text Online | OmniCraft",
    seoDescription: "Scan unstructured text and logs to extract and deduplicate all valid web links.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ExtractUrlsTool"
  },

  {
    id: "extract-emails",
    name: "Extract Email Addresses Tool",
    slug: "extract-emails",
    category: "text",
    description: "Scan text documents and server logs to extract and deduplicate email addresses.",
    icon: "Search",
    keywords: ["extract emails","email address extractor","find emails in text","scrape emails from text"],
    inputType: "text",
    processingType: "client",
    usageCount: 37400,
    seoTitle: "Extract Email Addresses — Scan & Deduplicate Emails | OmniCraft",
    seoDescription: "Extract all valid email addresses from text blocks with instant deduplication.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ExtractEmailsTool"
  },

  {
    id: "nato-phonetic",
    name: "NATO Phonetic Alphabet Converter",
    slug: "nato-phonetic",
    category: "text",
    description: "Convert text or callsigns to standard NATO phonetic spelling (Alpha, Bravo, Charlie).",
    icon: "Type",
    keywords: ["nato phonetic alphabet","aviation spelling alphabet","military phonetic alphabet"],
    inputType: "text",
    processingType: "client",
    usageCount: 21800,
    seoTitle: "NATO Phonetic Alphabet Converter — Military & Aviation Spelling | OmniCraft",
    seoDescription: "Convert words and call signs into standardized NATO aviation phonetic alphabet words.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "NatoPhoneticTool"
  },

  {
    id: "binary-to-text",
    name: "Binary to Plain Text Converter",
    slug: "binary-to-text",
    category: "text",
    description: "Decode 8-bit binary 01001000 byte streams into human-readable ASCII text.",
    icon: "Code",
    keywords: ["binary to text","decode binary","binary code translator","binary string to ascii"],
    inputType: "text",
    processingType: "client",
    usageCount: 42100,
    seoTitle: "Binary to Text Converter — Decode 8-Bit Binary Code | OmniCraft",
    seoDescription: "Translate binary 0s and 1s into plain ASCII and UTF-8 text strings.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "BinaryToTextTool"
  },

  {
    id: "rot13-cipher",
    name: "ROT13 & Caesar Cipher Tool",
    slug: "rot13-cipher",
    category: "text",
    description: "Encode and decode text using the classic ROT13 13-character letter substitution cipher.",
    icon: "Shuffle",
    keywords: ["rot13","rot13 cipher","caesar cipher","rot13 decoder","rot13 encoder"],
    inputType: "text",
    processingType: "client",
    usageCount: 26700,
    seoTitle: "ROT13 Cipher — Encode & Decode ROT13 Online | OmniCraft",
    seoDescription: "Encrypt and decrypt text with the classic 13-letter shift ROT13 substitution cipher.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "Rot13Tool"
  },

  {
    id: "leetspeak-generator",
    name: "LeetSpeak (1337 5P34K) Generator",
    slug: "leetspeak-generator",
    category: "text",
    description: "Convert plain text into hacker 1337 5p34k with numbers and special symbols.",
    icon: "Sparkles",
    keywords: ["leetspeak generator","1337 translator","leet speak converter","hacker text generator"],
    inputType: "text",
    processingType: "client",
    usageCount: 29800,
    seoTitle: "LeetSpeak Generator — Convert Text to 1337 5p34k | OmniCraft",
    seoDescription: "Transform ordinary phrases into retro hacker LeetSpeak character substitutions.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "LeetSpeakTool"
  },

  {
    id: "hex-to-text",
    name: "Hex to Text & Text to Hex Converter",
    slug: "hex-to-text",
    category: "text",
    description: "Convert hexadecimal byte sequences to UTF-8 text strings and encode text to hex.",
    icon: "Code",
    keywords: ["hex to text","text to hex","hexadecimal converter","decode hex string"],
    inputType: "text",
    processingType: "client",
    usageCount: 38400,
    seoTitle: "Hex to Text Converter — Encode & Decode Hex Bytes | OmniCraft",
    seoDescription: "Convert between hexadecimal character codes and plain readable text strings.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "HexToTextTool"
  },

  {
    id: "prefix-suffix-lines",
    name: "Prefix & Suffix Line Editor",
    slug: "prefix-suffix-lines",
    category: "text",
    description: "Add custom prefix strings and suffix characters to every line in a text block.",
    icon: "Type",
    keywords: ["prefix lines","suffix lines","add text to start of line","add text to end of line"],
    inputType: "text",
    processingType: "client",
    usageCount: 23900,
    seoTitle: "Prefix & Suffix Tool — Add Text to Every Line | OmniCraft",
    seoDescription: "Prepend prefixes and append suffixes across thousands of text lines in 1 click.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PrefixSuffixTool"
  },

  {
    id: "text-repeater",
    name: "Text Repeater & Multiplier",
    slug: "text-repeater",
    category: "text",
    description: "Repeat and duplicate strings, emojis, or lines N times with custom separators.",
    icon: "Repeat",
    keywords: ["text repeater","repeat string","multiply text","duplicate words online"],
    inputType: "form",
    processingType: "client",
    usageCount: 25600,
    seoTitle: "Text Repeater — Repeat & Multiply Strings Online | OmniCraft",
    seoDescription: "Multiply any text string up to 1000 times with customizable newline or space separators.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "TextRepeaterTool"
  },

  {
    id: "json-minifier",
    name: "JSON Minifier & Compressor",
    slug: "json-minifier",
    category: "developer",
    description: "Compress JSON files by stripping unneeded spaces, indentation, and newlines.",
    icon: "Zap",
    keywords: ["json minifier","compress json","minify json online","shrink json payload"],
    inputType: "code",
    processingType: "client",
    isPopular: true,
    usageCount: 62400,
    seoTitle: "JSON Minifier — Compress & Minify JSON Data | OmniCraft",
    seoDescription: "Compress JSON payloads to minimal byte size for high-speed API transmissions.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "JsonMinifierTool"
  },

  {
    id: "json-schema-generator",
    name: "JSON Schema Generator (Draft-07)",
    slug: "json-schema-generator",
    category: "developer",
    description: "Automatically infer JSON Schema specifications from sample JSON objects.",
    icon: "FileCode",
    keywords: ["json schema generator","generate json schema","json to schema","draft 07 schema"],
    inputType: "code",
    processingType: "client",
    isPopular: true,
    usageCount: 47900,
    seoTitle: "JSON Schema Generator — Infer JSON Schema from Payload | OmniCraft",
    seoDescription: "Generate Draft-07 compliant JSON Schema definitions from raw sample JSON data.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "JsonSchemaGeneratorTool"
  },

  {
    id: "json-to-interface",
    name: "JSON to Multi-Language Model Generator",
    slug: "json-to-interface",
    category: "developer",
    description: "Convert JSON to TypeScript interfaces, Python Pydantic, Go structs, Rust serde, and C#.",
    icon: "Code2",
    keywords: ["json to typescript","json to python","json to go struct","json to rust","json to c#"],
    inputType: "code",
    processingType: "client",
    isPopular: true,
    usageCount: 71200,
    seoTitle: "JSON to Interface — Convert JSON to TS, Python, Go, Rust & C# | OmniCraft",
    seoDescription: "Convert JSON objects into type-safe models across TypeScript, Python, Go, Rust, and C#.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "JsonToInterfaceTool"
  },

  {
    id: "cron-generator",
    name: "Cron Schedule Expression Generator & Parser",
    slug: "cron-generator",
    category: "developer",
    description: "Build, parse, and validate 5-field cron job schedule expressions visually.",
    icon: "Clock",
    keywords: ["cron generator","cron schedule builder","cron parser","crontab generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 58600,
    seoTitle: "Cron Schedule Generator — Build & Parse Crontab Expressions | OmniCraft",
    seoDescription: "Create and validate 5-field cron job schedules with plain English descriptions.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CronGeneratorTool"
  },

  {
    id: "curl-to-fetch",
    name: "cURL to Modern JavaScript Fetch Converter",
    slug: "curl-to-fetch",
    category: "developer",
    description: "Convert command-line cURL requests to modern async/await JavaScript Fetch API code.",
    icon: "Terminal",
    keywords: ["curl to fetch","curl to javascript","convert curl to code","curl to axios"],
    inputType: "code",
    processingType: "client",
    isPopular: true,
    usageCount: 64500,
    seoTitle: "cURL to Fetch Converter — Convert cURL to JavaScript | OmniCraft",
    seoDescription: "Convert cURL CLI requests into clean modern JavaScript Fetch and Axios code.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CurlToFetchTool"
  },

  {
    id: "dockerfile-generator",
    name: "Multi-Stage Dockerfile Generator",
    slug: "dockerfile-generator",
    category: "developer",
    description: "Generate production-ready multi-stage Dockerfiles for Node.js, Python, Go, and Rust.",
    icon: "Layers",
    keywords: ["dockerfile generator","generate dockerfile","nextjs dockerfile","python dockerfile"],
    inputType: "form",
    processingType: "client",
    usageCount: 43200,
    seoTitle: "Dockerfile Generator — Production Multi-Stage Dockerfiles | OmniCraft",
    seoDescription: "Generate secure, optimized multi-stage Dockerfiles for Node.js, Python, Go, and Rust.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "DockerfileGeneratorTool"
  },

  {
    id: "sri-hash-generator",
    name: "Subresource Integrity (SRI) Hash Generator",
    slug: "sri-hash-generator",
    category: "developer",
    description: "Compute SHA-384 Subresource Integrity hashes for script and stylesheet tags.",
    icon: "Shield",
    keywords: ["sri hash generator","subresource integrity","sha384 integrity tag","cdn security hash"],
    inputType: "code",
    processingType: "client",
    usageCount: 27900,
    seoTitle: "SRI Hash Generator — Compute Subresource Integrity Hashes | OmniCraft",
    seoDescription: "Generate SHA-384 Subresource Integrity HTML attributes to protect against CDN tampering.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SriHashGeneratorTool"
  },

  {
    id: "json-to-csv",
    name: "JSON to CSV Data Converter",
    slug: "json-to-csv",
    category: "developer",
    description: "Convert JSON object arrays to RFC 4180 compliant CSV spreadsheet files.",
    icon: "Table",
    keywords: ["json to csv","convert json array to csv","export json to excel","json spreadsheet converter"],
    inputType: "code",
    processingType: "client",
    isPopular: true,
    usageCount: 69400,
    seoTitle: "JSON to CSV Converter — Convert JSON Arrays to Spreadsheets | OmniCraft",
    seoDescription: "Convert structured JSON arrays into clean CSV rows ready for Excel and Google Sheets.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "JsonToCsvTool"
  },

  {
    id: "html-minifier",
    name: "HTML Minifier & Markup Cleaner",
    slug: "html-minifier",
    category: "developer",
    description: "Compress HTML5 markup by stripping comments, redundant spaces, and line breaks.",
    icon: "FileCode",
    keywords: ["html minifier","minify html","compress html code","clean html markup"],
    inputType: "code",
    processingType: "client",
    usageCount: 39800,
    seoTitle: "HTML Minifier — Compress HTML5 Markup Online | OmniCraft",
    seoDescription: "Minify HTML code to reduce web page payload sizes and accelerate load speeds.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "HtmlMinifierTool"
  },

  {
    id: "css-specificity",
    name: "CSS Specificity Calculator",
    slug: "css-specificity",
    category: "developer",
    description: "Calculate CSS specificity vectors (IDs, classes, elements) and compare rule priorities.",
    icon: "Code2",
    keywords: ["css specificity calculator","css selector priority","css specificity score","selector weight"],
    inputType: "text",
    processingType: "client",
    usageCount: 31200,
    seoTitle: "CSS Specificity Calculator — Calculate Selector Weights | OmniCraft",
    seoDescription: "Calculate and visualize exact CSS selector specificity scores to debug cascade conflicts.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CssSpecificityCalculatorTool"
  },

  {
    id: "api-key-generator",
    name: "Cryptographic API Key & Secret Generator",
    slug: "api-key-generator",
    category: "developer",
    description: "Generate high-entropy random API keys, bearer tokens, and application secrets.",
    icon: "Key",
    keywords: ["api key generator","generate secret key","random api token","secure token generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 57400,
    seoTitle: "API Key Generator — Cryptographic Secret Key Creator | OmniCraft",
    seoDescription: "Generate random, high-entropy API keys with custom prefixes and lengths.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ApiKeyGeneratorTool"
  },

  {
    id: "gitignore-generator",
    name: "Gitignore File Generator",
    slug: "gitignore-generator",
    category: "developer",
    description: "Generate curated .gitignore rules for Node.js, Python, Go, Rust, and IDE environments.",
    icon: "FileCode",
    keywords: ["gitignore generator","create gitignore","node gitignore","python gitignore"],
    inputType: "form",
    processingType: "client",
    usageCount: 48600,
    seoTitle: ".gitignore Generator — Curated Gitignore Rules | OmniCraft",
    seoDescription: "Generate production-grade .gitignore configuration files for major tech stacks.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "GitignoreGeneratorTool"
  },

  {
    id: "mock-json-api",
    name: "Mock JSON API Response Generator",
    slug: "mock-json-api",
    category: "developer",
    description: "Generate synthetic test datasets with realistic user profiles, IDs, and timestamps.",
    icon: "Database",
    keywords: ["mock json generator","fake api data","synthetic json dataset","dummy json generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 63100,
    seoTitle: "Mock JSON Generator — Synthetic Test Datasets | OmniCraft",
    seoDescription: "Generate structured mock JSON API responses for rapid frontend prototyping and testing.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "MockJsonApiGeneratorTool"
  },

  {
    id: "keyword-density",
    name: "Keyword Density & Frequency Analyzer",
    slug: "keyword-density",
    category: "seo",
    description: "Analyze keyword frequency and density percentages across article and web copy.",
    icon: "Search",
    keywords: ["keyword density analyzer","seo keyword frequency","content keyword density","keyword count"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 43200,
    seoTitle: "Keyword Density Analyzer — Audit Content Keywords | OmniCraft",
    seoDescription: "Analyze keyword occurrences and density percentages to avoid search engine stuffing.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "KeywordDensityAnalyzerTool"
  },

  {
    id: "canonical-tag-generator",
    name: "Canonical Tag Generator",
    slug: "canonical-tag-generator",
    category: "seo",
    description: "Generate rel=canonical HTML tags to prevent duplicate content SEO penalties.",
    icon: "Globe",
    keywords: ["canonical tag generator","rel canonical","canonical link tag","duplicate content seo"],
    inputType: "form",
    processingType: "client",
    usageCount: 29400,
    seoTitle: "Canonical Tag Generator — Prevent Duplicate Content Penalties | OmniCraft",
    seoDescription: "Generate canonical URL tags to consolidate link signals and prevent duplicate content.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CanonicalTagGeneratorTool"
  },

  {
    id: "htaccess-redirect-generator",
    name: "Apache .htaccess 301 Redirect Generator",
    slug: "htaccess-redirect-generator",
    category: "seo",
    description: "Generate Apache RewriteRule directives for 301 permanent redirects and HTTPS enforcement.",
    icon: "Terminal",
    keywords: ["htaccess redirect generator","301 redirect htaccess","force https htaccess","strip www htaccess"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 46800,
    seoTitle: ".htaccess Redirect Generator — Apache 301 Rewrites | OmniCraft",
    seoDescription: "Generate Apache .htaccess redirect rules for 301 redirects, SSL, and canonical domains.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "HtaccessRedirectGeneratorTool"
  },

  {
    id: "utm-builder",
    name: "Google Analytics UTM Campaign Builder",
    slug: "utm-builder",
    category: "seo",
    description: "Generate trackable campaign URLs with utm_source, utm_medium, and utm_campaign.",
    icon: "Share2",
    keywords: ["utm builder","google analytics utm","campaign url builder","utm link generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 52900,
    seoTitle: "UTM Campaign Builder — Generate Trackable Marketing Links | OmniCraft",
    seoDescription: "Build trackable campaign URLs with standard Google Analytics UTM parameters.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "UtmBuilderTool"
  },

  {
    id: "schema-article",
    name: "Schema.org Article & BlogPosting Generator",
    slug: "schema-article",
    category: "seo",
    description: "Generate JSON-LD structured data for blog posts and news articles for Google rich results.",
    icon: "FileCode",
    keywords: ["schema article generator","json ld blogposting","article structured data","google news schema"],
    inputType: "form",
    processingType: "client",
    usageCount: 38100,
    seoTitle: "Schema.org Article Generator — JSON-LD Structured Data | OmniCraft",
    seoDescription: "Generate Schema.org BlogPosting and Article JSON-LD markup for enhanced Google visibility.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SchemaArticleTool"
  },

  {
    id: "schema-product",
    name: "Schema.org Product & Offer Markup Generator",
    slug: "schema-product",
    category: "seo",
    description: "Generate eCommerce Product JSON-LD markup with pricing, availability, and star ratings.",
    icon: "Tag",
    keywords: ["schema product generator","product rich snippet","ecommerce json ld","product rating schema"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 41600,
    seoTitle: "Schema.org Product Generator — eCommerce JSON-LD Snippets | OmniCraft",
    seoDescription: "Generate Product structured data with price, stock status, and reviews for Google Search.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SchemaProductTool"
  },

  {
    id: "robots-validator",
    name: "Robots.txt Syntax Validator",
    slug: "robots-validator",
    category: "seo",
    description: "Validate robots.txt syntax, user-agent directives, and crawl-delay rules.",
    icon: "Shield",
    keywords: ["robots txt validator","validate robots txt","check robots txt syntax","crawl rules checker"],
    inputType: "text",
    processingType: "client",
    usageCount: 28400,
    seoTitle: "Robots.txt Validator — Verify Crawl Directives Online | OmniCraft",
    seoDescription: "Validate robots.txt syntax to ensure search crawlers can index your website properly.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "RobotsValidatorTool"
  },

  {
    id: "twitter-card-generator",
    name: "Twitter / X Card Meta Tag Generator",
    slug: "twitter-card-generator",
    category: "seo",
    description: "Generate summary_large_image Twitter card meta tags for rich social previews.",
    icon: "Share2",
    keywords: ["twitter card generator","x card meta tags","summary large image generator","twitter preview tag"],
    inputType: "form",
    processingType: "client",
    usageCount: 36700,
    seoTitle: "Twitter Card Generator — Create Rich Social Share Tags | OmniCraft",
    seoDescription: "Generate Twitter Card HTML tags to showcase beautiful previews on Twitter and X.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "TwitterCardGeneratorTool"
  },

  {
    id: "schema-faq",
    name: "Schema.org FAQPage JSON-LD Generator",
    slug: "schema-faq",
    category: "seo",
    description: "Create expandable FAQPage structured data markup for Google Search rich snippets.",
    icon: "HelpCircle",
    keywords: ["schema faq generator","faqpage json ld","google faq rich snippet","faq structured data"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 49300,
    seoTitle: "Schema FAQPage Generator — Google Rich Snippet Maker | OmniCraft",
    seoDescription: "Generate FAQPage Schema.org JSON-LD to display expandable questions in search results.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SchemaFaqTool"
  },

  {
    id: "schema-local-business",
    name: "Schema.org LocalBusiness Generator",
    slug: "schema-local-business",
    category: "seo",
    description: "Generate JSON-LD markup for local stores, restaurants, offices, and service businesses.",
    icon: "Building",
    keywords: ["local business schema","local seo json ld","business schema markup","google maps schema"],
    inputType: "form",
    processingType: "client",
    usageCount: 32400,
    seoTitle: "Schema LocalBusiness Generator — Local SEO JSON-LD | OmniCraft",
    seoDescription: "Create LocalBusiness structured data to boost local pack rankings and Google Maps listings.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SchemaLocalBusinessTool"
  },

  {
    id: "heading-tag-extractor",
    name: "Heading Tag & Hierarchy Inspector",
    slug: "heading-tag-extractor",
    category: "seo",
    description: "Audit H1, H2, H3, and H4 heading structures to find missing levels and SEO flaws.",
    icon: "Type",
    keywords: ["heading tag extractor","h1 tag auditor","inspect headings html","heading hierarchy seo"],
    inputType: "code",
    processingType: "client",
    usageCount: 25100,
    seoTitle: "Heading Tag Extractor — Audit H1-H6 Content Hierarchy | OmniCraft",
    seoDescription: "Extract and audit HTML heading hierarchies to ensure optimal readability and on-page SEO.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "HeadingTagExtractorTool"
  },

  {
    id: "nginx-redirect-generator",
    name: "Nginx 301 Redirect Rule Generator",
    slug: "nginx-redirect-generator",
    category: "seo",
    description: "Generate clean Nginx location blocks with return 301 permanent redirect rules.",
    icon: "Terminal",
    keywords: ["nginx redirect generator","nginx 301 rewrite","nginx return 301","nginx server block redirect"],
    inputType: "form",
    processingType: "client",
    usageCount: 30400,
    seoTitle: "Nginx Redirect Generator — Nginx 301 Rewrite Rules | OmniCraft",
    seoDescription: "Generate production Nginx server block location directives for 301 permanent redirects.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "NginxRedirectGeneratorTool"
  },

  {
    id: "ai-code-explainer",
    name: "AI Code Explainer & Logic Breakdown",
    slug: "ai-code-explainer",
    category: "ai",
    description: "Explain complex source code logic, algorithms, closures, and time complexities in plain English.",
    icon: "Code2",
    keywords: ["ai code explainer","explain code with ai","code breakdown tool","understand code ai"],
    inputType: "code",
    processingType: "ai",
    isPopular: true,
    usageCount: 78400,
    seoTitle: "AI Code Explainer — Understand Complex Code in Plain English | OmniCraft",
    seoDescription: "AI engine that breaks down algorithms, design patterns, and complexity step-by-step.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiCodeExplainerTool"
  },

  {
    id: "ai-cover-letter",
    name: "AI Tailored Cover Letter Generator",
    slug: "ai-cover-letter",
    category: "ai",
    description: "Generate highly persuasive, professional cover letters tailored to specific jobs and companies.",
    icon: "Briefcase",
    keywords: ["ai cover letter generator","write cover letter with ai","job application letter ai"],
    inputType: "form",
    processingType: "ai",
    isPopular: true,
    usageCount: 82100,
    seoTitle: "AI Cover Letter Generator — Custom Job Application Letters | OmniCraft",
    seoDescription: "Generate tailored, professional cover letters customized to your target role and skills.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiCoverLetterTool"
  },

  {
    id: "ai-blog-titles",
    name: "AI High-CTR Blog Title Generator",
    slug: "ai-blog-titles",
    category: "ai",
    description: "Generate viral, SEO-optimized headlines and article title angles from a single topic.",
    icon: "Sparkles",
    keywords: ["ai blog title generator","article headline generator","high ctr titles","blog post ideas ai"],
    inputType: "form",
    processingType: "ai",
    usageCount: 49800,
    seoTitle: "AI Blog Title Generator — High-CTR Article Headlines | OmniCraft",
    seoDescription: "Generate high-converting headlines and viral article title variations powered by AI.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiBlogTitleTool"
  },

  {
    id: "ai-product-description",
    name: "AI eCommerce Product Description Writer",
    slug: "ai-product-description",
    category: "ai",
    description: "Generate engaging, benefit-driven product copy from raw bullet points and technical specs.",
    icon: "ShoppingBag",
    keywords: ["ai product description writer","ecommerce copy ai","write product description","shopify copy ai"],
    inputType: "form",
    processingType: "ai",
    isPopular: true,
    usageCount: 56300,
    seoTitle: "AI Product Description Writer — High-Converting Copy | OmniCraft",
    seoDescription: "Transform product features into persuasive, high-converting product descriptions in seconds.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiProductDescriptionTool"
  },

  {
    id: "ai-commit-message",
    name: "AI Conventional Commit Message Generator",
    slug: "ai-commit-message",
    category: "ai",
    description: "Generate standard Conventional Commits (feat, fix, refactor) from git diffs.",
    icon: "Terminal",
    keywords: ["ai git commit message","conventional commit generator","git commit ai","diff to commit"],
    inputType: "code",
    processingType: "ai",
    usageCount: 47200,
    seoTitle: "AI Git Commit Message Generator — Conventional Commits | OmniCraft",
    seoDescription: "Generate semantic, standardized conventional git commit messages from code diffs.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiCommitMessageTool"
  },

  {
    id: "ai-sentiment-analyzer",
    name: "AI Sentiment & Emotion Tone Analyzer",
    slug: "ai-sentiment-analyzer",
    category: "ai",
    description: "Detect emotional sentiment, tone, and customer satisfaction levels in reviews and text.",
    icon: "Smile",
    keywords: ["ai sentiment analysis","sentiment analyzer","detect emotion in text","customer review tone"],
    inputType: "text",
    processingType: "ai",
    usageCount: 41200,
    seoTitle: "AI Sentiment Analyzer — Analyze Emotional Tone & Sentiment | OmniCraft",
    seoDescription: "Analyze customer feedback, social comments, and copy for sentiment and emotional tone.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiSentimentAnalyzerTool"
  },

  {
    id: "ai-tldr-generator",
    name: "AI 1-Sentence TL;DR Generator",
    slug: "ai-tldr-generator",
    category: "ai",
    description: "Condense long articles and documents into high-impact single-sentence executive takeaways.",
    icon: "Zap",
    keywords: ["ai tldr generator","tldr summarizer","condense article ai","1 sentence summary"],
    inputType: "text",
    processingType: "ai",
    isPopular: true,
    usageCount: 68100,
    seoTitle: "AI TL;DR Generator — Condense Articles to 1 Sentence | OmniCraft",
    seoDescription: "Extract the core takeaway from lengthy articles and reports in a concise 1-sentence TL;DR.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiTldrTool"
  },

  {
    id: "ai-tone-shifter",
    name: "AI Tone Shifter & Style Rewriter",
    slug: "ai-tone-shifter",
    category: "ai",
    description: "Transform communication tone between Diplomatic, Executive, Friendly, and Persuasive.",
    icon: "Shuffle",
    keywords: ["ai tone shifter","rewrite tone ai","professional tone rewriter","diplomatic email tone"],
    inputType: "text",
    processingType: "ai",
    isPopular: true,
    usageCount: 74200,
    seoTitle: "AI Tone Shifter — Rewrite Text in Multiple Styles | OmniCraft",
    seoDescription: "Convert rough drafts into diplomatic, executive, or persuasive communications instantly.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiToneShifterTool"
  },

  {
    id: "ai-social-captions",
    name: "AI Social Media Captions & Hook Maker",
    slug: "ai-social-captions",
    category: "ai",
    description: "Generate viral social media posts tailored for LinkedIn, Twitter/X, and Instagram.",
    icon: "MessageSquare",
    keywords: ["ai social caption generator","linkedin post generator ai","instagram caption ai","viral hooks ai"],
    inputType: "form",
    processingType: "ai",
    usageCount: 58900,
    seoTitle: "AI Social Media Captions — Posts for LinkedIn, X & Instagram | OmniCraft",
    seoDescription: "Craft engaging, platform-optimized captions with hashtags and opening hooks.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiSocialCaptionsTool"
  },

  {
    id: "ai-bio-generator",
    name: "AI Professional Bio & Profile Writer",
    slug: "ai-bio-generator",
    category: "ai",
    description: "Generate impactful personal bios for Twitter, LinkedIn, GitHub, and conference talks.",
    icon: "User",
    keywords: ["ai bio generator","professional bio writer","linkedin bio ai","twitter bio maker"],
    inputType: "form",
    processingType: "ai",
    usageCount: 44700,
    seoTitle: "AI Bio Generator — Craft Compelling Professional Bios | OmniCraft",
    seoDescription: "Generate concise, professional, and memorable biographical summaries for social profiles.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiBioGeneratorTool"
  },

  {
    id: "ai-meeting-minutes",
    name: "AI Meeting Minutes & Action Items Extractor",
    slug: "ai-meeting-minutes",
    category: "ai",
    description: "Extract executive summaries, deadlines, and assigned action items from meeting notes.",
    icon: "FileText",
    keywords: ["ai meeting minutes","meeting summary ai","extract action items","meeting notes to tasks"],
    inputType: "text",
    processingType: "ai",
    isPopular: true,
    usageCount: 65400,
    seoTitle: "AI Meeting Minutes — Extract Summaries & Action Items | OmniCraft",
    seoDescription: "Convert raw meeting transcripts into structured executive summaries and action items.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AiMeetingMinutesTool"
  },

  {
    id: "sha256-hash",
    name: "SHA-256 & Multi-Hash Cryptographic Tool",
    slug: "sha256-hash",
    category: "security",
    description: "Compute SHA-256, SHA-512, and MD5 cryptographic message digests in real time.",
    icon: "Lock",
    keywords: ["sha256 hash","sha 256 generator","compute sha512","md5 checksum generator"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 76300,
    seoTitle: "SHA-256 Hash Generator — Real-Time Cryptographic Hashes | OmniCraft",
    seoDescription: "Compute secure SHA-256 and SHA-512 cryptographic digests directly in your browser.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "Sha256HashTool"
  },

  {
    id: "password-entropy",
    name: "Password Entropy & Crack Time Calculator",
    slug: "password-entropy",
    category: "security",
    description: "Calculate mathematical Shannon entropy in bits and estimated brute-force resistance time.",
    icon: "Key",
    keywords: ["password entropy calculator","password crack time","shannon entropy bits","password strength score"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 48700,
    seoTitle: "Password Entropy Calculator — Calculate Bit Strength & Crack Time | OmniCraft",
    seoDescription: "Measure mathematical password entropy bits and estimate brute-force cracking resistance.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "PasswordEntropyTool"
  },

  {
    id: "data-masking",
    name: "Data Masking & PII Redaction Tool",
    slug: "data-masking",
    category: "security",
    description: "Redact Social Security numbers, credit card numbers, emails, and API keys from text.",
    icon: "Shield",
    keywords: ["data masking","redact pii","mask credit card","sanitize ssn text","redact sensitive data"],
    inputType: "text",
    processingType: "client",
    usageCount: 39100,
    seoTitle: "Data Masking Tool — Redact PII, Cards & Secret Keys | OmniCraft",
    seoDescription: "Sanitize logs and documents by automatically redacting sensitive personal data and keys.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "DataMaskingTool"
  },

  {
    id: "csp-builder",
    name: "Content Security Policy (CSP) Generator",
    slug: "csp-builder",
    category: "security",
    description: "Build robust Content-Security-Policy HTTP headers to prevent XSS and data injection attacks.",
    icon: "Shield",
    keywords: ["csp generator","content security policy builder","csp header generator","prevent xss csp"],
    inputType: "form",
    processingType: "client",
    usageCount: 35200,
    seoTitle: "CSP Generator — Build Content Security Policy Headers | OmniCraft",
    seoDescription: "Generate strong Content-Security-Policy headers with script, style, and connect directives.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CspBuilderTool"
  },

  {
    id: "otp-totp-simulator",
    name: "2FA TOTP One-Time Password Simulator",
    slug: "otp-totp-simulator",
    category: "security",
    description: "Simulate RFC 6238 Time-based One-Time Passwords with live 30-second token refresh countdown.",
    icon: "Clock",
    keywords: ["totp simulator","2fa code generator","time based otp","google authenticator simulator"],
    inputType: "form",
    processingType: "client",
    usageCount: 31400,
    seoTitle: "2FA TOTP Simulator — RFC 6238 Authenticator Token Generator | OmniCraft",
    seoDescription: "Simulate 2-Factor Authentication Time-based One-Time Passwords with live refresh timer.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "OtpTotpSimulatorTool"
  },

  {
    id: "csv-to-markdown",
    name: "CSV to GFM Markdown Table Converter",
    slug: "csv-to-markdown",
    category: "office",
    description: "Convert CSV rows and spreadsheets into GitHub-flavored Markdown tables.",
    icon: "Table",
    keywords: ["csv to markdown","csv to gfm table","convert spreadsheet to markdown","csv table generator"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 52100,
    seoTitle: "CSV to Markdown Table — Convert Spreadsheets to Markdown | OmniCraft",
    seoDescription: "Transform comma-separated spreadsheets into clean GitHub-flavored Markdown tables.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CsvToMarkdownTableTool"
  },

  {
    id: "csv-to-xml",
    name: "CSV to Structured XML Converter",
    slug: "csv-to-xml",
    category: "office",
    description: "Convert delimited tabular CSV files into well-formed XML record datasets.",
    icon: "FileCode",
    keywords: ["csv to xml","convert csv to xml","csv xml converter","export csv as xml"],
    inputType: "text",
    processingType: "client",
    usageCount: 29800,
    seoTitle: "CSV to XML Converter — Transform Tables to XML Datasets | OmniCraft",
    seoDescription: "Convert CSV rows into structured XML elements with custom tag naming.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CsvToXmlTool"
  },

  {
    id: "numbers-to-words",
    name: "Numbers to Currency Words Converter",
    slug: "numbers-to-words",
    category: "office",
    description: "Convert numeric currency figures into formal English check writing words.",
    icon: "DollarSign",
    keywords: ["numbers to words","amount to words","check writing amount","currency words converter"],
    inputType: "form",
    processingType: "client",
    usageCount: 37600,
    seoTitle: "Numbers to Words — Convert Figures to Legal Currency Words | OmniCraft",
    seoDescription: "Convert numerical dollar amounts into spelled-out English currency words for checks and contracts.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "NumbersToWordsTool"
  },

  {
    id: "json-table-grid",
    name: "JSON Tabular Grid & Filter Viewer",
    slug: "json-table-grid",
    category: "office",
    description: "Render complex JSON object arrays as an interactive, searchable HTML data grid.",
    icon: "Table",
    keywords: ["json table viewer","json grid viewer","searchable json table","view json as table"],
    inputType: "code",
    processingType: "client",
    usageCount: 46100,
    seoTitle: "JSON Table Grid Viewer — Interactive Searchable Data Grid | OmniCraft",
    seoDescription: "Visualize and filter JSON array datasets in an interactive sortable HTML spreadsheet grid.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "JsonTableGridViewerTool"
  },

  {
    id: "css-border-radius",
    name: "CSS Fancy Border Radius Generator",
    slug: "css-border-radius",
    category: "design",
    description: "Create organic blob shapes and custom 8-value CSS border-radius curvatures visually.",
    icon: "Layers",
    keywords: ["border radius generator","fancy border radius","css blob maker","organic shape generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 48900,
    seoTitle: "CSS Border Radius Generator — Create Organic Blobs & Shapes | OmniCraft",
    seoDescription: "Design organic blob shapes and complex 8-point CSS border-radius curves visually.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CssBorderRadiusGeneratorTool"
  },

  {
    id: "css-flexbox-playground",
    name: "CSS Flexbox Visual Playground",
    slug: "css-flexbox-playground",
    category: "design",
    description: "Interactive visual builder for flex-direction, justify-content, align-items, and gap.",
    icon: "Layout",
    keywords: ["css flexbox generator","flexbox playground","visual flexbox builder","flex layout tester"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 64200,
    seoTitle: "CSS Flexbox Playground — Visual Layout Builder | OmniCraft",
    seoDescription: "Experiment with CSS Flexbox properties visually and copy production-ready CSS code.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CssFlexboxPlaygroundTool"
  },

  {
    id: "neumorphism-soft-ui",
    name: "Neumorphism Soft UI CSS Generator",
    slug: "neumorphism-soft-ui",
    category: "design",
    description: "Generate soft UI extruded and inset neumorphism box-shadow effects with customizable light angles.",
    icon: "Sparkles",
    keywords: ["neumorphism generator","soft ui css","neumorphic shadow maker","soft box shadow"],
    inputType: "form",
    processingType: "client",
    usageCount: 41200,
    seoTitle: "Neumorphism Generator — Soft UI CSS Shadows & Lighting | OmniCraft",
    seoDescription: "Design modern neumorphic soft UI shadows and lighting effects with instant CSS export.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "NeumorphismSoftUiTool"
  },

  {
    id: "dice-roller",
    name: "3D Multi-Dice Roller (D6, D20, D12, D100)",
    slug: "dice-roller",
    category: "productivity",
    description: "Roll multiple tabletop gaming dice with sum calculations and random physics.",
    icon: "Dice1",
    keywords: ["dice roller","roll d20","roll d6","tabletop dice simulator","random dice roll"],
    inputType: "form",
    processingType: "client",
    usageCount: 38400,
    seoTitle: "3D Dice Roller — Roll D6, D20, D12 & Custom Dice Online | OmniCraft",
    seoDescription: "Roll multiple RPG tabletop dice with instant sum calculations and realistic random seeds.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "DiceRollerTool"
  },

  {
    id: "coin-flipper",
    name: "Heads or Tails Realistic Coin Flipper",
    slug: "coin-flipper",
    category: "productivity",
    description: "Flip a virtual coin with animated 3D rotation and cumulative streak statistics.",
    icon: "Shuffle",
    keywords: ["coin flipper","flip a coin","heads or tails","coin toss online","random coin flip"],
    inputType: "form",
    processingType: "client",
    usageCount: 45200,
    seoTitle: "Coin Flipper — Flip Heads or Tails Online | OmniCraft",
    seoDescription: "Flip a fair coin with animated rotation and track cumulative Heads vs Tails statistics.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "CoinFlipperTool"
  },

  {
    id: "world-clock-timezone",
    name: "World Clock & Timezone Explorer",
    slug: "world-clock-timezone",
    category: "productivity",
    description: "Live synchronized digital clocks across UTC, New York, London, Tokyo, and Sydney.",
    icon: "Globe",
    keywords: ["world clock","timezone converter","current time utc","global time zones"],
    inputType: "form",
    processingType: "client",
    usageCount: 36100,
    seoTitle: "World Clock — Live Global Timezones & Clocks | OmniCraft",
    seoDescription: "View live synchronized local times across major international time zones and financial hubs.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "WorldClockTimezoneTool"
  },

  {
    id: "frequency-tone-generator",
    name: "Web Audio Frequency Tone Generator (20Hz - 20kHz)",
    slug: "frequency-tone-generator",
    category: "audio",
    description: "Generate pure sine, square, sawtooth, and triangle audio frequencies in real time.",
    icon: "Activity",
    keywords: ["frequency generator","tone generator","audio hz generator","440hz tone","sine wave generator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 49200,
    seoTitle: "Frequency Tone Generator — 20Hz to 20kHz Audio Waves | OmniCraft",
    seoDescription: "Generate continuous audio tones across Sine, Square, Sawtooth, and Triangle wave frequencies.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "FrequencyToneGeneratorTool"
  },

  {
    id: "bpm-tap-tempo",
    name: "BPM Tap Tempo & Metronome Finder",
    slug: "bpm-tap-tempo",
    category: "audio",
    description: "Tap to calculate the exact beats per minute (BPM) of any song or musical rhythm.",
    icon: "Music",
    keywords: ["tap tempo","bpm calculator","find song bpm","tap bpm counter","metronome bpm"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 51800,
    seoTitle: "BPM Tap Tempo Finder — Calculate Beats Per Minute | OmniCraft",
    seoDescription: "Tap along with any rhythm to instantly calculate precise musical beats per minute.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "BpmTapTempoFinderTool"
  },

  {
    id: "audio-delay-calculator",
    name: "Audio Delay & Reverb Time Calculator",
    slug: "audio-delay-calculator",
    category: "audio",
    description: "Calculate delay and reverb millisecond values (1/4, 1/8, triplets) based on song tempo.",
    icon: "Clock",
    keywords: ["delay calculator","reverb time calculator","bpm to ms delay","music production delay time"],
    inputType: "form",
    processingType: "client",
    usageCount: 31400,
    seoTitle: "Audio Delay Calculator — BPM to Milliseconds Converter | OmniCraft",
    seoDescription: "Calculate exact delay, echo, and reverb decay times in milliseconds from BPM tempo.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "AudioDelayCalculatorTool"
  },

  {
    id: "video-bitrate-calculator",
    name: "Video Bitrate & File Size Calculator",
    slug: "video-bitrate-calculator",
    category: "video",
    description: "Calculate final video file size in MB/GB based on bitrate, audio channels, and duration.",
    icon: "Video",
    keywords: ["video bitrate calculator","video file size calculator","mbps to file size","video size estimator"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 43700,
    seoTitle: "Video Bitrate Calculator — Estimate File Sizes | OmniCraft",
    seoDescription: "Calculate video storage footprint and bitrate settings for YouTube, Discord, and web.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "VideoBitrateCalculatorTool"
  },

  {
    id: "video-thumbnail-capture",
    name: "Video Thumbnail & Frame Grabber",
    slug: "video-thumbnail-capture",
    category: "video",
    description: "Capture high-resolution PNG image frames at any specific timestamp in a video.",
    icon: "Camera",
    keywords: ["capture video frame","video thumbnail grabber","save frame from video","extract video screenshot"],
    inputType: "file",
    processingType: "client",
    isPopular: true,
    usageCount: 52400,
    seoTitle: "Video Thumbnail Capture — Grab High-Res Video Frames | OmniCraft",
    seoDescription: "Capture crystal-clear PNG frame screenshots from any uploaded video in full resolution.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "VideoThumbnailCaptureTool"
  },

  {
    id: "video-subtitles-formatter",
    name: "SRT / VTT Subtitles Time Shifter & Cleaner",
    slug: "video-subtitles-formatter",
    category: "video",
    description: "Shift subtitle timecodes forward or backward and fix formatting syntax errors.",
    icon: "FileCode",
    keywords: ["srt time shifter","sync subtitles","fix srt timing","vtt subtitle formatter"],
    inputType: "text",
    processingType: "client",
    usageCount: 28900,
    seoTitle: "SRT Subtitle Time Shifter — Sync & Clean Subtitles | OmniCraft",
    seoDescription: "Offset and synchronize SRT and VTT subtitle timestamps to match video audio perfectly.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "VideoSubtitlesFormatterTool"
  },

  {
    id: "twitter-thread-formatter",
    name: "Twitter / X Thread Formatter",
    slug: "twitter-thread-formatter",
    category: "social",
    description: "Split long essays and articles into numbered, character-optimized 280-character tweets.",
    icon: "Twitter",
    keywords: ["twitter thread formatter","tweet thread maker","split text into tweets","x thread writer"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 47600,
    seoTitle: "Twitter Thread Formatter — Split Articles into Tweets | OmniCraft",
    seoDescription: "Format and number long-form text into engaging 280-character tweet threads.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "TwitterThreadFormatterTool"
  },

  {
    id: "fancy-font-bio",
    name: "Fancy Unicode Font & Bio Generator",
    slug: "fancy-font-bio",
    category: "social",
    description: "Convert text into Bold Sans, Italic Serif, Monospace, and aesthetic Unicode fonts.",
    icon: "Sparkles",
    keywords: ["fancy font generator","instagram bio font","unicode text converter","aesthetic font generator"],
    inputType: "text",
    processingType: "client",
    isPopular: true,
    usageCount: 58200,
    seoTitle: "Fancy Font Generator — Aesthetic Unicode Text for Bios | OmniCraft",
    seoDescription: "Generate stylish bold, italic, and monospace Unicode fonts for Instagram, Twitter, and TikTok.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "FancyFontBioGeneratorTool"
  },

  {
    id: "social-share-links",
    name: "Multi-Platform Social Share Link Generator",
    slug: "social-share-links",
    category: "social",
    description: "Generate 1-click share links for Twitter, LinkedIn, Facebook, WhatsApp, and Reddit.",
    icon: "Share2",
    keywords: ["social share link generator","create share url","click to share link","social media share buttons"],
    inputType: "form",
    processingType: "client",
    usageCount: 36400,
    seoTitle: "Social Share Link Generator — 1-Click Sharing URLs | OmniCraft",
    seoDescription: "Create direct sharing URLs for Twitter, LinkedIn, Facebook, WhatsApp, and Reddit.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "SocialShareLinkGeneratorTool"
  },

  {
    id: "youtube-embed-generator",
    name: "YouTube Responsive Embed Code Generator",
    slug: "youtube-embed-generator",
    category: "social",
    description: "Generate responsive 16:9 iframe embed codes with autoplay and custom controls.",
    icon: "Youtube",
    keywords: ["youtube embed generator","responsive youtube iframe","embed youtube video","youtube embed code"],
    inputType: "form",
    processingType: "client",
    usageCount: 39500,
    seoTitle: "YouTube Embed Generator — Responsive iframe Embeds | OmniCraft",
    seoDescription: "Generate clean responsive 16:9 YouTube iframe embed codes for modern websites.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "YouTubeEmbedGeneratorTool"
  },

  {
    id: "manifest-json-generator",
    name: "PWA Web App Manifest.json Generator",
    slug: "manifest-json-generator",
    category: "web",
    description: "Generate compliant Progressive Web App (PWA) manifest.json configuration files.",
    icon: "Smartphone",
    keywords: ["manifest json generator","pwa manifest maker","web app manifest generator","pwa config"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 46800,
    seoTitle: "Web App Manifest Generator — PWA manifest.json Creator | OmniCraft",
    seoDescription: "Create custom manifest.json files with icons, theme colors, and display modes for PWAs.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "ManifestJsonGeneratorTool"
  },

  {
    id: "ip-subnet-cidr",
    name: "IP Subnet & CIDR Range Calculator",
    slug: "ip-subnet-cidr",
    category: "web",
    description: "Calculate subnet masks, usable host IP ranges, and broadcast addresses from CIDR prefixes.",
    icon: "Network",
    keywords: ["ip subnet calculator","cidr calculator","subnet mask calculator","ipv4 subnet range"],
    inputType: "form",
    processingType: "client",
    isPopular: true,
    usageCount: 51900,
    seoTitle: "IP Subnet & CIDR Calculator — IPv4 Network Range Tool | OmniCraft",
    seoDescription: "Calculate usable host IP ranges, subnet masks, and network addresses from CIDR blocks.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "IpSubnetCidrTool"
  },

  {
    id: "basic-auth-header",
    name: "HTTP Basic Auth Header Generator",
    slug: "basic-auth-header",
    category: "web",
    description: "Generate Base64 encoded HTTP Authorization: Basic header strings from username and password.",
    icon: "Key",
    keywords: ["basic auth generator","http authorization basic","base64 basic auth header","api basic auth"],
    inputType: "form",
    processingType: "client",
    usageCount: 34700,
    seoTitle: "HTTP Basic Auth Header Generator — Authorization Strings | OmniCraft",
    seoDescription: "Generate Base64 encoded HTTP Basic Authentication headers for API testing and curl.",
    howToUse: [
      { step: 1, title: "Configure Settings", description: "Enter inputs or upload assets in the interactive workspace." },
      { step: 2, title: "Execute Action", description: "Process the conversion, calculation, or analysis instantly." },
      { step: 3, title: "Export / Copy", description: "Download the generated output file or copy to clipboard." }
    ],
    features: ["100% Client-Side Processing", "Instant Browser Computation", "Zero Server Uploads"],
    componentName: "BasicAuthHeaderGeneratorTool"
  }
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS_REGISTRY.find((t) => t.slug === slug || t.id === slug);
}

export function getToolsByCategory(categoryId: string): ToolDefinition[] {
  return TOOLS_REGISTRY.filter((t) => t.category === categoryId);
}

export function getPopularTools(limit: number = 8): ToolDefinition[] {
  return [...TOOLS_REGISTRY]
    .filter((t) => t.isPopular)
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, limit);
}

export function getNewTools(limit: number = 6): ToolDefinition[] {
  return [...TOOLS_REGISTRY].filter((t) => t.isNew).slice(0, limit);
}

export function getRelatedTools(tool: ToolDefinition, limit: number = 4): ToolDefinition[] {
  if (tool.relatedToolSlugs && tool.relatedToolSlugs.length > 0) {
    const matched = tool.relatedToolSlugs
      .map((slug) => getToolBySlug(slug))
      .filter((t): t is ToolDefinition => Boolean(t));
    if (matched.length >= limit) return matched.slice(0, limit);
  }

  // Fallback: search same category excluding current tool
  const sameCategory = TOOLS_REGISTRY.filter(
    (t) => t.category === tool.category && t.id !== tool.id
  );
  return sameCategory.slice(0, limit);
}
