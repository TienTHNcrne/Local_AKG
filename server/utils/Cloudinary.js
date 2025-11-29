import cloudinary from "../config/cloudinary.config.js";
import streamifier from "streamifier";

export const Cloudinary = (files, folder = "gps-images") => {
    return Promise.all(
        files.map((file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder },
                    (error, result) => {
                        if (result) resolve(result.secure_url);
                        else reject(error);
                    }
                );
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        })
    );
};
