export default function manifest() {
  return {
    name: "OCR API",
    short_name: "Optical Character Recognition API",
    description:
      "API for extracting text from images encoded in base64 using Optical Character Recognition (OCR).",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
