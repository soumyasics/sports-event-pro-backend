const Enquiry = require('./enquirySchema');
const secret = 'Enquiry'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");


const addEnquiry = async (req, res) => {
    try {
        const {name , email, contactnumber, description } = req.body;

        const newEnquiry = new Enquiry({
            name,
            email,
            contactnumber,
            description,

        });

        let existingEnquiry1 = await Enquiry.findOne({ contactnumber });
        if (existingEnquiry1) {
            return res.json({
                status: 409,
                msg: "contactnumber is Already Registered With Us !!",
                data: null
            });
        }
        let existingEnquiry = await Enquiry.findOne({ email });
        if (existingEnquiry) {
            return res.json({
                status: 409,
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }
        await newEnquiry.save()
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


// View Enquiry by ID
// const viewEnquiryById = (req, res) => {
//     Enquiry.findById({ _id: req.params.id })
//         .exec()
//         .then(data => {
//             res.json({
//                 status: 200,
//                 msg: "Data obtained successfully",
//                 data: data
//             });
//         })
//         .catch(err => {
//             res.status(500).json({
//                 status: 500,
//                 msg: "No Data obtained",
//                 Error: err
//             });
//         });
// };








module.exports = {
    addEnquiry,
    // viewEnquiryById
};





