const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.js",
  latex: true,
  flexsearch: {
    codeblock: false,
  },
});

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["tesseract.js"],
    outputFileTracingIncludes: {
      "/api/**/*": ["./node_modules/**/*.wasm", "./node_modules/**/*.proto"],
    },
  },
};

module.exports = withNextra(nextConfig);
