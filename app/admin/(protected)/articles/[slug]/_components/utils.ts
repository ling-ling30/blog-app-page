import { uploader } from "@/lib/fetcher";

export const uploadFileTextEditor = async (file: File) => {
  const res = await uploader(file);
  const data: {
    message: string;
    data: string;
  } = await res.json();
  const url = data.data;

  return url;
};
