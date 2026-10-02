"use client";

import React from "react";

// PDF Tools
import { PdfMergeTool } from "./pdf/PdfMergeTool";
import { PdfSplitTool } from "./pdf/PdfSplitTool";
import { PdfCompressTool } from "./pdf/PdfCompressTool";
import { PdfRotateTool } from "./pdf/PdfRotateTool";
import { PdfWatermarkTool } from "./pdf/PdfWatermarkTool";
import { PdfToTextTool, ImageToPdfTool } from "./pdf/PdfToTextTool";
import {
  PdfPageDeleterTool,
  PdfPageExtractorTool,
  PdfMetadataTool,
  PdfHeaderFooterTool,
} from "./pdf/PdfPageTools";
import {
  PdfPageNumberingTool,
  PdfCropTool,
  PdfResizeTool,
  PdfDuplicatePagesTool,
  PdfMetadataCleanerTool,
  PdfPageSizeAnalyzerTool,
  PdfVersionCheckerTool,
  PdfToMarkdownTool,
  PdfToHtmlTool,
  PdfToCsvTool,
  PdfWordCounterTool,
  PdfPageCounterTool,
  PdfCompareTool,
  PdfImageExtractorTool,
  PdfFontInspectorTool,
} from "./pdf/PdfExtendedBundle";

// Image Tools
import { ImageCompressorTool } from "./image/ImageCompressorTool";
import { ImageResizerTool } from "./image/ImageResizerTool";
import { ImageConverterTool } from "./image/ImageConverterTool";
import { ImageCropperTool } from "./image/ImageCropperTool";
import { ImageColorPickerTool } from "./image/ImageColorPickerTool";
import { MemeGeneratorTool } from "./image/MemeGeneratorTool";
import { ImageRotatorTool } from "./image/ImageRotatorTool";
import { ImageToBase64Tool, Base64ToImageTool } from "./image/ImageBase64Tools";
import { ImageFiltersTool, ImageWatermarkTool } from "./image/ImageFiltersTool";
import {
  FaviconGeneratorTool,
  SocialImageResizerTool,
  ImageDimensionAnalyzerTool,
} from "./image/ImageDesignTools";
import {
  ImageFlipTool,
  ImageBlurTool,
  ImagePixelateTool,
  ImageRoundedCornersTool,
  ImageBorderTool,
  ExifViewerTool,
  ExifRemoverTool,
  PaletteGeneratorTool,
  AsciiArtGeneratorTool,
  OgImageGeneratorTool,
} from "./image/ImageExtendedBundle";
import {
  ImageGrayscaleTool,
  ImageBrightnessContrastTool,
  DpiCalculatorTool,
  SvgOptimizerTool,
  InvertColorsTool,
  SepiaTool,
  AppIconGeneratorTool,
} from "./image/ImageExtendedBundle2";

// QR & Barcode Tools
import { QrGeneratorTool } from "./qr/QrGeneratorTool";
import { BarcodeGeneratorTool } from "./qr/BarcodeGeneratorTool";
import { WifiQrTool, VcardQrTool, EmailSmsQrTool } from "./qr/SpecializedQrTools";
import {
  GeoLocationQrTool,
  WhatsAppQrTool,
  CryptoQrTool,
  EventCalendarQrTool,
  Code128BarcodeTool,
  Ean13BarcodeTool,
  Code39BarcodeTool,
  UpcBarcodeTool,
} from "./qr/QrExtendedBundle";
import {
  PhoneCallQrTool,
  TextNoteQrTool,
  PayPalQrTool,
  UpiPaymentQrTool,
  ItfBarcodeTool,
  CodabarBarcodeTool,
} from "./qr/QrExtendedBundle2";

// Converters
import { UnitConverterTool } from "./converters/UnitConverterTool";
import { CurrencyConverterTool } from "./converters/CurrencyConverterTool";
import {
  NumberBaseTool,
  RomanNumeralTool,
  DataStorageTool,
} from "./converters/ConvertersBundle";
import {
  LengthConverterTool,
  WeightConverterTool,
  TemperatureConverterTool,
  TypographyPxToRemConverterTool,
  CoordinateConverterTool,
} from "./converters/ConvertersExtendedBundle";

