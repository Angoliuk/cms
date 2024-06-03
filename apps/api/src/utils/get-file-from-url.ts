export const getFileFromUrl = async (name: string, url?: string) => {
  try {
    if (!url) return null;

    const response = await fetch(url);

    if (!response.ok || !response.body) {
      console.log(`Failed to fetch image from ${url}`);
      return null;
    }

    const reader = response.body.getReader();

    let done = false;
    const chunks: Uint8Array[] = [];

    while (!done) {
      const { done: streamDone, value } = await reader.read();
      done = streamDone;
      if (!done && value) {
        chunks.push(value);
      }
    }

    const buffer = Buffer.concat(chunks);

    const contentEncoding = response.headers.get("content-encoding") || "7bit";

    const contentType = response.headers.get("content-type") || "application/octet-stream";

    return {
      buffer: buffer,
      encoding: contentEncoding,
      mimetype: contentType,
      originalname: name,
      size: buffer.length,
    };
  } catch (error) {
    console.error("Error reading stream:", error);
    return null;
  }
};
