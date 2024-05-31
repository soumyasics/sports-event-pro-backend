const Admin  = require('./adminSchema');
const secret = 'Admin'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");


const adminpassword = async (req, res) => {
    

            const Admin1 = await Admin.findOne({ email:'admin@gmail.com' });
            if (!Admin1) {
             
            const admin= new Admin({
                email:'admin@gmail.com',
                password:req.body.password})

            await admin.save()
            .then(data => {
                return res.json({
                    status: 200,
                    msg: "password changed successfully",
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

        }
        else{
            Admin.updateOne({
                email:'admin@gmail.com',
                password:req.body.password
            }).exec().then(data=>{
                console.log("updated");
            }).catch(err=>{
                console.log("nt",err);
            })
        }
    }


    module.exports = {
        adminpassword,
    };
    