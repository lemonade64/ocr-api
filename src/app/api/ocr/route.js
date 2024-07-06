const base64ToImage = require("base64-to-image");
import { NextResponse } from "next/server";
import convertor from "@/lib/convertor";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "POST ONLY" }, { status: 405 });
  }
  const data = await req.json();

  const base64String = data.imageData;
  const path = "./public/";
  const imageInformation = { fileName: "OCRImage", type: "png" };
  const imageInfo = base64ToImage(base64String, path, imageInformation);

  const imagePath = path + imageInfo.fileName;

  // async function recogniseText(imagePath) {
  //   function logger(m) {
  //     console.info(m);
  //   }

  //   try {
  //     const result = await Tesseract.recognize(imagePath, "eng", { logger });
  //     return result.data.text;
  //   } catch (e) {
  //     console.error("Error Recognising Text:", e);
  //   }
  // }

  async function recogniseText(imagePath) {
    return convertor(imagePath).then((result) => {
      console.info(result);
      return result;
    });
  }

  const text = (await recogniseText(imagePath)) ?? "No Text Found";
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
