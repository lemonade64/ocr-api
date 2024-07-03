export default function sitemap() {
  return [
    {
      url: "https://perception-ocr.vercel.app/",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://perception-ocr.vercel.app/usage",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://perception-ocr.vercel.app/resources/base64-to-image",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://perception-ocr.vercel.app/resources/tesseract",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
