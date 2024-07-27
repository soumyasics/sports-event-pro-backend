const eventSchema = require('../Events/eventSchema');
const teamMembersSchema = require('../TeamCoach/TeamMembers/teamMembersSchema');
const EventEnrollment = require('./enrollmentSchema');
const jwt = require('jsonwebtoken');

const secret = 'eventsSecretKey'; // Replace this with your own secret key

// Register a new event enrollment
const registerEnrollment = async (req, res) => {
  try {
    const { coachId } = req.body;
    const eventId=req.params.id
const exEnroll=await EventEnrollment.findOne({coachId,eventId})
const hasTeam=await teamMembersSchema.findOne({coachId})
if(!hasTeam){
  return res.json({
      status:400,
      msg:"Please add your Team menbers and Enroll  !!"
  })
}
if(exEnroll){
    return res.json({
        status:400,
        msg:"You have Already Enrolled for This Event !!"
    })
}

const eventData=await eventSchema.findById({_id:eventId})
    const newEnrollment = new EventEnrollment({
      coachId,
      eventId,
      organizerId:eventData.organizerId,
      date:new Date()
    });

    await newEnrollment.save()
      .then(data => {
        return res.json({
          status: 200,
          msg: 'Inserted successfully',
          data: data,
        });
      })
      .catch(err => {
        console.log(err);
        return res.json({
          status: 500,
          msg: 'Data not inserted',
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all event enrollments
const viewEnrollments = (req, res) => {
  console.log(req.params.id);
  EventEnrollment.find({eventId:req.params.id}).populate('coachId eventId organizerId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No data obtained',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    });
};


// View event enrollment by ID
const viewEnrollmentById = (req, res) => {
  EventEnrollment.findById({ _id: req.params.id }).populate('eventId')
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};

// View event enrollments by Organizer ID
const viewPendingEnrollmentsByOrganizerId = (req, res) => {
  EventEnrollment.find({ organizerId: req.params.id,approvalStatus:'pending' }).populate('eventId coachId')
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};
const viewPAprvdEnrollmentsByOrganizerId = (req, res) => {
  EventEnrollment.find({ organizerId: req.params.id,approvalStatus:'approved' }).populate('eventId coachId')
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};
// Delete event enrollment by ID
const deleteEnrollmentById = (req, res) => {
  EventEnrollment.findByIdAndDelete({ _id: req.params.id })
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Deleted successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not deleted',
        Error: err,
      });
    });
};

// Approve event enrollment by ID
const approveEnrollmentById = (req, res) => {
  EventEnrollment.findByIdAndUpdate({ _id: req.params.id }, { approvalStatus: 'approved' })
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Updated successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not updated',
        Error: err,
      });
    });
};

// Reject event enrollment by ID
const rejectEnrollmentById = (req, res) => {
  EventEnrollment.findByIdAndUpdate({ _id: req.params.id }, { approvalStatus: 'rejected' })
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Updated successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Data not updated',
        Error: err,
      });
    });
};

const viewApprovedEnrollmentsByTcId = (req, res) => {
  EventEnrollment.find({ coachId: req.params.id ,approvalStatus:'approved'})
  .populate('eventId organizerId')
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};

const viewApprovedEnrollmentsByEventId = (req, res) => {
  EventEnrollment.find({ eventId: req.params.id ,approvalStatus:'approved'})
  .populate('coachId organizerId')
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};

//scoreboard

// View event enrollment by ID
const addScoreByEnrollmentById = (req, res) => {
  EventEnrollment.findByIdAndUpdate({ _id: req.params.id },{score:req.body.score})
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });
};




const updatePositions = async (req,res) => {
  try {
    let eventId=req.params.id
    console.log(eventId);
      const scoreboards = await EventEnrollment.find({ eventId }).sort({ score: -1 });
console.log("in".scoreboards);
      for (let i = 0; i < scoreboards.length; i++) {
          let position;
          switch (i) {
              case 0:
                  position = "First Place";
                  break;
              case 1:
                  position = "Second Place";
                  break;
              case 2:
                  position = "Third Place";
                  break;
              default:
                  position = `${i + 1}th Place`;
          }
          scoreboards[i].position = position;
          await scoreboards[i].save();
      }

     return res.json({
      status:200,
      msg:"Updated Successfully"
     })
  } catch (err) {
    return res.json({
      status:500,
      msg:"Internal server Error"
     })  }
};



module.exports = {
  registerEnrollment,
  viewEnrollments,
  
  viewEnrollmentById,
  deleteEnrollmentById,

  viewPendingEnrollmentsByOrganizerId,
  approveEnrollmentById,
  rejectEnrollmentById,
  viewApprovedEnrollmentsByTcId,
viewPAprvdEnrollmentsByOrganizerId,
viewApprovedEnrollmentsByEventId,

  addScoreByEnrollmentById,
  updatePositions
};
