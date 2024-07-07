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
router.post('/editTeamCoachById/:id',Tc.uploadOne,Tc.editTeamCoachById)
router.post('/deleteTeamCoachById/:id',Tc.deleteTeamCoachById)
router.post('/viewTeamCoachReqsByAdmin',Tc.viewTeamCoachReqsByAdmin)
router.post('/approveTeamCoachById/:id',Tc.approveTeamCoachById)
router.post('/rejectTeamCoachById/:id',Tc.rejectTeamCoachById)
router.post('/activateTeamCoachById/:id',Tc.activateTeamCoachById)
router.post('/deActivateTeamCoachById/:id',Tc.deActivateTeamCoachById)
router.post('/forgotPassword',Tc.forgotPassword)


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
router.post('/forgotPasswordOrganizer',Organizer.forgotPassword);







//admin

router.post('/adminpassword',Admin.adminpassword);
router.post('/adminLogin',Admin.login);



//viewers
router.post('/Viewerreg',viewers.Viewerreg);
router.post('/viewerLogin',viewers.login);
router.post('/viewviewerss',viewers.viewviewerss);
router.post('/viewviewersById/:id',viewers.viewviewersById);
router.post('/deleteviewersById/:id',viewers.deleteviewersById);
router.post('/editviewersById/:id',viewers.editviewersById);
router.post('/activateviewersById/:id',viewers.activateviewersById);
router.post('/deActivateviewersById/:id',viewers.deActivateviewersById);
router.post('/forgotPasswordViewer',viewers.forgotPassword);



module.exports=router




