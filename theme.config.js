import { useRouter } from "next/navigation";
import DocsLogo from "./src/components/DocsLogo";

const config = {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – Perception",
      };
    }
  },
  logo: (
    <>
      <DocsLogo />
    </>
  ),
  project: {
    link: "https://github.com/lemonade64/ocr-api",
  },
  docsRepositoryBase: "https://github.com/lemonade64/ocr-api",
  navigation: {
    prev: true,
    next: true,
  },
  sidebar: {
    toggleButton: true,
  },
  darkMode: true,
  themeSwitch: {
    useOptions() {
      return {
        dark: "Dark",
      };
    },
  },
};

export default config;
