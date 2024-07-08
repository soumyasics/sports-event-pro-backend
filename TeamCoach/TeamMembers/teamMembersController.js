const TeamMembers = require('./teamMembersSchema');
const secret = 'TeamMembers'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");






const addTeamMembers = async (req, res) => {

    try {
        const {  
            name,
            contact,
            email,
            pincode,
            category,
            address,
            city,
            state,
             } = req.body;

        const newTeamMembers = new TeamMembers({

            name,
            contact,
            email,
            pincode,
            category,
            address,
            city,
            state,
            country:'India',
        });
console.log("req",req.files);
        let existingTeamMembers1 = await TeamMembers.findOne({ contact });
        if (existingTeamMembers1) {
            console.log("ex",existingTeamMembers1);
            return res.json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }
        let existingTeamMembers = await TeamMembers.findOne({ email });
        if (existingTeamMembers) {
            return res.json({
                status: 409,
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }
        await newTeamMembers.save()
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
    addTeamMembers,
};
