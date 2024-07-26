const express = require("express");
const router = express.Router();
const Tc = require("./TeamCoach/teamCoachController");
const Tm=require("./TeamCoach/TeamMembers/teamMembersController");
const Enquiry =require("./Enquiry/enquiryController");
const Admin=require("./Admin/adminController")
const viewers=require("./Viewers/viewerController")
const Organizer=require("./Organizer/OrganizerController")
const OrgEvents=require("./Events/eventController")
const EventEnrollments=require("./EventEnrollments/enrollmentController")
const reviews=require("./Reviews/reviewController")
const OrganizerBlog=require("./Organizer/OrganizerBlog/OrganizerBlogController")
const complaints=require('./complaints/complaintController')
const ticketController=require('./Tickets/ticketController')


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

//team members
router.post('/addTeamMembers/:id',Tm.registerTeamMember)
router.post('/ViewAllTeamMembers',Tm.viewTeamMembers)
// router.post('/editTeamMembersById/:id',Tm.editTeamMembersById)
router.post('/deleteTeamMemberById/:id',Tm.deleteTeamMemberById)
router.post('/viewTeamMemberByCoachId/:id',Tm.viewTeamMemberByCoachId)
router.post('/viewTeamMemberById/:id',Tm.viewTeamMemberById)



//Enquiry routes
router.post('/addEnquiry',Enquiry.addEnquiry);
// router.post('/viewEnquiryById/:id',Enquiry.viewEnquiryById);
router.post('/viewallEnquiries',Enquiry.viewEnquiries);
router.post('/deleteEnquiryById',Enquiry.deleteEnquiryById);

router.post('/registerOrganizer',Organizer.upload,Organizer.registerOrganizer);
router.post('/viewOrganizerReqsForAdmin',Organizer.viewOrganizerReqsForAdmin);
router.post('/loginOrganizer',Organizer.login);
router.post('/viewOrganizerById/:id',Organizer.viewOrganizerById);
router.post('/editOrganizerById/:id',Organizer.uploadSingle,Organizer.editOrganizerById);
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

//events
router.post('/addEvent',OrgEvents.upload,OrgEvents.registerEvent);
router.post('/viewEventByOrganizerId/:id',OrgEvents.viewEventByOrganizerId);
router.post('/viewEvents',OrgEvents.viewEvents);
router.post('/rejectEventById/:id',OrgEvents.rejectEventById);
router.post('/approveEventById/:id',OrgEvents.approveEventById);
router.post('/viewEventById/:id',OrgEvents.viewEventById);
router.post('/viewApprovedEventsByOrgId/:id',OrgEvents.viewApprovedEventsByOrgId);

router.post('/viewApprovedEvents',OrgEvents.viewApprovedEvents);
router.post('/addRating/:id',OrgEvents.addRating);
router.post('/addReview',reviews.addReview);
router.post('/viewAllreviewsByeventId/:id',reviews.viewAllreviewsByeventId);
router.post('/viewAllreviews',reviews.viewAllreviews);


//team members
router.post('/registerTeamMember/:id',Tm.upload,Tm.registerTeamMember)
router.post('/viewTeamMemberByCoachId/:id',Tm.viewTeamMemberByCoachId)
router.post('/viewTeamMemberById/:id',Tm.viewTeamMemberById)
router.post('/editTeamMemberById/:id',Tm.editTeamMembersById)
router.post('/deleteTeamMemberById/:id',Tm.deleteTeamMemberById)


//enrollments
router.post('/registerEnrollment/:id',EventEnrollments.registerEnrollment);
router.post('/viewEnrollmentById/:id',EventEnrollments.viewEnrollmentById);
router.post('/viewEnrollments/:id',EventEnrollments.viewEnrollments);
router.post('/deleteEnrollmentById/:id',EventEnrollments.deleteEnrollmentById);
router.post('/approveEnrollmentById/:id',EventEnrollments.approveEnrollmentById);
router.post('/rejectEnrollmentById/:id',EventEnrollments.rejectEnrollmentById);
router.post('/viewEnrollmentsByOrganizerId/:id',EventEnrollments.viewPendingEnrollmentsByOrganizerId);
router.post('/viewApprovedEnrollmentsByTcId/:id',EventEnrollments.viewApprovedEnrollmentsByTcId);
router.post('/viewPAprvdEnrollmentsByOrganizerId/:id',EventEnrollments.viewPAprvdEnrollmentsByOrganizerId);

router.post('/addScoreByEnrollmentById/:id',EventEnrollments.addScoreByEnrollmentById);
router.post('/updatePositions/:id',EventEnrollments.updatePositions);



//OrganiserBlog
router.post('/registerOrganizerBlog',OrganizerBlog.uploads,OrganizerBlog.registerOrganizerBlog);
router.post('/viewOrganizerBlogById/:id',OrganizerBlog.viewOrganizerBlogById);
router.post('/viewOrganizerBlogs/:id',OrganizerBlog.viewOrganizerBlogs);




//complaints
router.post('/addComplaint',complaints.addcomplaint)
router.post('/viewAllComplaints',complaints.viewAllcomplaints)
router.post('/viewComplaintById/:id',complaints.viewcomplaintById)
router.post('/deleteComplaintById/:id',complaints.deletecomplaintById)



//tickets


router.post('/registerTicket', ticketController.registerTicket);
router.post('/viewTickets', ticketController.viewTickets);
router.post('/viewTicketById/:id', ticketController.viewTicketById);
router.post('/viewTicketsByEventId/:eventId', ticketController.viewTicketsByEventId);
router.post('/viewTicketsByOrganizerId/:organizerId', ticketController.viewTicketsByOrganizerId);
router.post('/deleteTicketById/:id', ticketController.deleteTicketById);
router.post('/viewApprovedEventsByOrgIdWithoutTickets/:id', ticketController.viewApprovedEventsByOrgIdWithoutTickets);



module.exports=router




