export default function manifest() {
  return {
    name: "Perception",
    short_name: "Perception",
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