// Calculators
import { ScientificCalculatorTool } from "./calculators/ScientificCalculatorTool";
import { EmiCalculatorTool } from "./calculators/EmiCalculatorTool";
import { CompoundInterestTool } from "./calculators/CompoundInterestTool";
import { PercentageCalculatorTool } from "./calculators/PercentageCalculatorTool";
import { BmiCalculatorTool } from "./calculators/BmiCalculatorTool";
import { AgeCalculatorTool } from "./calculators/AgeCalculatorTool";
import {
  SipCalculatorTool,
  GstTaxTool,
  TipCalculatorTool,
  DateDifferenceTool,
} from "./calculators/CalculatorsBundle";
import {
  MortgageCalculatorTool,
  SalaryToHourlyCalculatorTool,
  DiscountSaleCalculatorTool,
  BmrTdeeCalculatorTool,
  OhmsLawCalculatorTool,
  ElectricityCostCalculatorTool,
} from "./calculators/CalculatorsExtendedBundle";

// Text Tools
import { WordCounterTool } from "./text/WordCounterTool";
import { CaseConverterTool } from "./text/CaseConverterTool";
import { RemoveDuplicateLinesTool } from "./text/RemoveDuplicateLinesTool";
import { TextDiffTool } from "./text/TextDiffTool";
import { LoremIpsumTool } from "./text/LoremIpsumTool";
import {
  SortLinesTool,
  FindReplaceTool,
  TextToBinaryTool,
} from "./text/TextToolsBundle";
import {
  ReverseTextTool,
  CleanWhitespaceTool,
  AddLineNumbersTool,
  MorseCodeTool,
  ExtractUrlsTool,
  ExtractEmailsTool,
  NatoPhoneticTool,
} from "./text/TextExtendedBundle";
import {
  BinaryToTextTool,
  Rot13Tool,
  LeetSpeakTool,
  HexToTextTool,
  PrefixSuffixTool,
  TextRepeaterTool,
} from "./text/TextExtendedBundle2";

// Developer Tools
import { JsonFormatterTool } from "./developer/JsonFormatterTool";
import { Base64ConverterTool } from "./developer/Base64ConverterTool";
import { UrlEncoderTool } from "./developer/UrlEncoderTool";
import { JwtDecoderTool } from "./developer/JwtDecoderTool";
import { UuidGeneratorTool } from "./developer/UuidGeneratorTool";
import { HashGeneratorTool } from "./developer/HashGeneratorTool";
import { UnixTimestampTool } from "./developer/UnixTimestampTool";
import { MarkdownPreviewTool } from "./developer/MarkdownPreviewTool";
import {
  RegexTesterTool,
  SqlFormatterTool,
  JsonToTypescriptTool,
  NanoidGeneratorTool,
} from "./developer/DevToolsBundle";
import {
  JsonMinifierTool,
  JsonSchemaGeneratorTool,
  JsonToInterfaceTool,
  CronGeneratorTool,
  CurlToFetchTool,
  DockerfileGeneratorTool,
  SriHashGeneratorTool,
} from "./developer/DevExtendedBundle1";
import {
  JsonToCsvTool,
  HtmlMinifierTool,
  CssSpecificityCalculatorTool,
  ApiKeyGeneratorTool,
  GitignoreGeneratorTool,
  MockJsonApiGeneratorTool,
} from "./developer/DevExtendedBundle2";

// SEO Tools
import { MetaTagGeneratorTool } from "./seo/MetaTagGeneratorTool";
import { RobotsGeneratorTool } from "./seo/RobotsGeneratorTool";
import {
  SitemapGeneratorTool,
  SchemaMarkupTool,
  SerpPreviewTool,
  SlugGeneratorTool,
} from "./seo/SeoToolsBundle";
import {
  KeywordDensityAnalyzerTool,
  CanonicalTagGeneratorTool,
  HtaccessRedirectGeneratorTool,
  UtmBuilderTool,
  SchemaArticleTool,
  SchemaProductTool,
  RobotsValidatorTool,
} from "./seo/SeoExtendedBundle";
import {
  TwitterCardGeneratorTool,
  SchemaFaqTool,
  SchemaLocalBusinessTool,
  HeadingTagExtractorTool,
  NginxRedirectGeneratorTool,
} from "./seo/SeoExtendedBundle2";

