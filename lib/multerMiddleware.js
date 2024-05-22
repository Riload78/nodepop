const multer = require("multer");

const imageFilter = (req, file, cb) => {
	if (file.mimetype === "image/jpeg") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const upload = multer({
	dest: "./uploads/",
	limits: {
		fileSize: 2 * 1024 * 1024, // 2MB
	},
	fileFilter: imageFilter,
});

module.exports = upload