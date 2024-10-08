const OrganizerBlog = require('./OrganizerBlogSchema');
const secret = 'OrganizerBlog'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");



const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    // filename: function (req, file, cb) {
    //   const uniquePrefix = 'prefix-'; // Add your desired prefix here
    //   const originalname = file.originalname;
    //   const extension = originalname.split('.').pop();
    //   const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    //   cb(null, filename);
    // },
  });
  const uploads = multer({ storage: storage }).single('image');

//   const upload = multer({ storage: storage }).array("files",1);








const registerOrganizerBlog = async (req, res) => {

    try {
        const { 
            title,
            description,
            organizerId,

         } = req.body;

         console.log("body",req.body);
         
        const newOrganizerBlog = new OrganizerBlog({

            title,
            description,
            organizerId,
            image: req.file,
           
        });
console.log("req",req.file);
        await newOrganizerBlog.save()
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


// View all OrganizerBlogs
const viewOrganizerBlogs = (req, res) => {
    console.log("hhere");
    
    OrganizerBlog.find({organizerId:req.params.id}).populate('organizerId')
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
            console.log(err);
            
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};
// View OrganizerBlog by ID
const viewOrganizerBlogById = (req, res) => {
    OrganizerBlog.findById({ _id: req.params.id })
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



// update OrganizerBlog by ID
const updateOrganizerBlogById = (req, res) => {
    const { 
        title,
        description,
       

     } = req.body;
    OrganizerBlog.findByIdAndUpdate({ _id: req.params.id },
        {
            title,
            description,
            image: req.file, 
        }
    )
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

// View OrganizerBlog by ID
const deleteOrganizerBlogById = (req, res) => {
    OrganizerBlog.findByIdAndDelete({ _id: req.params.id })
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



// View all OrganizerBlogs
const viewAllBlogs = (req, res) => {
    OrganizerBlog.find({}).populate('organizerId')
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
module.exports = {
    registerOrganizerBlog,
    viewOrganizerBlogs,
    viewOrganizerBlogById,
    viewAllBlogs,
    uploads,
    deleteOrganizerBlogById,
    updateOrganizerBlogById
};

