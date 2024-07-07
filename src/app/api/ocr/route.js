const base64ToImage = require("base64-to-image");
import { NextResponse } from "next/server";
import convertor from "@/lib/convertor";
import path from "path";
import getConfig from "next/config";

const env = process.env.NODE_ENV;
console.info(env);

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "POST ONLY" }, { status: 405 });
  }
  const data = await req.json();

  const base64String = data.imageData;
  const imageRoot = "./";

  const imageInformation = { fileName: "OCRImage", type: "png" };
  const imageInfo = base64ToImage(base64String, imageRoot, imageInformation);

  const imagePath = path.join(
    getConfig().serverRuntimeConfig.PROJECT_ROOT,
    imageInfo.fileName
  );

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
