import type { UploadApiResponse } from "cloudinary";
import cloudinary from "../configs/cloudinary";

type ResourceType = "image" | "video" | "raw" | "auto";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  options: Record<string, unknown> = {}
) => {
  return new Promise<UploadApiResponse>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as UploadApiResponse);
      }
    );

    stream.end(buffer);
  });
};

export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: ResourceType = "auto"
) => {
  try {
    const result = await cloudinary.uploader.destroy(
      publicId,
      {
        resource_type: resourceType as "image" | "video" | "raw",
      }
    );

    return result;

  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const generatePrivateFileUrl = (
  publicId: string,
  resourceType: ResourceType = "auto"
) => {

  const timestamp = Math.round(Date.now() / 1000);

  return cloudinary.utils.private_download_url(
    publicId,
    null as unknown as string,
    {
      resource_type: resourceType as "image" | "video" | "raw",
      expires_at: timestamp + 60 * 5 // 5 mins
    }
  );

};