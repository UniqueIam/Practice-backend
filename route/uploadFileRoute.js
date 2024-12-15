const express = require('express');
const upload = require('../middleware/multerMiddleware');
const uploadFile = require('../controller/uploadFileController');
const router = express.Router();

router.post("/upload",upload.single("file"),uploadFile);

module.exports = router;