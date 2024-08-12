const TeamMember = require('./teamMembersSchema'); // Adjust the path according to your project structure
const jwt = require('jsonwebtoken');
const multer = require("multer");
const teamCoachSchema = require('../teamCoachSchema');
const teamPlayers = require('./teamPlayers');

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

       let coachData= await teamCoachSchema.findById(req.params.id)
       let teams= await TeamMember.find({coachId:req.params.id})
let teamCount=teams.length?teams.length:0
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
        console.log(teamCount);
        if (teamCount==coachData.totalteammembers) {
            return res.json({
                status: 409,
                msg: `You have Already Added ${teamCount} Members !!`,
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


const editTeamMembersById = async (req, res) => {
    console.log("data",req.body);
    
//     let flag = 0
    const { name, contact, email, state,city,address ,pincode,category} = req.body;
//     console.log("file",req.file,req.params.id,req.body);
    
//     let existingTeamMembers = await TeamMember.find({ contact });
//     let TeamMembersData = await TeamMember.findById({ _id: req.params.id });
//     await existingTeamMembers.map(x => {
//         if (x.contact != TeamMembersData.contact) {
//             flag = 1
//         }

//     })
// console.log(flag);

//     if (flag == 0) {

        await TeamMember.findByIdAndUpdate({ _id: req.params.id }, {
            name,
            state,
            contact,
            address,
            pincode,
            city,
            email,
            category,
            pincode,
            photo:req.file
          

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
    // }
    // else {
    //     console.log("here");
        
    //     return res.json({
    //         status: 409,
    //         msg: "contact Number Already Registered With Us !!",
    //         data: null
    //     });
    // }


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

const viewTeamMemberByCoachId =async (req, res) => {
    let coaches=await teamCoachSchema.findById(req.params.id )
    TeamMember.find({ coachId: req.params.id }).populate('coachId')
        
        .exec()
        .then(data => {
            res.json({
                status: 200,
                msg: "Data obtained successfully",
                data: data,
                coach:coaches
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
const checkData=async(req,res)=>{
    console.log("data",req.file);
    console.log("data",req.body);
    let flag=0
    const { name, contact, email, state,city,address ,pincode,category} = req.body;
    let existingTeamMembers = await TeamMember.find({ contact });
        let TeamMembersData = await TeamMember.findById({ _id: req.params.id });
        await existingTeamMembers.map(x => {
            if (x.contact != TeamMembersData.contact) {
                flag = 1
            }
    
        })
    console.log(flag);
    
        if (flag == 0) {
    
    await TeamMember.findByIdAndUpdate({ _id: req.params.id }, {
        name,
        state,
        contact,
        address,
        pincode,
        city,
        email,
        category,
        pincode,
        photo:req.file
      

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
        console.log("here");
        
        return res.json({
            status: 409,
            msg: "contact Number Already Registered With Us !!",
            data: null
        });
    }
}

const addTeamMembertoEvent = async (req, res) => {
    try {
let count=0
   
        const { eventId, coachId } = req.body;

        let coachData= await teamCoachSchema.findById(coachId)
        let teams= await teamPlayers.find({eventId:eventId})
 let teamCount=teams.length?teams.length:0
 let category=coachData.category

 switch(category){
case 'cricket':count=11
                break
case 'football':count=12
                break
  case 'tennis':count=4
                break
  case 'badminton':count=4
                break
   case 'badminton':count=11
                break
 }

        const newTeamMember = new teamPlayers({
            eventId,
            coachId,
            memberId:req.params.id,
           
        });

        let existingTeamMember = await teamPlayers.findOne({ eventId:eventId,memberId:req.params.id });
        if (existingTeamMember) {
            return res.json({
                status: 409,
                msg: "The member Has Been Already Added !!",
                data: null
            });
        }
        console.log(teamCount);
        if (teamCount==count) {
            return res.json({
                status: 409,
                msg: `You have Already Added ${count} Members !!`,
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
        console.log(error);
        
        res.status(500).json({ message: error.message });
    }
};

const viewTeamMemberByCoachEventId = (req, res) => {
    console.log("data");
    
    teamPlayers.find({ coachId: req.params.cId,eventId:req.params.eventId })
        .populate('memberId')
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


module.exports = {
    registerTeamMember,
    // ViewAllTeamMembers,
    editTeamMembersById,
    viewTeamMemberByCoachId,
    viewTeamMemberById,
    viewTeamMembers,
    deleteTeamMemberById,
    upload,
    checkData,
    addTeamMembertoEvent,
    viewTeamMemberByCoachEventId
};
