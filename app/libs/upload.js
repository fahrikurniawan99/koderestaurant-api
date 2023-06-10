const multer = require("multer");
const path = require("path");
const os = require("os");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, os.tmpdir());
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/; // Choose Types you want...
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  // const Already = fs.existsSync(`public/uploads/${file.originalname}`);

  // if (Already) {
  //   return cb("File sudah ada");
  // }

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Format bukan gambar"); // custom this message to fit your needs
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
