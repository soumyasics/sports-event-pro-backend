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


// View all TeamMembers
const ViewAllTeamMembers = (req, res) => {
TeamMembers.find({adminApproved:true})
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


// Update TeamMembers by ID
const editTeamMembersById = async (req, res) => {
    console.log(req.file);
    let flag = 0
    const { name, contact, email, state,city,address ,pincode,category} = req.body;
    let existingTeamMembers = await TeamMembers.find({ contact });
    let TeamMembersData = await TeamMembers.findById({ _id: req.params.id });
    await existingTeamMembers.map(x => {
        if (x.contact != TeamMembersData.contact) {
            flag = 1
        }

    })

    if (flag == 0) {

        await TeamMembers.findByIdAndUpdate({ _id: req.params.id }, {
            name,
            state,
            contact,
            address,
            pincode,
            city,
            profilePic:req.file,
            email,
            category,
            pincode
          

        })
            .exec()
            .then(data => {
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    }
    else {
        return res.json({
            status: 409,
            msg: "contact Number Already Registered With Us !!",
            data: null
        });
    }
};



module.exports = {
    addTeamMembers,
    ViewAllTeamMembers,
    editTeamMembersById
};
