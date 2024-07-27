const Ticket = require('./ticketSchema');
const Event = require('../Events/eventSchema');
const Organizer = require('../Organizer/OrganizerSchema');

// Register a new ticket
const registerTicket = async (req, res) => {
  try {
    const { startDate, endDate, seatingCapacity, eventId, organizerId, amount } = req.body;

   

    const newTicket = new Ticket({
      startDate,
      endDate,
      seatingCapacity,
      eventId,
      organizerId,
      availableSeats:seatingCapacity,
      amount,
      banner: req.file,
    });

    await newTicket.save()
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

// View all tickets
const viewTickets = (req, res) => {
  Ticket.find().populate('eventId')
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

// View tickets by event ID
const viewTicketsByEventId = (req, res) => {
  Ticket.find({ eventId: req.params.id ,availableSeats:{$gt:0}})
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

// View tickets by organizer ID
const viewTicketsByOrganizerId = (req, res) => {
  Ticket.find({ organizerId: req.params.id })
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

// Update ticket by ID
const editTicketById = async (req, res) => {
  const { startDate, endDate, seatingCapacity, eventId, organizerId, amount } = req.body;

  await Ticket.findByIdAndUpdate(
    { _id: req.params.id },
    {
      startDate,
      endDate,
      seatingCapacity,
      eventId,
      organizerId,
      amount,
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

// View ticket by ID
const viewTicketById = (req, res) => {
  Ticket.findById({ _id: req.params.id }).populate('eventId')
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

// Delete ticket by ID
const deleteTicketById = (req, res) => {
  Ticket.findByIdAndDelete({ _id: req.params.id })
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

// View all approved events by organizer ID for which tickets have not been generated
const viewApprovedEventsByOrgIdWithoutTickets = async (req, res) => {
    try {
      const organizerId = req.params.id;
  
      // Convert organizerId to ObjectId if necessary
  
      // Find all approved events for the given organizer ID
      const approvedEvents = await Event.find({
        adminApprved: 'Approved',
        organizerId: organizerId,
      }).select('_id'); // Only fetch the event IDs
  
      if (!approvedEvents.length) {
        return res.json({
          status: 200,
          msg: 'No approved events found for this organizer',
        });
      }
  
      const eventIds = approvedEvents.map(event => event._id);
  
      // Use aggregate to filter events without tickets
      const eventsWithoutTickets = await Event.aggregate([
        {
          $match: {
            _id: { $in: eventIds },
          },
        },
        {
          $lookup: {
            from: 'tickets', // Ensure this is the correct collection name
            localField: '_id',
            foreignField: 'eventId',
            as: 'tickets',
          },
        },
        {
          $match: {
            'tickets.0': { $exists: false }, // No tickets should exist for this event
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            organizerId: 1,
            venue: 1,
            date: 1,
            time: 1,
            category: 1,
            banner: 1,
            adminApprved: 1,
          },
        },
      ]);
  
      if (eventsWithoutTickets.length > 0) {
        res.json({
          status: 200,
          msg: 'Data obtained successfully',
          data: eventsWithoutTickets,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No events found without tickets',
        });
      }
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({
        status: 500,
        msg: 'Data not obtained',
        Error: err,
      });
    }
  };
  
  
  
const getValidTickets = async (req,res) => {

      const today = new Date();
      const tickets = await Ticket.find({
          startDate: { $lte: today },
          endDate: { $gte: today }
      }).populate('eventId')
      .then(data=>{

 
     res.json({
      status:200,
      data:data,
      msg:'Data obtained'
     });
    })
  .catch (error=> {
      console.error('Error fetching valid tickets:', error);
      res.json({
        status:500,
        err:error,
        msg:'Data obtained'
       });
      })
  }



  
  
module.exports = {
  registerTicket,
  viewTickets,
  viewTicketsByEventId,
  viewTicketsByOrganizerId,
  editTicketById,
  viewTicketById,
  deleteTicketById,
  viewApprovedEventsByOrgIdWithoutTickets,
  getValidTickets
};
