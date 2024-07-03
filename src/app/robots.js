export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://perception-ocr.vercel.app/sitemap.xml",
  };
}
