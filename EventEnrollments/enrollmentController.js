const eventSchema = require('../Events/eventSchema');
const teamCoachSchema = require('../TeamCoach/teamCoachSchema');
const teamMembersSchema = require('../TeamCoach/TeamMembers/teamMembersSchema');
const EventEnrollment = require('./enrollmentSchema');
const jwt = require('jsonwebtoken');

const secret = 'eventsSecretKey'; // Replace this with your own secret key

// Register a new event enrollment
const registerEnrollment = async (req, res) => {
  try {
    const { coachId } = req.body;
    const eventId=req.params.id
    console.log("req.params.id",req.params.id,"co",coachId);
    
const exEnroll=await EventEnrollment.findOne({coachId,eventId})
const hasTeam=await teamMembersSchema.findOne({coachId})
const eventData=await eventSchema.findById({_id:eventId})
const coachData=await teamCoachSchema.findById({_id:coachId})
console.log("dd",coachData.category," ",eventData.category);
if(exEnroll&&exEnroll.approvalStatus=='rejected'){
  return res.json({
      status:400,
      msg:"Your Reqquest Has Been Denied By Organizer !!"
  })
}
if((((eventData.category).toLowerCase()).trim())!=(((coachData.category).toLowerCase()).trim())){
  return res.json({
      status:400,
      msg:`Its a ${eventData.category} Event . You are not Allowed to Enroll for It !`
  })
}
if(!hasTeam){
  return res.json({
      status:400,
      msg:"Please add your Team members and Enroll  !!"
  })
}
if(exEnroll){
    return res.json({
        status:400,
        msg:"You have Already Enrolled for This Event !!"
    })
}

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

// View event enrollment by ID
const viewEnrollmentwithScore = (req, res) => {
  EventEnrollment.find({score:{$gt:0} }).populate('coachId eventId')
    .exec()
    .then(data => {
      if(data.length>0)
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: data[0],
      });
      else{
        res.json({
          status: 400,
          msg: 'Data obtained successfully',
          data:null,
        });
      }
    })
    .catch(err => {
      console.log(err);
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


const viewPAprvdEnrollments = (req, res) => {
  EventEnrollment.find({ approvalStatus:'approved' }).populate('eventId coachId')
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
const viewPAprvdEnrollmentsforTicket =async (req, res) => {
  const currentDate = new Date();
  let dat=[]
  await EventEnrollment.find({ approvalStatus:'approved'}).populate('eventId coachId')
    .exec()
    .then(data => {
      if(data&&data.length>0){
        data.map(x=>{
      if(x.eventId.date<currentDate){
        dat.push(x)
      }
        })
      }
      console.log(dat);
      
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: dat,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No data obtained',
        Error: err,
      });
    });


}
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
  console.log("in api");
  EventEnrollment.find({ coachId: req.params.id ,approvalStatus:'approved'})
  .populate('eventId organizerId')
    .exec()
    .then(data => {
      console.log(data);
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

const getEventsByOrg=async (req, res) => {
  try {
      const { id } = req.params;

      const events = await eventSchema.find({ organizerId: req.params.id });

      const eventIds = events.map(event => event._id);

      const enrollments = await EventEnrollment.aggregate([
          { $match: { eventId: { $in: eventIds } } },
          {
              $group: {
                  _id: '$eventId',
                  totalEnrollments: { $sum: 1 }
              }
          },
          {
              $lookup: {
                  from: 'events',
                  localField: '_id',
                  foreignField: '_id',
                  as: 'event'
              }
          },
          {
              $unwind: '$event'
          },
          {
              $project: {
                  _id: 0,
                  eventName: '$event.name',
                  totalEnrollments: 1
              }
          }
      ]);
      
      console.log(enrollments);
      res.json(enrollments);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
}



module.exports = {
  registerEnrollment,
  viewEnrollments,
  
  viewEnrollmentById,
  deleteEnrollmentById,
  viewPAprvdEnrollments,
  viewPendingEnrollmentsByOrganizerId,
  approveEnrollmentById,
  rejectEnrollmentById,
  viewApprovedEnrollmentsByTcId,
viewPAprvdEnrollmentsByOrganizerId,
viewApprovedEnrollmentsByEventId,
getEventsByOrg,
viewPAprvdEnrollmentsforTicket,
  addScoreByEnrollmentById,
  updatePositions,
  viewEnrollmentwithScore
};
