const Organizer = require('./OrganizerSchema');
const secret = 'Organizer'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");
const { adminpassword } = require('../Admin/adminController');


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
const uploadSingle = multer({ storage: storage }).single('photo');

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



const viewOrganizerReqsForAdmin = (req, res) => {
    Organizer.find({ adminApproved:false })
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

// Update Organizer by ID
const editOrganizerById = async (req, res) => {
    let flag = 0
    const { name, address, pincode, city, state, country, contact, email, experience, password } = req.body;
    let existingOrganizer = await Organizer.find({ contact });
    let OrganizerData = await Organizer.findById({ _id: req.params.id });
    await existingOrganizer.map(x => {
        if (x.contact != OrganizerData.contact) {
            flag = 1
        }

    })

    if (flag == 0) {

        await Organizer.findByIdAndUpdate({ _id: req.params.id }, {
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
            photo: req.file
            
          

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

// View Organizer by ID
const viewOrganizerById = (req, res) => {
    Organizer.findById({ _id: req.params.id })
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

// View Organizer by ID
const viewOrganizers = (req, res) => {
    Organizer.find({adminApproved:true})
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
// View Organizeres for approval
const viewOrganizerReqsByAdmin = (req, res) => {
    Organizer.find({adminApproved: false })
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
// Delete Organizer by ID
const deleteOrganizerById = (req, res) => {
    Organizer.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data updated successfully",
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                status: 500,
                msg: "No Data obtained",
                Error: err
            });
        });
};


// Accept Organizer by ID
const approveOrganizerById = (req, res) => {
    Organizer.findByIdAndUpdate({ _id: req.params.id },{isActive:true,adminApproved:true})
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

// Accept Organizer by ID
const activateOrganizerById = (req, res) => {
    Organizer.findByIdAndUpdate({ _id: req.params.id },{isActive:true})
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

// Accept Organizer by ID
const deActivateOrganizerById = (req, res) => {
    Organizer.findByIdAndUpdate({ _id: req.params.id },{isActive:false})
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
// Reject Organizer by ID
const rejectOrganizerById = (req, res) => {
    Organizer.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data removed successfully",
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
// Forgot Password for Organizer
const forgotPassword = (req, res) => {
    console.log(req.body);
    Organizer.findOneAndUpdate({ email: req.body.email }, {
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

// Reset Password for Organizer
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await Organizer.findById({ _id: req.params.id })
        .exec()
        .then(data => {
            if (data.password === req.body.oldpassword)
                pwdMatch = true;
        })
        .catch(err => {
            return  res.status(500).json({
                status: 500,
                msg: "Data not Updated",
                Error: err
            });
        });

    if (pwdMatch) {
        await Organizer.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.password
        })
            .exec()
            .then(data => {
                if (data != null)
                    return  res.json({
                        status: 200,
                        msg: "Updated successfully"
                    });
                else
                return  res.json({
                        status: 500,
                        msg: "User Not Found"
                    });
            })
            .catch(err => {
                return  res.status(500).json({
                    status: 500,
                    msg: "Data not Updated",
                    Error: err
                });
            });
    } else {
       return res.json({
            status: 405,
            msg: "Your Old Password doesn't match"
        });
    }
};

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

const login = (req, res) => {
    const { email, password } = req.body;

    Organizer.findOne({ email }).then(user => {


        if (!user) {
            return res.json({ status: 405, msg: 'User not found' });
        }

        if (user.password != password) {
            return res.json({ status: 405, msg: 'Password Mismatch !!' });
        }

        if (!user.adminApproved) {
            return res.json({ status: 405, msg: 'Please wait for Admin Approval !!' });
        }        if (!user.isActive) {
            return res.json({ status: 405, msg: 'You are currently deactivated By Admin !!' });
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

//validate

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    console.log("t1", token);
    console.log("secret", secret);
    if (!token) {
        return res.json({ status: 401, msg: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decodedToken) => {
        console.log(decodedToken);
        if (err) {
            return res.json({ status: 401, messagge: 'Unauthorized', err: err });
        }

        req.user = decodedToken.userId;
        next();
        return res.json({ status: 200, msg: 'ok', user: decodedToken.userId });
    });
    console.log(req.user);
};


module.exports = {
    registerOrganizer,
    upload,
    viewOrganizerReqsForAdmin,
    login,
    requireAuth,
    viewOrganizerById,
    editOrganizerById,
    deleteOrganizerById,
    activateOrganizerById,
    deActivateOrganizerById,
    approveOrganizerById,
    rejectOrganizerById,
    viewOrganizerReqsByAdmin,
    viewOrganizers,
    forgotPassword,
    uploadSingle,
    resetPassword
}