// AI Tools
import { AiSummarizerTool } from "./ai/AiSummarizerTool";
import { AiGrammarTool } from "./ai/AiGrammarTool";
import {
  AiParaphraserTool,
  AiEmailWriterTool,
  AiSqlGeneratorTool,
} from "./ai/AiToolsBundle";
import {
  AiCodeExplainerTool,
  AiCoverLetterTool,
  AiBlogTitleTool,
  AiProductDescriptionTool,
  AiCommitMessageTool,
  AiSentimentAnalyzerTool,
} from "./ai/AiExtendedBundle";
import {
  AiTldrTool,
  AiToneShifterTool,
  AiSocialCaptionsTool,
  AiBioGeneratorTool,
  AiMeetingMinutesTool,
} from "./ai/AiExtendedBundle2";

// Security Tools
import { PasswordGeneratorTool } from "./security/PasswordGeneratorTool";
import {
  PasswordStrengthTool,
  HmacGeneratorTool,
  SecretScannerTool,
} from "./security/SecurityToolsBundle";
import {
  Sha256HashTool,
  PasswordEntropyTool,
  DataMaskingTool,
  CspBuilderTool,
  OtpTotpSimulatorTool,
} from "./security/SecurityExtendedBundle";

// Office Tools
import { CsvToJsonTool } from "./office/CsvToJsonTool";
import {
  CsvToMarkdownTableTool,
  CsvToXmlTool,
  NumbersToWordsTool,
  JsonTableGridViewerTool,
} from "./office/OfficeExtendedBundle";

// Design Tools
import { CssGradientTool } from "./design/CssGradientTool";
import { CssBoxShadowTool } from "./design/CssBoxShadowTool";
import {
  ColorPaletteTool,
  CssGlassmorphismTool,
  WcagContrastTool,
} from "./design/DesignToolsBundle";
import {
  CssBorderRadiusGeneratorTool,
  CssFlexboxPlaygroundTool,
  NeumorphismSoftUiTool,
} from "./design/DesignExtendedBundle";

// Productivity & Generators
import { PomodoroTimerTool } from "./productivity/PomodoroTimerTool";
import { DecisionMakerTool } from "./productivity/DecisionMakerTool";
import {
  RandomNumberTool,
  StopwatchTool,
} from "./productivity/ProductivityToolsBundle";
import {
  DiceRollerTool,
  CoinFlipperTool,
  WorldClockTimezoneTool,
} from "./productivity/ProductivityExtendedBundle";

// Audio Tools
import { AudioSpeedTool } from "./audio/AudioSpeedTool";
import { AudioTrimmerTool } from "./audio/AudioTrimmerTool";
import { VoiceRecorderTool } from "./audio/VoiceRecorderTool";
import { AudioVolumeBoosterTool } from "./audio/AudioVolumeBoosterTool";
import {
  FrequencyToneGeneratorTool,
  BpmTapTempoFinderTool,
  AudioDelayCalculatorTool,
} from "./audio/AudioExtendedBundle";

// Video Tools
import { VideoSpeedTool } from "./video/VideoSpeedTool";
import { VideoToGifTool } from "./video/VideoToGifTool";
import { VideoAspectRatioTool } from "./video/VideoAspectRatioTool";
import { VideoMuteTool } from "./video/VideoMuteTool";
import {
  VideoBitrateCalculatorTool,
  VideoThumbnailCaptureTool,
  VideoSubtitlesFormatterTool,
} from "./video/VideoExtendedBundle";

// Social & Web Tools
import { SocialPostPreviewTool } from "./social/SocialPostPreviewTool";
import {
  HashtagGeneratorTool,
  SocialCharacterCounterTool,
} from "./social/SocialToolsBundle";
import {
  TwitterThreadFormatterTool,
  FancyFontBioGeneratorTool,
  SocialShareLinkGeneratorTool,
  YouTubeEmbedGeneratorTool,
} from "./social/SocialExtendedBundle";
import { UserAgentTool } from "./web/UserAgentTool";
import { HttpStatusCodeTool } from "./web/HttpStatusCodeTool";
import {
  UrlParserTool,
  HtmlEntityEncoderTool,
} from "./web/WebToolsBundle";
import {
  ManifestJsonGeneratorTool,
  IpSubnetCidrTool,
  BasicAuthHeaderGeneratorTool,
} from "./web/WebExtendedBundle";

