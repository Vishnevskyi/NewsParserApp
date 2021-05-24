let multer = require("multer");
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img/')
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname);
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/svg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const limits = {
    fileSize: 1024 * 1024 * 5
}
module.exports = multer({
    storage, fileFilter, limits
})