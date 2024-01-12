const multer = require('multer');
var constants = require('../helpers/constants');
const sharp = require('sharp');
const shell = require('shelljs');

// Configure multer storage and file name
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, constants.UPLOADED_FILE_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const fileUpload = multer({ storage: fileStorage });
// Custom file upload middleware
const uploadFiles = (req, res) => {
  // Use multer upload instance
  fileUpload.array('files')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        res.status(500).send({ msg: `Multer uploading error: ${err.message}` }).end();
        return;
    } else if (err) {
        // An unknown error occurred when uploading.
        if (err.name == 'ExtensionError') {
            res.status(413).send({ msg: err.message }).end();
        } else {
            console.log('unknownError'+err.message);
            res.status(500).send( { msg: `unknown uploading error: ${err.message}`}).end();
        }
        return;
    }
    res.status(200).send({msg: 'Your files uploaded.'});
  });
};


const imageStorage = multer.memoryStorage();

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({msg: 'Please upload only images'}, false);
  }
};

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: imageFilter
});

const uploadImages = (req, res) => {
  imageUpload.array("files")(req, res, async err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(500).send({msg: "Too many files to upload."});
      }else {
        return res.status(500).send({ msg: `Multer uploading error: ${err.message}`});
      }
    } else if (err) {
      if (err.name == 'ExtensionError') {
        return res.status(413).send({ msg: err.message});
      } else {
        return res.status(500).send(err);
      }
    }else {
      if (!req.files) return res.status(500).send({ msg: 'No file found'});

      // compress uploaded image
      await Promise.all(
        req.files.map(async file => {
          const filename = file.originalname.replace(/\..+$/, "");
          const newFilename = `bezkoder-${filename}-${Date.now()}.jpeg`;

          await sharp(file.buffer)
            .resize(1000, 1000)
            .toFormat("jpeg")
            .jpeg({ quality: 20 })
            .toFile(`${constants.UPLOADED_IMAGE_PATH}/${newFilename}`);
        })
      );
      shell.exec("ls -d -1tr /home/ec2-user/temple_uploaded/temple_uploaded_images/* | head -n -15 | xargs -d '\n' rm -f");
      return res.status(200).send({msg: "Images Uploaded Successfully."});
    }
  });
};

module.exports = {uploadImages, uploadFiles};