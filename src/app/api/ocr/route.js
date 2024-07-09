import { converBase64ToImage } from "convert-base64-to-image";
import { NextResponse } from "next/server";
import convertor from "@/lib/convertor";
import path from "path";
import getConfig from "next/config";

const root = getConfig().serverRuntimeConfig.PROJECT_ROOT;
const env = process.env.NODE_ENV;
console.info(root, env);

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "POST ONLY" }, { status: 405 });
  }
  const data = await req.json();
  const base64String = data.imageData;

  const imagePath =
    env === "development"
      ? "./public/OCRImage.png"
      : path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, "OCRImage.png");
  const image = converBase64ToImage(base64String, imagePath);

  async function recogniseText(imagePath) {
    return convertor(imagePath).then((result) => {
      console.info(result);
      return result;
    });
  }

  const text = await recogniseText(imagePath);
  const sanitisedText = text.replace(/\n/g, " ");

  try {
    return NextResponse.json({
      response: sanitisedText,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
