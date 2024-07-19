const enrollmentSchema = require('../EventEnrollments/enrollmentSchema');
const Scoreboard = require('./scoreBoardSchema');

// Create a new scoreboard entry
const createScoreboard = async (req, res) => {
    try {
        const { enrollmentId,  score } = req.body;
let datas=await enrollmentSchema.findById(enrollmentId)
        const newScoreboard = new Scoreboard({
            eventId:datas.eventId,
            organizerId:datas.organizerId,
            tcId:datas.coachId,
            date:new Date(),
            score
           
        });

         await newScoreboard.save()
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

// Get all scoreboard entries
const getAllScoreboards = async (req, res) => {
    try {
        const scoreboards = await Scoreboard.find().populate('eventId').populate('organizerId');
        res.status(200).json(scoreboards);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific scoreboard entry by ID
const getScoreboardById = async (req, res) => {
    try {
        const scoreboard = await Scoreboard.findById(req.params.id).populate('eventId').populate('organizerId');
        if (!scoreboard) {
            return res.status(404).json({ message: 'Scoreboard not found' });
        }
        res.status(200).json(scoreboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a specific scoreboard entry by ID
const updateScoreboard = async (req, res) => {
    try {
        const { eventId, organizerId, date, score, position } = req.body;

        const updatedScoreboard = await Scoreboard.findByIdAndUpdate(
            req.params.id,
            { eventId, organizerId, date, score, position },
            { new: true, runValidators: true }
        ).populate('eventId').populate('organizerId');

        if (!updatedScoreboard) {
            return res.status(404).json({ message: 'Scoreboard not found' });
        }
        res.status(200).json(updatedScoreboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a specific scoreboard entry by ID
const deleteScoreboard = async (req, res) => {
    try {
        const deletedScoreboard = await Scoreboard.findByIdAndDelete(req.params.id);

        if (!deletedScoreboard) {
            return res.status(404).json({ message: 'Scoreboard not found' });
        }
        res.status(200).json({ message: 'Scoreboard deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports={
    createScoreboard,
    getAllScoreboards,
    getScoreboardById,
    
}