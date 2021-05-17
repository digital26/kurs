const cloudinary = require('cloudinary');

/*CLOUDINARY_CLOUD_NAME=dn7wtqst6
CLOUDINARY_API_KEY=592849717281415
CLOUDINARY_API_SECRET=UGqiScRdH3ypLjSZkKM9UTS5ny0
*/

//config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.upload = async(req, res) => {
    let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto', //jpeg,png
    });
    res.json({
        public_id: result.public_id,
        url: result.secure_url,
    });
};

exports.remove = (req, res) => {
    let image_id = req.body.public_id;

    cloudinary.uploader.destroy(image_id, (err,result) => {
        if(err) return res.json({success: false, err});
        res.send("OK");
    });
};