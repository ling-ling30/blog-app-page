import { FILE_BASE_URL, uploader } from "@/lib/fetcher";

export async function UploadFileAndReplaceWithName(obj: Record<string, any>) {
  const convertedObj: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (value instanceof File) {
        // Upload the file and get the new file name (same logic as before)
        try {
          const uploadFileRequest = await uploader(value);
          if (uploadFileRequest.status !== 200) {
            return false;
          } else {
            const response: { data: string } = await uploadFileRequest.json();
            const filename = response.data;
            convertedObj[
              key
            ] = `https://pub-4a63f2a777414973af0945f89596da80.r2.dev/${response.data}`;
          }
        } catch (error) {
          console.error(error);
          return false;
        }
      } else if (Array.isArray(value)) {
        // Handle arrays, checking for files
        convertedObj[key] = await Promise.all(
          value.map(async (item) => {
            if (item instanceof File) {
              // Upload file and replace with filename
              try {
                const uploadFileRequest = await uploader(item);
                if (uploadFileRequest.status !== 200) {
                  throw new Error("File upload failed");
                } else {
                  const response: { data: string } =
                    await uploadFileRequest.json();
                  const filename = `https://pub-4a63f2a777414973af0945f89596da80.r2.dev/${response.data}`;
                  return filename;
                }
              } catch (error) {
                console.error(error);
                return null; // Handle upload errors gracefully (optional)
              }
            } else {
              // Recursively process non-file array elements
              return typeof item === "object" && item !== null
                ? await UploadFileAndReplaceWithName(item)
                : item;
            }
          })
        );
      } else if (typeof value === "object" && value !== null) {
        // Recursively handle nested objects
        convertedObj[key] = await UploadFileAndReplaceWithName(value);
      } else {
        // Preserve other types
        convertedObj[key] = value;
      }
    }
  }

  return convertedObj;
}
