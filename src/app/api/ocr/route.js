import { NextResponse } from "next/server";
import convertor from "@/lib/convertor";
import getConfig from "next/config";
import path from "path";
import fs from "fs";

const env = process.env.NODE_ENV;

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "POST ONLY" }, { status: 405 });
  }
  const data = await req.json();
  const base64String = data.imageData;
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const imagePath =
    env === "development"
      ? "./public/OCRImage.png"
      : path.join(
          getConfig().serverRuntimeConfig.PROJECT_ROOT,
          ".next",
          "server",
          "app",
          "api",
          "ocr",
          "OCRImage.png"
        );
  console.log(imagePath);
  fs.writeFile(imagePath, buffer, "base64", function (err) {
    if (err) {
      console.error(`Error writing image to ${imagePath}: ${err.message}`, err);
    }
  });

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
