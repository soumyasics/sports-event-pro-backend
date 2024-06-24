const Admin  = require('./teamCoachLoginSchema');
const secret = 'TeamcoachLogin'; // Replace this with your own secret key
const jwt = require('jsonwebtoken')
const multer = require("multer");
const { default: TeamcoachReg } = require('../../SNIT_SportsEventPro_Frontend/src/Components/TeamCoach/TeamcoachReg');

const teamCoachLoginPassword =async (req, res) =>{

    const TeamCoachLogin1 = await 
}