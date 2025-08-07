import cloudinary from "./config/cloudinary.config.js";

async function testUpload() {
    try {
        const result = await cloudinary.uploader.upload("./2.jpg", {
            folder: "test-folder", // optional
        });
        console.log("✅ Upload successful!");
        console.log("🌐 URL:", result.secure_url);
    } catch (error) {
        console.error("❌ Upload failed:", error);
    }
}

testUpload();
