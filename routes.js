const express = require("express");
const router = express.Router();
const Tc = require("./TeamCoach/teamCoachController");

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


module.exports=router