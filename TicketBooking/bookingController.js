const Ticket = require('./bookibgSchema'); 



// Create a new ticket
const createTicket = async (req, res) => {
  try {
    const { ticketId, ticketCount, amount, eventId, viewerId } = req.body;

    const newTicket = new Ticket({
      ticketId,
      ticketCount,
      amount,
      eventId,
      viewerId,
    });

    await newTicket.save()
      .then(data => {
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
const updatePayment = (req, res) => {
    Ticket.findByIdAndUpdate({ _id: req.params.id},{
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


module.exports = {
  createTicket,
  viewTickets,
  viewTicketById,
  deleteTicketById,
  viewTicketByEventId,
  viewTicketByViwerId,
  updatePayment
};
