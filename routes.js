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
const tickeetbookings=require('./TicketBooking/bookingController');
const eventSchema = require("./Events/eventSchema");


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
router.post('/resetPasswordforTc/:id',Tc.resetPassword)

//team members
router.post('/addTeamMembers/:id',Tm.upload,Tm.registerTeamMember)
router.post('/ViewAllTeamMembers',Tm.viewTeamMembers)
router.post('/editTeamMembersById/:id',Tm.upload,Tm.editTeamMembersById)
router.post('/deleteTeamMemberById/:id',Tm.deleteTeamMemberById)
router.post('/viewTeamMemberByCoachId/:id',Tm.viewTeamMemberByCoachId)
router.post('/viewTeamMemberById/:id',Tm.viewTeamMemberById)
router.post('/checkData/:id',Tm.upload,Tm.checkData)
router.post('/addTeamMembertoEvent/:id',Tm.addTeamMembertoEvent)
router.post('/viewTeamMemberByCoachEventId/:cId/:eventId',Tm.viewTeamMemberByCoachEventId)


//Enquiry routes
router.post('/addEnquiry',Enquiry.addEnquiry);
// router.post('/viewEnquiryById/:id',Enquiry.viewEnquiryById);
router.post('/viewallEnquiries',Enquiry.viewEnquiries);
router.post('/deleteEnquiryById/:id',Enquiry.deleteEnquiryById);

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

router.post('/resetPasswordOrganizer/:id',Organizer.resetPassword);



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
router.post('/resetPassword/:id',viewers.resetPassword);

//events
router.post('/addEvent',OrgEvents.upload,OrgEvents.registerEvent);
router.post('/viewEventByOrganizerId/:id',OrgEvents.viewEventByOrganizerId);
router.post('/viewEvents',OrgEvents.viewEvents);
router.post('/rejectEventById/:id',OrgEvents.rejectEventById);
router.post('/approveEventById/:id',OrgEvents.approveEventById);
router.post('/viewEventById/:id',OrgEvents.viewEventById);
router.post('/viewApprovedEventsByOrgId/:id',OrgEvents.viewApprovedEventsByOrgId);
router.post('/viewPastEvents',OrgEvents.viewPastEvents);
router.post('/viewApprovedEventsByOrgIdforScoreBoard/:id',OrgEvents.viewApprovedEventsByOrgIdforScoreBoard);
router.post('/viewUpcomingEventsforTC/:id',OrgEvents.viewUpcomingEventsforTC);

router.post('/viewApprovedEvents',OrgEvents.viewApprovedEvents);
router.post('/viewUpcomingEvents',OrgEvents.viewUpcomingEvents);
router.post('/getEventSuggestionsForViewer/:id',OrgEvents.getEventSuggestionsForViewer);

router.post('/addRating/:id',OrgEvents.addRating);
router.post('/addReview',reviews.addReview);
router.post('/viewAllreviewsByeventId/:id',reviews.viewAllreviewsByeventId);
router.post('/viewAllreviews',reviews.viewAllreviews);





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
router.post('/viewApprovedEnrollmentsByEventId/:id',EventEnrollments.viewApprovedEnrollmentsByEventId);
router.post('/viewPAprvdEnrollments',EventEnrollments.viewPAprvdEnrollments);
router.post('/getEventsByOrg/:id',EventEnrollments.getEventsByOrg);
router.post('/viewPAprvdEnrollmentsForHome',OrgEvents.viewPAprvdEnrollmentsForHome);
router.post('/viewPAprvdEnrollmentsforTicket',EventEnrollments.viewPAprvdEnrollmentsforTicket);

router.post('/addScoreByEnrollmentById/:id',EventEnrollments.addScoreByEnrollmentById);
router.post('/updatePositions/:id',EventEnrollments.updatePositions);
router.post('/viewEnrollmentwithScore',EventEnrollments.viewEnrollmentwithScore);



//OrganiserBlog
router.post('/registerOrganizerBlog',OrganizerBlog.uploads,OrganizerBlog.registerOrganizerBlog);
router.post('/viewOrganizerBlogById/:id',OrganizerBlog.viewOrganizerBlogById);
router.post('/viewOrganizerBlogs/:id',OrganizerBlog.viewOrganizerBlogs);
router.post('/viewAllBlogs',OrganizerBlog.viewAllBlogs);
router.post('/updateOrganizerBlogById/:id',OrganizerBlog.uploads,OrganizerBlog.updateOrganizerBlogById);
router.post('/deleteOrganizerBlogById/:id',OrganizerBlog.deleteOrganizerBlogById);




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
router.post('/getValidTickets', ticketController.getValidTickets);

//ticket Booking

router.post('/createTicket', tickeetbookings.createTicket);
router.post('/viewTicketBookings', tickeetbookings.viewTickets);
router.post('/viewTicketBookingById/:id', tickeetbookings.viewTicketById);
router.post('/viewTicketBookingByEventId/:id', tickeetbookings.viewTicketByEventId);
router.post('/viewTicketBookingByViwerId/:id', tickeetbookings.viewTicketByViwerId);
router.post('/updatePayment/:id', tickeetbookings.updatePayment);
router.post('/viewTicketsByTicketId/:id', tickeetbookings.viewTicketsByTicketId);
router.post('/getTotalAmountAndSoldTicketsByTicketId/:id', tickeetbookings.getTotalAmountAndSoldTicketsByTicketId);


module.exports=router




