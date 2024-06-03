const viewers=require('./viewerSchema');
const secret=viewers
const jwt = require('jsonwebtoken')
const multer = require("multer");

const addViewer=async(req,res)=>{
    try{
        try {
            const {name , gender, address, pincode , } = req.body;
    
            const newEnquiry = new Enquiry({
                
    
            });
    }
}