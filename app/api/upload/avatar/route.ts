import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file)
    return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const fileBuffer = Buffer.from(await file.arrayBuffer());

  try {
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: `avatar_${Date.now()}_${file.name}`,
      folder: "/AlphaWealth/avatars",
    });

    return NextResponse.json({ url: response.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
};
