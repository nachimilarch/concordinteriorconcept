import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file) => {
  const allowed = /jpeg|jpg|png|webp|gif|mp4/;
  if (allowed.test(path.extname(file.originalname).toLowerCase())) return true;
  throw new Error("Invalid file type.");
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: 15 * 1024 * 1024 } });
