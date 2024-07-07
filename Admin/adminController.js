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
                return res.json({
                    status: 200,
                    msg: "password changed successfully",
                    data: data
                });
            }).catch(err=>{
                return res.json({
                    status: 500,
                    msg: "Data not Inserted",
                    data: err
                });
                console.log("nt",err);
            })
        }
    }


    const login = (req, res) => {
        const { email, password } = req.body;
    
        Admin.findOne({ email }).then(user => {
    
    
            if (!user) {

                if(email=="admin@gmail.com")
                {
                    if(password=="admin@123")
                    {
                        res.json({
                            status: 200,
                           msg:"Login Succesful"
                            
                        });
                    }
                    else{
                        return res.json({ status: 405, msg: 'Password Mismatch !!' });

                    }
                }else{
                    return res.json({ status: 405, msg: 'Invalid Username' });

                }
                // return res.json({ status: 405, msg: 'Invalid Username' });
            }
    
           else if (user.password != password) {
                return res.json({ status: 405, msg: 'Password Mismatch !!' });
            }
    else{

   
          
    
            res.json({
                status: 200,
                data: user,
                
            });
        }
    
        }).catch(err => {
            console.log(err);
            return res.json({ status: 500, msg: 'Something went wrong' });
    
        })
    };
    module.exports = {
        adminpassword,
        login
    };
    