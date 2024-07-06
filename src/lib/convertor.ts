import { createWorker } from "tesseract.js";

const convertor = async (imagePath: string) => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(imagePath);
  const text = ret.data.text;
  await worker.terminate();
  return text;
};

export default convertor;
