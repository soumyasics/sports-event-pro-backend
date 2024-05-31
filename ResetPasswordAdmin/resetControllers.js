const Reset = require('./resetSchema');
const secret = 'Enquiry'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");


const adminresetpassword = async (req, res) => {
    

            const Reset1 = await Reset.findOne({ email:'admin@gmail.com' });
            if (!Reset1) {
             
            const reset= new Reset({
                email:'admin@gmail.com',
                password:req.body.password})

            await reset.save()
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
            Reset.updateOne({
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
        adminresetpassword,
    };
    


