const viewers =require('./viewerSchema');
const secret = "viewers"
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


const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

const login = (req, res) => {
    const { email, password } = req.body;
console.log(email,password);
    viewers.findOne({ email }).then(user => {


        if (!user) {
            return res.json({ status: 405, msg: 'User not found' });
        }

        if (user.password != password) {
            return res.json({ status: 405, msg: 'Password Mismatch !!' });
        }
        if(user.adminApproved==false)
            {
                return res.json({ status:409,msg: 'Please wait for Admin Approval !!' });

            }
            if(!user.isActive)
                {
                    return res.json({ status:409,msg: 'Your Account is Currently Deactivated By Admin !!' });

                }

        const token = createToken(user);

        res.json({
            status: 200,
            data: user,
            token
        });

    }).catch(err => {
        console.log(err);
        return res.json({ status: 500, msg: 'Something went wrong' });

    })
};




// View all viewerss
const viewviewerss = (req, res) => {
    viewers.find({})
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

// Update viewers by ID
const editviewersById = async (req, res) => {
    let flag = 0
    const { name, gender, address, pincode, city, state, country, contact, email, password } = req.body;
    let existingviewers = await viewers.find({ contact });
    let viewersData = await viewers.findById({ _id: req.params.id });
    await existingviewers.map(x => {
        if (x.contact != viewersData.contact) {
            flag = 1
        }

    })

    if (flag == 0) {

        await viewers.findByIdAndUpdate({ _id: req.params.id }, {
           
                name,
                gender, 
                address, 
                pincode, 
                city, 
                state, 
               
                contact, 
                email, 
              
                      

        })
            .exec()
            .then(data => {
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            })
            .catch(err => {
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

// View viewers by ID
const viewviewersById = (req, res) => {
    viewers.findById({ _id: req.params.id })
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

// Delete viewers by ID
const deleteviewersById = (req, res) => {
    viewers.findByIdAndUpdate({ _id: req.params.id },{isActive:'inactive'})
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


// Accept viewers by ID
const activateviewersById = (req, res) => {
    viewers.findByIdAndUpdate({ _id: req.params.id },{isActive:true})
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

// Accept viewers by ID
const deActivateviewersById = (req, res) => {
    viewers.findByIdAndUpdate({ _id: req.params.id },{isActive:false})
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

// Forgot Password for viewers
const forgotPassword = (req, res) => {
    viewers.findOneAndUpdate({ email: req.body.email }, {
        password: req.body.password
    })
        .exec()
        .then(data => {
            if (data != null)
                res.json({
                    status: 200,
                    msg: "Updated successfully"
                });
            else
                res.json({
                    status: 500,
                    msg: "User Not Found"
                });
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
};

// Forgot Password for viewers
const resetPassword = async(req, res) => {
    let pwdMatch = false;
    console.log("daya",req.body.password);

    await viewers.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });
console.log("daya",req.body.password);

    if (pwdMatch) {
        await viewers.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.password
        })
            .exec()
            .then(data => {
                if (data != null)
                    res.json({
                        status: 200,
                        msg: "Updated successfully"
                    });
                else
                    res.json({
                        status: 500,
                        msg: "User Not Found"
                    });
            })
            .catch(err => {
                res.status(500).json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    } else {
        res.json({
            status: 405,
            msg: "Your Old Password doesn't match"
        });
    }
    
    
};
module.exports = {
    Viewerreg,
    login,
    viewviewersById,
    viewviewerss,
    editviewersById,
    deleteviewersById,
    forgotPassword,
    activateviewersById,
    deActivateviewersById,
    resetPassword

};