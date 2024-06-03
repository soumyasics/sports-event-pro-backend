const Organizer = require('./OrganizerSchema');
const secret = 'Organizer'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        const uniquePrefix = 'prefix-';
        const originalname = file.originalname;
        const extension = originalname.split('.').pop();
        const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
        cb(null, filename);
    },
});
const upload = multer({ storage: storage }).array("files", 2);

const registerOrganizer = async (req, res) => {
    try {
        const { name, address, pincode, city, state, country, contact, email, experience, password } = req.body;

        const newOrganizer = new Organizer({
            name,
            address,
            pincode,
            city,
            state,
            country,
            contact,
            email,
            experience,
            password,
            organizerlicense: req.files[1],
            photo: req.files[0]
            

        });

        let existingOrganizer1 = await Organizer.findOne({ contact });
        if (existingOrganizer1) {
            return res.json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }
        let existingOrganizer = await Organizer.findOne({ email });
        if (existingOrganizer) {
            return res.json({
                status: 409,
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }
        await newOrganizer.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch(err => {
                console.log(err);
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// View all Organizers
// const viewOrganizers = (req, res) => {
//     Organizer.find({ isActive: 'active' })
//         .exec()
//         .then(data => {
//             if (data.length > 0) {
//                 res.json({
//                     status: 200,
//                     msg: "Data obtained successfully",
//                     data: data
//                 });
//             } else {
//                 res.json({
//                     status: 200,
//                     msg: "No Data obtained"
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 status: 500,
//                 msg: "Data not obtained",
//                 Error: err
//             });
//         });
// };

module.exports = {
    registerOrganizer,
    upload
};
