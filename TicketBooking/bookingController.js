const Ticket = require('./bookibgSchema'); 
const ticketSchema = require('../Tickets/ticketSchema'); 



// Create a new ticket
const createTicket = async (req, res) => {
  try {
    let tickStatus=false
    const { ticketId, ticketCount, amount, eventId, viewerId } = req.body;
const ticketData=await ticketSchema.findById(ticketId)

    const newTicket = new Ticket({
      ticketId,
      ticketCount,
      amount,
      eventId,
      viewerId,
    });
if(ticketData.availableSeats>ticketCount){
    await newTicket.save()
      .then(data => {
        tickStatus=true
        return res.json({
          status: 200,
          msg: 'Ticket created successfully',
          data: data,
        });
      })
      .catch(err => {
        console.log(err);
        return res.json({
          status: 500,
          msg: 'Ticket not created',
          data: err,
        });
      });
    }else{
      return res.json({
        status: 500,
        msg: 'Not Enough Available Seats',
      
      });
    }
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all tickets
const viewTickets = (req, res) => {
  Ticket.find({paymentStatus:true}).populate('eventId viewerId ticketId')
    .exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: 'Tickets obtained successfully',
          data: data,
        });
      } else {
        res.json({
          status: 200,
          msg: 'No tickets obtained',
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Tickets not obtained',
        Error: err,
      });
    });
};

// View ticket by ID
const viewTicketById = (req, res) => {
  Ticket.findById({ _id: req.params.id }).populate('eventId viewerId ticketId')
    .exec()
    .then(data => {
      res.json({
        status: 200,
        msg: 'Ticket obtained successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'No ticket obtained',
        Error: err,
      });
    });
};

// View ticket by ID
const updatePayment =async (req, res) => {
  const ticket=await Ticket.findById(req.params.id)
  console.log("ticket",ticket);
  const ticketData=await ticketSchema.findById(ticket.ticketId)
  console.log("ticket 2",ticketData);

   await Ticket.findByIdAndUpdate({ _id: req.params.id},{
        paymentStatus:true
    })
      .exec()
      .then(data => {
        res.json({
          status: 200,
          msg: 'Ticket obtained successfully',
          data: data,
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: 'No ticket obtained',
          Error: err,
        });
      });
    
      ticketData.availableSeats -= ticket.ticketCount;
      await ticketData.save();      
  };
// View ticket by ID
const viewTicketByViwerId = (req, res) => {
    Ticket.find({ viewerId: req.params.id,paymentStatus:true }).populate('eventId viewerId ticketId')
      .exec()
      .then(data => {
        res.json({
          status: 200,
          msg: 'Ticket obtained successfully',
          data: data,
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: 'No ticket obtained',
          Error: err,
        });
      });
  };
  
// View ticket by ID
const viewTicketByEventId = (req, res) => {
    Ticket.find({ eventId: req.params.id ,paymentStatus:true}).populate('eventId viewerId ticketId')
      .exec()
      .then(data => {
        res.json({
          status: 200,
          msg: 'Ticket obtained successfully',
          data: data,
        });
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          msg: 'No ticket obtained',
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
        msg: 'Ticket deleted successfully',
        data: data,
      });
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        msg: 'Ticket not deleted',
        Error: err,
      });
    });
};

// View tickets by event ID
const viewTicketsByTicketId = (req, res) => {
  Ticket.find({ ticketId: req.params.id,paymentStatus:true }).populate('viewerId')
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

// Function to get sold-out tickets count and total amount by eventId, grouped by eventId
const getSoldOutTicketsAndTotalAmountByEvent = async (req, res) => {
  const organizerId = req.params.id;

  try {
    // Find all tickets associated with the given organizer
    const tickets = await ticketSchema.find({ organizerId: organizerId });

    if (!tickets.length) {
      return res.json({
        status: 200,
        msg: 'No tickets found for this organizer',
        data: []
      });
    }

    // Extract ticket IDs and event IDs
    const ticketIds = tickets.map(ticket => ticket._id);
    const eventIds = tickets.map(ticket => ticket.eventId);

    // Aggregate total amount and count of sold-out tickets by eventId
    const result = await Ticket.aggregate([
      { $match: { ticketId: { $in: ticketIds }, paymentStatus: true } },
      { $group: { _id: "$eventId", totalAmount: { $sum: "$amount" } } }
    ]);

    // Prepare result by eventId
    const ticketsDataByEvent = tickets.reduce((acc, ticket) => {
      const eventId = ticket.eventId.toString();
      if (!acc[eventId]) {
        acc[eventId] = { soldOutTicketsCount: 0, totalAmount: 0 };
      }
      if (ticket.availableSeats === 0) {
        acc[eventId].soldOutTicketsCount += 1;
      }
      return acc;
    }, {});

    result.forEach(entry => {
      const eventId = entry._id.toString();
      if (ticketsDataByEvent[eventId]) {
        ticketsDataByEvent[eventId].totalAmount = entry.totalAmount;
      }
    });

    res.json({
      status: 200,
      msg: 'Data obtained successfully',
      data: ticketsDataByEvent
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Data not obtained',
      error: err.message
    });
  }
};
const getTotalAmountAndSoldTicketsByTicketId = async (req, res) => {
  const ticketId = req.params.id;

  try {
    // Aggregate total amount and count of sold tickets
    const result = await Ticket.aggregate([
      { $match: { ticketId: mongoose.Types.ObjectId(ticketId), paymentStatus: true } },
      {
        $group: {
          _id: "$ticketId",
          totalAmount: { $sum: "$amount" },
          soldTicketsCount: { $sum: "$ticketCount" }
        }
      }
    ]);

    // Check if result is empty
    if (result.length > 0) {
      res.json({
        status: 200,
        msg: 'Data obtained successfully',
        data: result[0]
      });
    } else {
      res.json({
        status: 200,
        msg: 'No data obtained for the provided ticketId',
        data: {
          totalAmount: 0,
          soldTicketsCount: 0
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      msg: 'Data not obtained',
      error: err.message
    });
  }
};

module.exports = {
  createTicket,
  viewTickets,
  viewTicketById,
  deleteTicketById,
  viewTicketByEventId,
  viewTicketByViwerId,
  updatePayment,
  viewTicketsByTicketId,
  getSoldOutTicketsAndTotalAmountByEvent,
  getTotalAmountAndSoldTicketsByTicketId
};
