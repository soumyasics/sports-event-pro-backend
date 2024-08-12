const Event = require('./eventSchema');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const teamCoachSchema = require('../TeamCoach/teamCoachSchema');
const Ticket = require('../TicketBooking/bookibgSchema');
const mongoose=require('mongoose');
const ticketSchema = require('../Tickets/ticketSchema');

const eventSchema = require('./eventSchema');
const secret = 'eventsSecretKey'; // Replace this with your own secret key

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, './upload');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'event-'; // Add your desired prefix here
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single('banner');

// Register a new event
const registerEvent = async (req, res) => {
  try {
    const { organizerId, name, venue, date, time, category } = req.body;

    const newEvent = new Event({
      organizerId,
      name,
      venue,
      date,
      time,
      category:category.toLowerCase(),
      banner: req.file,
    });

    await newEvent.save()
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

// View all events
const viewEvents = (req, res) => {
  console.log("api worked");
  Event.find({adminApprved:'Pending'})
    .exec()
    .then(data => {
      if (data.length > 0) {
        console.log(data);
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



// View all approved events
const viewApprovedEvents = (req, res) => {
  Event.find({adminApprved:'Approved'}).populate('organizerId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        console.log(data);
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



// View all approved events
const viewApprovedEventsByOrgId = (req, res) => {
  Event.find({adminApprved:'Approved',organizerId:req.params.id}).populate('organizerId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        console.log(data);
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


// View all approved events
const viewApprovedEventsByOrgIdforScoreBoard = (req, res) => {
  Event.find({adminApprved:'Approved',organizerId:req.params.id,date:{$lte:new Date()}}).populate('organizerId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        console.log(data);
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
// Update event by ID
const editEventById = async (req, res) => {
  const { organizerId, name, venue, date, time, category } = req.body;

  await Event.findByIdAndUpdate(
    { _id: req.params.id },
    {
      organizerId,
      name,
      venue,
      date,
      time,
      category:category.toLowerCase(),
      banner: req.file,
    }
  )
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Updated successfully',
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

// View event by ID
const viewEventById = (req, res) => {
  Event.findById({ _id: req.params.id })
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

// View event by ID
const viewEventByOrganizerId = (req, res) => {
  Event.find({organizerId: req.params.id }).sort({date:-1})
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
// Delete event by ID
const deleteEventById = (req, res) => {
  Event.findByIdAndDelete({ _id: req.params.id })
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


const approveEventById = (req, res) => {
  Event.findByIdAndUpdate({ _id: req.params.id },{adminApprved:'Approved'})
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
        msg: 'Data not deleted',
        Error: err,
      });
    });
};


const rejectEventById = (req, res) => {
  Event.findByIdAndUpdate({ _id: req.params.id },{adminApprved:'Rejected'})
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'updated successfully',
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
// JWT authentication middleware
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.json({ status: 401, msg: 'Unauthorized' });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.json({ status: 401, msg: 'Unauthorized', err: err });
    }

    req.user = decodedToken.userId;
    next();
  });
};

const addRating = (req, res) => {
  let newRate = parseInt(req.body.rating);
  let rating = 0;
  Event.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      rating = data.rating;
      if (data.rating != 0) rating = (rating + newRate) / 2;
      else rating = newRate;
      Event.findByIdAndUpdate(
        { _id: req.params.id },
        {
          rating: rating,
        },
        { new: true }
      )
        .exec()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
          });
        });
    });
};


// View all past events
const viewPastEvents = (req, res) => {
  const currentDate = new Date();

  Event.find({ date: { $lt: currentDate }, adminApprved: 'Approved' }).populate('organizerId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        console.log(data);
        res.json({
          status: 200,
          msg: 'Past events obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No past events found',
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


// View all past events
const viewUpcomingEvents = (req, res) => {
  const currentDate = new Date();

  Event.find({ date: { $gte: currentDate }, adminApprved: 'Approved' }).populate('organizerId').sort({date:-1})
    .exec()
    .then(data => {
      if (data.length > 0) {
        console.log(data);
        res.json({
          status: 200,
          msg: 'Past events obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No past events found',
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


// View all past events
const viewUpcomingEventsforTC =async (req, res) => {
  const currentDate = new Date();
  
let coachData=await teamCoachSchema.findById(req.params.id)
console.log("cate",coachData.category);

 await Event.find({ adminApprved:'Approved',date:{$gt:new Date()},category:coachData.category }).sort({date:-1}).limit(4).sort({date:-1})
    .exec()
    .then(data => {
      if (data.length > 0) {
        console.log( "datasss",data.length);
        res.json({
          status: 200,
          msg: 'Past events obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No past events found',
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

const viewPAprvdEnrollmentsForHome = (req, res) => {
  Event.find({ adminApprved:'Approved',date:{$gt:new Date()} }).sort({date:-1}).limit(3).sort({date:-1})
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






async function getViewerSuggestedEvents(viewerId) {
 
  //     return null;
  // } catch (error) {
  //     console.error('Error fetching viewer-suggested events:', error);
  //     throw error;
  // }
}




// Get suggestions based on the latest booked event's category
const getEventSuggestionsForViewer = async (req, res) => {
  try {
    let cats=[]
  let today=new Date()
   const books=await Ticket.find({viewerId:req.params.id}).sort({createdAt:-1}).limit(3).exec()
  
   const eveId=books[0].eventId

console.log(eveId);
const eve=await eventSchema.findById({_id:eveId}).exec()
console.log(eve);
const eves=await eventSchema.find({category:eve.category}).exec().then(data=>{
  data.map(x=>{
    cats.push(x._id)

  })
})

console.log("cats",cats);

const tickets=await ticketSchema.find({
  startDate: { $lte: today },
  endDate: { $gte: today },
  eventId:{$in:cats}
}).populate('eventId')
console.log("tickets",tickets);
const uniqueTickets = Array.from(
  new Map(tickets.map(ticket => [ticket.eventId.toString(), ticket])).values()
);
console.log("uniqueTickets",uniqueTickets);
res.status(200).json({
  status: 200,
  msg: 'event suggestions obtained',
  data:uniqueTickets
});
} catch (error) {
    console.error('Error fetching viewer-suggested events:', error);
    res.status(500).json({
        status: 500,
        msg: 'An error occurred while fetching event suggestions',
        error: error.message
    });
}
};

module.exports = {
  registerEvent,
  viewEvents,
  editEventById,
  viewEventById,
  deleteEventById,
  upload,
  requireAuth,
  viewEventByOrganizerId,
  approveEventById,
  rejectEventById,
  viewApprovedEvents,
  addRating,
  viewPAprvdEnrollmentsForHome,
  viewApprovedEventsByOrgId,
  viewApprovedEventsByOrgIdforScoreBoard,
  viewPastEvents,
  viewUpcomingEvents,
  viewUpcomingEventsforTC,
  getEventSuggestionsForViewer
};
