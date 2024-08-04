import { NextResponse } from "next/server";
import convertor from "@/lib/convertor";
import fs from "fs/promises";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req) {
  try {
    if (req.method !== "POST") {
      return NextResponse.json({ error: "POST ONLY" }, { status: 405 });
    }

    const { imageData, outputOption } = await req.json();
    const buffer = Buffer.from(imageData.split(",")[1], "base64url");

    const imagePath =
      process.env.NODE_ENV === "development"
        ? "./public/OCRImage.png"
        : "/tmp/OCRImage.png";

    await fs.writeFile(imagePath, buffer);

    const text = await convertor(imagePath);

    const responseMap = {
      sanitised: text.replace(/\n/g, " "),
      percentEncoded: encodeURIComponent(text),
    };

    const response = responseMap[outputOption] || text;

    return NextResponse.json({ response });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
