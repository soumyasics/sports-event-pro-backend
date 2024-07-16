const TeamMember = require('./teamMembersSchema'); // Adjust the path according to your project structure
const jwt = require('jsonwebtoken');
const multer = require("multer");

const secret = 'TeamMember'; // Replace this with your own secret key

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

const upload = multer({ storage: storage }).single('photo');

const registerTeamMember = async (req, res) => {
    try {
        const { name, contact, email, pincode,  category, address, city, state } = req.body;

        const newTeamMember = new TeamMember({
            coachId: req.params.id,
            name,
            contact,
            email,
            pincode,
            category,
            address,
            city,
            state,
            photo: req.file,
        });

        let existingTeamMember = await TeamMember.findOne({ email });
        if (existingTeamMember) {
            return res.json({
                status: 409,
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }

        await newTeamMember.save()
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

const viewTeamMembers = (req, res) => {
    TeamMember.find()
        .populate('coachId')
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

const editTeamMemberById = async (req, res) => {
    const { name, contact, email, pincode, country, category, address, city, state } = req.body;
    let existingTeamMember = await TeamMember.find({ contact });
    let TeamMemberData = await TeamMember.findById({ _id: req.params.id });

<<<<<<< HEAD
    if (existingTeamMember.length && existingTeamMember[0].contact !== TeamMemberData.contact) {
        return res.json({
            status: 409,
            msg: "Contact Number Already Registered With Us !!",
            data: null
        });
    }
=======
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
>>>>>>> 1df9fe7874d8be2b14f3d16a8fd35a99cae37e71

    await TeamMember.findByIdAndUpdate({ _id: req.params.id }, {
        coachId: req.body.coachId,
        name,
        contact,
        email,
        pincode,
        country,
        category,
        address,
        city,
        state,
        photo: req.file,
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
};

const viewTeamMemberById = (req, res) => {
    TeamMember.findById({ _id: req.params.id })
        .populate('coachId')
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

const viewTeamMemberByCoachId = (req, res) => {
    TeamMember.find({ coachId: req.params.id })
        
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

const deleteTeamMemberById = (req, res) => {
    TeamMember.findByIdAndDelete({ _id: req.params.id })
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data deleted successfully",
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

const createToken = (user) => {
    return jwt.sign({ userId: user._id }, secret, { expiresIn: '1h' });
};

const login = (req, res) => {
    const { email, password } = req.body;

    TeamMember.findOne({ email }).then(user => {
        if (!user) {
            return res.json({ status: 405, msg: 'User not found' });
        }

        if (user.password != password) {
            return res.json({ status: 405, msg: 'Password Mismatch !!' });
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

const requireAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.json({ status: 401, msg: 'Unauthorized' });
    }
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            return res.json({ status: 401, message: 'Unauthorized', err: err });
        }

        req.user = decodedToken.userId;
        next();
    });
};

module.exports = {
<<<<<<< HEAD
    registerTeamMember,
    viewTeamMembers,
    editTeamMemberById,
    viewTeamMemberById,
    deleteTeamMemberById,
 viewTeamMemberByCoachId,
    upload
=======
    addTeamMembers,
    ViewAllTeamMembers,
    // editTeamMembersById
>>>>>>> 1df9fe7874d8be2b14f3d16a8fd35a99cae37e71
};
