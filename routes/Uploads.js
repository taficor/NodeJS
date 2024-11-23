var express = require('express');
var router = express.Router();
var upload = require("../modes/Upload");
//Upload một file
router.post('/upload', [upload.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            return res.json({ status: 0, link: "" });
        } else {
            const url = `http://192.168.1.13:3000/images/${file.filename}`;
            return res.json({ status: 1, url: url });
        }
    } catch (error) {
        console.log('Upload image error: ', error);
        return res.json({ status: 0, link: "" });
    }
});
//Upload nhiều file
router.post('/uploads', [upload.array('image', 9)],

    async (req, res, next) => {

        try {

            const { files } = req;

            if (!files) {

                return res.json({ status: 0, link: [] });

            } else {

                const url = [];

                for (const singleFile of files) {

                    url.push(`http://192.168.1.13:3000/images/${singleFile.filename}`);

                }

                return res.json({ status: 1, url: url });

            }

        } catch (error) {

            console.log('Upload image error: ', error);

            return res.json({ status: 0, link: [] });

        }

    })


module.exports = router;