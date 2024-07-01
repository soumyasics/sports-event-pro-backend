const express = require("express");
const router = express.Router();
const Tc = require("./TeamCoach/teamCoachController");
const Enquiry =require("./Enquiry/enquiryController");
const Admin=require("./Admin/adminController")
const viewers=require("./Viewers/viewerController")
const Organizer=require("./Organizer/OrganizerController")
//team coach routes
router.post('/registerTeamCoach',Tc.upload,Tc.registerTeamCoach)
router.post('/loginTeamCoach',Tc.login)
router.post('/viewTeamCoachById/:id',Tc.viewTeamCoachById)
router.post('/viewTeamCoachs',Tc.viewTeamCoachs)
router.post('/editTeamCoachById/:id',Tc.editTeamCoachById)
router.post('/deleteTeamCoachById/:id',Tc.deleteTeamCoachById)
router.post('/viewTeamCoachReqsByAdmin',Tc.viewTeamCoachReqsByAdmin)
router.post('/approveTeamCoachById/:id',Tc.approveTeamCoachById)
router.post('/rejectTeamCoachById/:id',Tc.rejectTeamCoachById)
router.post('/activateTeamCoachById/:id',Tc.activateTeamCoachById)
router.post('/deActivateTeamCoachById/:id',Tc.deActivateTeamCoachById)


//Enquiry routes
router.post('/addEnquiry',Enquiry.addEnquiry);

  

// router.post('/viewEnquiryById',Enquiry.viewEnquiryById);
router.post('/registerOrganizer',Organizer.upload,Organizer.registerOrganizer);
router.post('/viewOrganizerReqsForAdmin',Organizer.viewOrganizerReqsForAdmin);
router.post('/loginOrganizer',Organizer.login);
router.post('/viewOrganizerById/:id',Organizer.viewOrganizerById);
router.post('/editOrganizerById/:id',Organizer.upload,Organizer.editOrganizerById);
router.post('/deleteOrganizerById/:id',Organizer.deleteOrganizerById);
router.post('/approveOrganizerById/:id',Organizer.approveOrganizerById);
router.post('/activateOrganizerById/:id',Organizer.activateOrganizerById);
router.post('/deActivateOrganizerById/:id',Organizer.deActivateOrganizerById);
router.post('/viewOrganizers',Organizer.viewOrganizers);






//admin

router.post('/adminpassword',Admin.adminpassword);
router.post('/Viewerreg',viewers.Viewerreg);



module.exports=router




