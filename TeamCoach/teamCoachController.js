const TeamCoach = require('./teamCoachSchema');
const secret = 'TeamCoach'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");


// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "./upload");
//   },
//   filename: function (req, file, cb) {
//     const uniquePrefix = 'prefix-'; 
//     const originalname = file.originalname;
//     const extension = originalname.split('.').pop();
//     const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
//     cb(null, filename);
//   },
// });
// const upload = multer({ storage: storage }).array("files");



const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      const uniquePrefix = 'prefix-'; // Add your desired prefix here
      const originalname = file.originalname;
      const extension = originalname.split('.').pop();
      const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
      cb(null, filename);
    },
  });
  const uploadOne = multer({ storage: storage }).single('profilePic');

  const upload = multer({ storage: storage }).array("files",2);
const registerTeamCoach = async (req, res) => {

    try {
        const {  name,
            state,
            contact,
            address,
            pincode,
            city,
            
            email,
            experience,
            category,
            totalteammembers,
            password,
           
            teamName,
            pincode } = req.body;

        const newTeamCoach = new TeamCoach({
            name,
            state,
            contact,
            address,
            pincode,
            city,
            country:'India',
            email,
            experience,
            category,
            totalteammembers,
            password,
            pincode,
            teamName,
            certificate: req.files[1],
            profilePic: req.files[0]

        });
console.log("req",req.files);
        let existingTeamCoach1 = await TeamCoach.findOne({ contact });
        if (existingTeamCoach1) {
            console.log("ex",existingTeamCoach1);
            return res.json({
                status: 409,
                msg: "Contact Number Already Registered With Us !!",
                data: null
            });
        }
        let existingTeamCoach = await TeamCoach.findOne({ email });
        if (existingTeamCoach) {
            return res.json({
                status: 409,
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }
        await newTeamCoach.save()
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


// View all TeamCoachs
const viewTeamCoachs = (req, res) => {
    TeamCoach.find({adminApproved:true})
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

// Update TeamCoach by ID
const editTeamCoachById = async (req, res) => {
    console.log(req.file);
    let flag = 0
    const { name, contact, email, password, state, experience,city,totalteammembers, teamName,address ,pincode,category} = req.body;
    let existingTeamCoach = await TeamCoach.find({ contact });
    let TeamCoachData = await TeamCoach.findById({ _id: req.params.id });
    await existingTeamCoach.map(x => {
        if (x.contact != TeamCoachData.contact) {
            flag = 1
        }

    })

    if (flag == 0) {

        await TeamCoach.findByIdAndUpdate({ _id: req.params.id }, {
            name,
            state,
            contact,
            address,
            pincode,
            city,
            profilePic:req.file,
            email,
            experience,
            category,
            totalteammembers,
            password,
            teamName,
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

// View TeamCoach by ID
const viewTeamCoachById = (req, res) => {
    TeamCoach.findById({ _id: req.params.id })
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
// View TeamCoaches for approval
const viewTeamCoachReqsByAdmin = (req, res) => {
    TeamCoach.find({adminApproved: false })
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
// Delete TeamCoach by ID
const deleteTeamCoachById = (req, res) => {
    TeamCoach.findByIdAndUpdate({ _id: req.params.id },{isActive:'inactive'})
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


// Accept TeamCoach by ID
const approveTeamCoachById = (req, res) => {
    TeamCoach.findByIdAndUpdate({ _id: req.params.id },{isActive:true,adminApproved:true})
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

// Accept TeamCoach by ID
const activateTeamCoachById = (req, res) => {
    TeamCoach.findByIdAndUpdate({ _id: req.params.id },{isActive:true})
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

// Accept TeamCoach by ID
const deActivateTeamCoachById = (req, res) => {
    TeamCoach.findByIdAndUpdate({ _id: req.params.id },{isActive:false})
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
// Reject TeamCoach by ID
const rejectTeamCoachById = (req, res) => {
    TeamCoach.findByIdAndDelete({ _id: req.params.id })
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
// Forgot Password for TeamCoach
const forgotPassword = (req, res) => {
    TeamCoach.findOneAndUpdate({ email: req.body.email }, {
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

// Reset Password for TeamCoach
const resetPassword = async (req, res) => {
    let pwdMatch = false;

    await TeamCoach.findById({ _id: req.params.id })
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

    if (pwdMatch) {
        await TeamCoach.findByIdAndUpdate({ _id: req.params.id }, {
            password: req.body.newpassword
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

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

const login = (req, res) => {
    const { email, password } = req.body;

    TeamCoach.findOne({ email }).then(user => {


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

//Login Custome --finished

module.exports = {
    registerTeamCoach,
    viewTeamCoachs,
    editTeamCoachById,
    viewTeamCoachById,
    deleteTeamCoachById,
    forgotPassword,
    resetPassword,
    login,
    uploadOne,
    requireAuth,
    upload,
    viewTeamCoachReqsByAdmin,
    approveTeamCoachById,
    rejectTeamCoachById,
    deActivateTeamCoachById,
    activateTeamCoachById
};
