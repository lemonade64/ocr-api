import { NextResponse } from "next/server";
import convertor from "@/lib/convertor";
import fs from "fs/promises";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "POST ONLY" }, { status: 405 });
  }

  try {
    const { imageData, outputOptions } = await req.json();
    if (!Array.isArray(outputOptions)) {
      return Response.json(
        { error: "outputOptions must be an array" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(imageData.split(",")[1], "base64url");

    const imagePath =
      process.env.NODE_ENV === "development"
        ? "./public/OCRImage.png"
        : "/tmp/OCRImage.png";

    await fs.writeFile(imagePath, buffer);

    const text = await convertor(imagePath);

    const responseMap = {
      sanitised: () => text.replace(/\n/g, " "),
      percentEncoded: () => encodeURIComponent(text),
      trimmed: () => text.trim(),
      lowerCase: () => text.toLowerCase(),
      upperCase: () => text.toUpperCase(),
      wordCount: () => text.split(/\s+/).filter(Boolean).length,
      characterCount: () => text.length,
      base64Encoded: () => Buffer.from(text).toString("base64"),
      slugified: () =>
        text
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
    };

    const response = {};

    for (const option of outputOptions) {
      response[option] =
        typeof option === "string" && responseMap[option]
          ? responseMap[option]()
          : `Unsupported Output Option: ${option}`;
    }

    return NextResponse.json({ response });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