export const TOOL_COMPONENTS: Record<string, React.ComponentType<any>> = {
  // PDF
  "pdf-merge": PdfMergeTool,
  "pdf-split": PdfSplitTool,
  "pdf-compress": PdfCompressTool,
  "pdf-rotate": PdfRotateTool,
  "pdf-watermark": PdfWatermarkTool,
  "pdf-to-text": PdfToTextTool,
  "image-to-pdf": ImageToPdfTool,
  "pdf-page-deleter": PdfPageDeleterTool,
  "pdf-page-extractor": PdfPageExtractorTool,
  "pdf-metadata": PdfMetadataTool,
  "pdf-header-footer": PdfHeaderFooterTool,
  "pdf-page-numbering": PdfPageNumberingTool,
  "pdf-crop": PdfCropTool,
  "pdf-resize": PdfResizeTool,
  "pdf-duplicate-pages": PdfDuplicatePagesTool,
  "pdf-metadata-cleaner": PdfMetadataCleanerTool,
  "pdf-page-size-analyzer": PdfPageSizeAnalyzerTool,
  "pdf-version-checker": PdfVersionCheckerTool,
  "pdf-to-markdown": PdfToMarkdownTool,
  "pdf-to-html": PdfToHtmlTool,
  "pdf-to-csv": PdfToCsvTool,
  "pdf-word-counter": PdfWordCounterTool,
  "pdf-page-counter": PdfPageCounterTool,
  "pdf-compare": PdfCompareTool,
  "pdf-image-extractor": PdfImageExtractorTool,
  "pdf-font-inspector": PdfFontInspectorTool,
  PdfMergeTool,
  PdfSplitTool,
  PdfCompressTool,
  PdfRotateTool,
  PdfWatermarkTool,
  PdfToTextTool,
  ImageToPdfTool,
  PdfPageDeleterTool,
  PdfPageExtractorTool,
  PdfMetadataTool,
  PdfHeaderFooterTool,
  PdfPageNumberingTool,
  PdfCropTool,
  PdfResizeTool,
  PdfDuplicatePagesTool,
  PdfMetadataCleanerTool,
  PdfPageSizeAnalyzerTool,
  PdfVersionCheckerTool,
  PdfToMarkdownTool,
  PdfToHtmlTool,
  PdfToCsvTool,
  PdfWordCounterTool,
  PdfPageCounterTool,
  PdfCompareTool,
  PdfImageExtractorTool,
  PdfFontInspectorTool,

  // Image
  "image-compressor": ImageCompressorTool,
  "image-resizer": ImageResizerTool,
  "image-converter": ImageConverterTool,
  "image-cropper": ImageCropperTool,
  "image-color-picker": ImageColorPickerTool,
  "meme-generator": MemeGeneratorTool,
  "image-rotator": ImageRotatorTool,
  "image-to-base64": ImageToBase64Tool,
  "base64-to-image": Base64ToImageTool,
  "image-filters": ImageFiltersTool,
  "image-watermark": ImageWatermarkTool,
  "favicon-generator": FaviconGeneratorTool,
  "social-image-resizer": SocialImageResizerTool,
  "image-dimensions": ImageDimensionAnalyzerTool,
  "image-flip": ImageFlipTool,
  "image-blur": ImageBlurTool,
  "image-pixelate": ImagePixelateTool,
  "image-rounded-corners": ImageRoundedCornersTool,
  "image-border": ImageBorderTool,
  "exif-viewer": ExifViewerTool,
  "exif-remover": ExifRemoverTool,
  "palette-generator": PaletteGeneratorTool,
  "ascii-art-generator": AsciiArtGeneratorTool,
  "og-image-generator": OgImageGeneratorTool,
  "image-grayscale": ImageGrayscaleTool,
  "image-brightness-contrast": ImageBrightnessContrastTool,
  "dpi-calculator": DpiCalculatorTool,
  "svg-optimizer": SvgOptimizerTool,
  "invert-colors": InvertColorsTool,
  "sepia-filter": SepiaTool,
  "app-icon-generator": AppIconGeneratorTool,
  ImageCompressorTool,
  ImageResizerTool,
  ImageConverterTool,
  ImageCropperTool,
  ImageColorPickerTool,
  MemeGeneratorTool,
  ImageRotatorTool,
  ImageToBase64Tool,
  Base64ToImageTool,
  ImageFiltersTool,
  ImageWatermarkTool,
  FaviconGeneratorTool,
  SocialImageResizerTool,
  ImageDimensionAnalyzerTool,
  ImageFlipTool,
  ImageBlurTool,
  ImagePixelateTool,
  ImageRoundedCornersTool,
  ImageBorderTool,
  ExifViewerTool,
  ExifRemoverTool,
  PaletteGeneratorTool,
  AsciiArtGeneratorTool,
  OgImageGeneratorTool,
  ImageGrayscaleTool,
  ImageBrightnessContrastTool,
  DpiCalculatorTool,
  SvgOptimizerTool,
  InvertColorsTool,
  SepiaTool,
  AppIconGeneratorTool,

  // QR & Barcode
  "qr-generator": QrGeneratorTool,
  "barcode-generator": BarcodeGeneratorTool,
  "wifi-qr-generator": WifiQrTool,
  "vcard-qr-generator": VcardQrTool,
  "email-sms-qr": EmailSmsQrTool,
  "geo-location-qr": GeoLocationQrTool,
  "whatsapp-qr": WhatsAppQrTool,
  "crypto-qr": CryptoQrTool,
  "event-calendar-qr": EventCalendarQrTool,
  "code128-barcode": Code128BarcodeTool,
  "ean13-barcode": Ean13BarcodeTool,
  "code39-barcode": Code39BarcodeTool,
  "upc-barcode": UpcBarcodeTool,
  "phone-call-qr": PhoneCallQrTool,
  "text-note-qr": TextNoteQrTool,
  "paypal-qr": PayPalQrTool,
  "upi-payment-qr": UpiPaymentQrTool,
  "itf-barcode": ItfBarcodeTool,
  "codabar-barcode": CodabarBarcodeTool,
  QrGeneratorTool,
  BarcodeGeneratorTool,
  WifiQrTool,
  VcardQrTool,
  EmailSmsQrTool,
  GeoLocationQrTool,
  WhatsAppQrTool,
  CryptoQrTool,
  EventCalendarQrTool,
  Code128BarcodeTool,
  Ean13BarcodeTool,
  Code39BarcodeTool,
  UpcBarcodeTool,
  PhoneCallQrTool,
  TextNoteQrTool,
  PayPalQrTool,
  UpiPaymentQrTool,
  ItfBarcodeTool,
  CodabarBarcodeTool,

  // Converters
  "unit-converter": UnitConverterTool,
  "currency-converter": CurrencyConverterTool,
  "number-base-converter": NumberBaseTool,
  "roman-numeral-converter": RomanNumeralTool,
  "data-storage-converter": DataStorageTool,
  "length-converter": LengthConverterTool,
  "weight-converter": WeightConverterTool,
  "temperature-converter": TemperatureConverterTool,
  "typography-px-to-rem": TypographyPxToRemConverterTool,
  "coordinate-converter": CoordinateConverterTool,
  UnitConverterTool,
  CurrencyConverterTool,
  NumberBaseTool,
  RomanNumeralTool,
  DataStorageTool,
  LengthConverterTool,
  WeightConverterTool,
  TemperatureConverterTool,
  TypographyPxToRemConverterTool,
  CoordinateConverterTool,

  // Calculators
  "scientific-calculator": ScientificCalculatorTool,
  "emi-calculator": EmiCalculatorTool,
  "compound-interest-calculator": CompoundInterestTool,
  "percentage-calculator": PercentageCalculatorTool,
  "bmi-calculator": BmiCalculatorTool,
  "age-calculator": AgeCalculatorTool,
  "sip-calculator": SipCalculatorTool,
  "gst-calculator": GstTaxTool,
  "tip-calculator": TipCalculatorTool,
  "date-difference": DateDifferenceTool,
  "mortgage-calculator": MortgageCalculatorTool,
  "salary-to-hourly": SalaryToHourlyCalculatorTool,
  "discount-sale-calculator": DiscountSaleCalculatorTool,
  "bmr-tdee-calculator": BmrTdeeCalculatorTool,
  "ohms-law-calculator": OhmsLawCalculatorTool,
  "electricity-cost-calculator": ElectricityCostCalculatorTool,
  ScientificCalculatorTool,
  EmiCalculatorTool,
  CompoundInterestTool,
  PercentageCalculatorTool,
  BmiCalculatorTool,
  AgeCalculatorTool,
  SipCalculatorTool,
  GstTaxTool,
  TipCalculatorTool,
  DateDifferenceTool,
  MortgageCalculatorTool,
  SalaryToHourlyCalculatorTool,
  DiscountSaleCalculatorTool,
  BmrTdeeCalculatorTool,
  OhmsLawCalculatorTool,
  ElectricityCostCalculatorTool,

  // Text
  "word-counter": WordCounterTool,
  "case-converter": CaseConverterTool,
  "remove-duplicate-lines": RemoveDuplicateLinesTool,
  "text-diff": TextDiffTool,
  "lorem-ipsum-generator": LoremIpsumTool,
  "sort-lines": SortLinesTool,
  "find-and-replace": FindReplaceTool,
  "text-to-binary": TextToBinaryTool,
  "reverse-text": ReverseTextTool,
  "clean-whitespace": CleanWhitespaceTool,
  "text-cleaner": CleanWhitespaceTool,
  "add-line-numbers": AddLineNumbersTool,
  "morse-code": MorseCodeTool,
  "extract-urls": ExtractUrlsTool,
  "extract-emails": ExtractEmailsTool,
  "nato-phonetic": NatoPhoneticTool,
  "binary-to-text": BinaryToTextTool,
  "rot13-cipher": Rot13Tool,
  "leetspeak-generator": LeetSpeakTool,
  "hex-to-text": HexToTextTool,
  "prefix-suffix-lines": PrefixSuffixTool,
  "text-repeater": TextRepeaterTool,
  WordCounterTool,
  CaseConverterTool,
  RemoveDuplicateLinesTool,
  TextDiffTool,
  LoremIpsumTool,
  SortLinesTool,
  FindReplaceTool,
  TextToBinaryTool,
  ReverseTextTool,
  CleanWhitespaceTool,
  AddLineNumbersTool,
  MorseCodeTool,
  ExtractUrlsTool,
  ExtractEmailsTool,
  NatoPhoneticTool,
  BinaryToTextTool,
  Rot13Tool,
  LeetSpeakTool,
  HexToTextTool,
  PrefixSuffixTool,
  TextRepeaterTool,

  // Developer
  "json-formatter": JsonFormatterTool,
  "base64-converter": Base64ConverterTool,
  "url-encoder": UrlEncoderTool,
  "jwt-decoder": JwtDecoderTool,
  "uuid-generator": UuidGeneratorTool,
  "hash-generator": HashGeneratorTool,
  "unix-timestamp": UnixTimestampTool,
  "markdown-preview": MarkdownPreviewTool,
  "regex-tester": RegexTesterTool,
  "sql-formatter": SqlFormatterTool,
  "json-to-typescript": JsonToTypescriptTool,
  "nanoid-generator": NanoidGeneratorTool,
  "json-minifier": JsonMinifierTool,
  "json-schema-generator": JsonSchemaGeneratorTool,
  "json-to-interface": JsonToInterfaceTool,
  "cron-generator": CronGeneratorTool,
  "curl-to-fetch": CurlToFetchTool,
  "dockerfile-generator": DockerfileGeneratorTool,
  "sri-hash-generator": SriHashGeneratorTool,
  "json-to-csv": JsonToCsvTool,
  "html-minifier": HtmlMinifierTool,
  "css-specificity": CssSpecificityCalculatorTool,
  "api-key-generator": ApiKeyGeneratorTool,
  "gitignore-generator": GitignoreGeneratorTool,
  "mock-json-api": MockJsonApiGeneratorTool,
  JsonFormatterTool,
  Base64ConverterTool,
  UrlEncoderTool,
  JwtDecoderTool,
  UuidGeneratorTool,
  HashGeneratorTool,
  UnixTimestampTool,
  MarkdownPreviewTool,
  RegexTesterTool,
  SqlFormatterTool,
  JsonToTypescriptTool,
  NanoidGeneratorTool,
  JsonMinifierTool,
  JsonSchemaGeneratorTool,
  JsonToInterfaceTool,
  CronGeneratorTool,
  CurlToFetchTool,
  DockerfileGeneratorTool,
  SriHashGeneratorTool,
  JsonToCsvTool,
  HtmlMinifierTool,
  CssSpecificityCalculatorTool,
  ApiKeyGeneratorTool,
  GitignoreGeneratorTool,
  MockJsonApiGeneratorTool,

  // SEO
  "meta-tag-generator": MetaTagGeneratorTool,
  "robots-generator": RobotsGeneratorTool,
  "sitemap-generator": SitemapGeneratorTool,
  "schema-markup-generator": SchemaMarkupTool,
  "serp-preview": SerpPreviewTool,
  "slug-generator": SlugGeneratorTool,
  "keyword-density": KeywordDensityAnalyzerTool,
  "canonical-tag-generator": CanonicalTagGeneratorTool,
  "htaccess-redirect-generator": HtaccessRedirectGeneratorTool,
  "utm-builder": UtmBuilderTool,
  "schema-article": SchemaArticleTool,
  "schema-product": SchemaProductTool,
  "robots-validator": RobotsValidatorTool,
  "twitter-card-generator": TwitterCardGeneratorTool,
  "schema-faq": SchemaFaqTool,
  "schema-local-business": SchemaLocalBusinessTool,
  "heading-tag-extractor": HeadingTagExtractorTool,
  "nginx-redirect-generator": NginxRedirectGeneratorTool,
  MetaTagGeneratorTool,
  RobotsGeneratorTool,
  SitemapGeneratorTool,
  SchemaMarkupTool,
  SerpPreviewTool,
  SlugGeneratorTool,
  KeywordDensityAnalyzerTool,
  CanonicalTagGeneratorTool,
  HtaccessRedirectGeneratorTool,
  UtmBuilderTool,
  SchemaArticleTool,
  SchemaProductTool,
  RobotsValidatorTool,
  TwitterCardGeneratorTool,
  SchemaFaqTool,
  SchemaLocalBusinessTool,
  HeadingTagExtractorTool,
  NginxRedirectGeneratorTool,

  // AI
  "ai-text-summarizer": AiSummarizerTool,
  "ai-grammar-fixer": AiGrammarTool,
  "ai-paraphraser": AiParaphraserTool,
  "ai-email-writer": AiEmailWriterTool,
  "ai-sql-generator": AiSqlGeneratorTool,
  "ai-code-explainer": AiCodeExplainerTool,
  "ai-cover-letter": AiCoverLetterTool,
  "ai-blog-titles": AiBlogTitleTool,
  "ai-product-description": AiProductDescriptionTool,
  "ai-commit-message": AiCommitMessageTool,
  "ai-sentiment-analyzer": AiSentimentAnalyzerTool,
  "ai-tldr-generator": AiTldrTool,
  "ai-tone-shifter": AiToneShifterTool,
  "ai-social-captions": AiSocialCaptionsTool,
  "ai-bio-generator": AiBioGeneratorTool,
  "ai-meeting-minutes": AiMeetingMinutesTool,
  AiSummarizerTool,
  AiGrammarTool,
  AiParaphraserTool,
  AiEmailWriterTool,
  AiSqlGeneratorTool,
  AiCodeExplainerTool,
  AiCoverLetterTool,
  AiBlogTitleTool,
  AiProductDescriptionTool,
  AiCommitMessageTool,
  AiSentimentAnalyzerTool,
  AiTldrTool,
  AiToneShifterTool,
  AiSocialCaptionsTool,
  AiBioGeneratorTool,
  AiMeetingMinutesTool,

  // Security
  "password-generator": PasswordGeneratorTool,
  "password-strength": PasswordStrengthTool,
  "hmac-generator": HmacGeneratorTool,
  "secret-scanner": SecretScannerTool,
  "sha256-hash": Sha256HashTool,
  "password-entropy": PasswordEntropyTool,
  "data-masking": DataMaskingTool,
  "csp-builder": CspBuilderTool,
  "otp-totp-simulator": OtpTotpSimulatorTool,
  PasswordGeneratorTool,
  PasswordStrengthTool,
  HmacGeneratorTool,
  SecretScannerTool,
  Sha256HashTool,
  PasswordEntropyTool,
  DataMaskingTool,
  CspBuilderTool,
  OtpTotpSimulatorTool,

  // Office
  "csv-to-json": CsvToJsonTool,
  "csv-to-markdown": CsvToMarkdownTableTool,
  "csv-to-xml": CsvToXmlTool,
  "numbers-to-words": NumbersToWordsTool,
  "json-table-grid": JsonTableGridViewerTool,
  CsvToJsonTool,
  CsvToMarkdownTableTool,
  CsvToXmlTool,
  NumbersToWordsTool,
  JsonTableGridViewerTool,

  // Design
  "css-gradient-generator": CssGradientTool,
  "css-box-shadow": CssBoxShadowTool,
  "color-palette": ColorPaletteTool,
  "css-glassmorphism": CssGlassmorphismTool,
  "wcag-contrast": WcagContrastTool,
  "css-border-radius": CssBorderRadiusGeneratorTool,
  "css-flexbox-playground": CssFlexboxPlaygroundTool,
  "neumorphism-soft-ui": NeumorphismSoftUiTool,
  CssGradientTool,
  CssBoxShadowTool,
  ColorPaletteTool,
  CssGlassmorphismTool,
  WcagContrastTool,
  CssBorderRadiusGeneratorTool,
  CssFlexboxPlaygroundTool,
  NeumorphismSoftUiTool,

  // Productivity
  "pomodoro-timer": PomodoroTimerTool,
  "decision-maker": DecisionMakerTool,
  "random-number-generator": RandomNumberTool,
  "stopwatch-timer": StopwatchTool,
  "dice-roller": DiceRollerTool,
  "coin-flipper": CoinFlipperTool,
  "world-clock-timezone": WorldClockTimezoneTool,
  PomodoroTimerTool,
  DecisionMakerTool,
  RandomNumberTool,
  StopwatchTool,
  DiceRollerTool,
  CoinFlipperTool,
  WorldClockTimezoneTool,

  // Audio Tools
  "audio-speed-changer": AudioSpeedTool,
  "audio-trimmer": AudioTrimmerTool,
  "voice-recorder": VoiceRecorderTool,
  "audio-volume-booster": AudioVolumeBoosterTool,
  "frequency-tone-generator": FrequencyToneGeneratorTool,
  "bpm-tap-tempo": BpmTapTempoFinderTool,
  "audio-delay-calculator": AudioDelayCalculatorTool,
  AudioSpeedTool,
  AudioTrimmerTool,
  VoiceRecorderTool,
  AudioVolumeBoosterTool,
  FrequencyToneGeneratorTool,
  BpmTapTempoFinderTool,
  AudioDelayCalculatorTool,

  // Video Tools
  "video-speed-controller": VideoSpeedTool,
  "video-to-gif": VideoToGifTool,
  "video-aspect-ratio-calculator": VideoAspectRatioTool,
  "video-audio-remover": VideoMuteTool,
  "video-bitrate-calculator": VideoBitrateCalculatorTool,
  "video-thumbnail-capture": VideoThumbnailCaptureTool,
  "video-subtitles-formatter": VideoSubtitlesFormatterTool,
  VideoSpeedTool,
  VideoToGifTool,
  VideoAspectRatioTool,
  VideoMuteTool,
  VideoBitrateCalculatorTool,
  VideoThumbnailCaptureTool,
  VideoSubtitlesFormatterTool,

  // Social & Web Tools
  "social-aspect-ratio-helper": SocialPostPreviewTool,
  "hashtag-generator": HashtagGeneratorTool,
  "social-character-counter": SocialCharacterCounterTool,
  "twitter-thread-formatter": TwitterThreadFormatterTool,
  "fancy-font-bio": FancyFontBioGeneratorTool,
  "social-share-links": SocialShareLinkGeneratorTool,
  "youtube-embed-generator": YouTubeEmbedGeneratorTool,
  "user-agent-parser": UserAgentTool,
  "http-status-codes": HttpStatusCodeTool,
  "url-parser": UrlParserTool,
  "html-entities": HtmlEntityEncoderTool,
  "manifest-json-generator": ManifestJsonGeneratorTool,
  "ip-subnet-cidr": IpSubnetCidrTool,
  "basic-auth-header": BasicAuthHeaderGeneratorTool,
  SocialPostPreviewTool,
  HashtagGeneratorTool,
  SocialCharacterCounterTool,
  TwitterThreadFormatterTool,
  FancyFontBioGeneratorTool,
  SocialShareLinkGeneratorTool,
  YouTubeEmbedGeneratorTool,
  UserAgentTool,
  HttpStatusCodeTool,
  UrlParserTool,
  HtmlEntityEncoderTool,
  ManifestJsonGeneratorTool,
  IpSubnetCidrTool,
  BasicAuthHeaderGeneratorTool,
};

export function getToolComponent(slugOrName: string): React.ComponentType<any> | null {
  return TOOL_COMPONENTS[slugOrName] || null;
}
