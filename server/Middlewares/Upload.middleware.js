/** @format */

// Upload.middleware.js
import multer from "multer";

const storage = multer.memoryStorage(); // ❗ dùng memory

const upload = multer({ storage });

export default upload;
