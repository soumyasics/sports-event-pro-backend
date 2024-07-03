const Enquiry = require('./enquirySchema');
const secret = 'Enquiry'; 
const jwt = require('jsonwebtoken')
const multer = require("multer");


const addEnquiry = async (req, res) => {
    try {
        const {name , email, contactnumber,  message , enquiriestype} = req.body;

        const newEnquiry = new Enquiry({
            name,
            email,
            contactnumber,
             message,
             enquiriestype

        });

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


//View Enquiry by ID
const viewEnquiryById = (req, res) => {
    Enquiry.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};

// View all Enquiries
const viewallEnquiries = (req, res) => {
    Enquiry.find()
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 200,
                    msg: "No Data obtained"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Delete Enquiry by ID
const deleteEnquiryById = (req, res) => {
    Enquiry.deleteOne({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data updated successfully",
                data: data
            });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};






module.exports = {
    addEnquiry,
    viewEnquiryById,
    viewallEnquiries,
    deleteEnquiryById,
};





