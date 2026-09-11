import cloudinary from "../lib/cloudinary";

export type CloudinaryUploadResult = {
    secure_url: string;
    public_id: string;
};

export async function uploadToCloudinary(
    file: File
): Promise<CloudinaryUploadResult> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");
    const dataURL = `data:${file.type};base64,${base64}`;

    const maxRetries = 3;
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Cloudinary upload attempt ${attempt}/${maxRetries}`);
            const result = await cloudinary.uploader.upload(dataURL, {
                folder: "next-estate",
                transformation: [{ format: "webp" }],
            });

            console.log("Cloudinary upload successful:", result.public_id);
            return {
                secure_url: result.secure_url,
                public_id: result.public_id,
            };
        } catch (error) {
            lastError = error;
            console.error(`Cloudinary upload attempt ${attempt} failed:`, error);

            const statusCode =
                typeof error === "object" && error !== null && "http_code" in error
                    ? (error as { http_code?: number }).http_code
                    : undefined;

            if (statusCode === 401 || statusCode === 403) {
                break;
            }

            if (attempt < maxRetries) {
                const delay = attempt * 1000;
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    console.error("Cloudinary upload failed after all retries:", lastError);
    const statusCode =
        typeof lastError === "object" && lastError !== null && "http_code" in lastError
            ? (lastError as { http_code?: number }).http_code
            : undefined;
    const message =
        statusCode === 403
            ? "Cloudinary API key is missing upload permission (create). Enable it or use a key with upload access."
            : statusCode === 401
                ? "Cloudinary credentials were rejected. Check CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET."
                : lastError instanceof Error
            ? lastError.message
            : typeof lastError === "object" && lastError !== null && "message" in lastError
                ? String((lastError as { message: unknown }).message)
                : "Unknown Cloudinary error";
    throw new Error(`Cloudinary upload failed: ${message}`);
}