const viewers =require('./viewerSchema');
const secret = viewers
const jwt = require('jsonwebtoken')
const multer = require("multer");


const Viewerreg = async (req, res) => {
    try {
        const { name, gender, address, pincode, city, state, country, contact, email, password } = req.body;

        const newviewers = new viewers({
            name,
            gender, 
            address, 
            pincode, 
            city, 
            state, 
            country, 
            contact, 
            email, 
            password
        });

        let existingViewers1 = await viewers.findOne({ contact });
        if (existingViewers1) {
            return res.json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }
        let existingViewers = await viewers.findOne({ email });
        if (existingViewers) {
            return res.json({
                status: 409,
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }
        await newviewers.save()
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


module.exports = {
    Viewerreg,
};