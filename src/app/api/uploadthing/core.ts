import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 4 } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            // TODO: Add auth check here later
            return { userId: "admin" };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.ufsUrl);
            return { uploadedBy: metadata.userId };
        }),

    resourceUploader: f({ pdf: { maxFileSize: "16MB", maxFileCount: 1 } })
        .middleware(async ({ req }) => {
            // TODO: Add auth check here later
            return { userId: "admin" };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Resource upload complete:", file.ufsUrl);
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
