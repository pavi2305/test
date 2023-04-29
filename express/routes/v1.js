const express = require('express');
const router = express.Router();
const passport = require('passport');
const passengerController = require('./../controller/passengerController');
const userController = require('./../controller/userController');
const ticketController = require('./../controller/ticketController');
const trainController = require('./../controller/trainController');
const stationController = require('./../controller/stationController');
require('./../middleware/passport')(passport);

router.post('/signUp',userController.signUp);
router.post('/signIn',userController.signIn);
router.get('/check',passport.authenticate('jwt',{session:false}),function(req,res,next){
    console.log('service',req.user);
    res.send('done '+ req.user.email);
});
router.get('/getUserDetails',passport.authenticate('jwt',{session:false}),userController.getUserDetails);
router.get('/getUserBookedTickts',passport.authenticate('jwt',{session:false}),userController.getUserBooked);
router.get('/getPassengerDetails',passport.authenticate('jwt',{session:false}),passengerController.getPassenger);
router.get('/getTrainDetails',passport.authenticate('jwt',{session:false}),trainController.getTrainDetail);
router.get('/sendTrainDetail',passport.authenticate("jwt",{session:false}),trainController.sendTrainDetail);
router.get('/averageTicketAmount',passport.authenticate("jwt",{session:false}),ticketController.avgTicketAmount);


router.get('/bookTicket',passport.authenticate('jwt',{session:false}),passengerController.insertPassenger);
router.get('/insertTickets',passport.authenticate('jwt',{session:false}),ticketController.insertTicket);
router.get('/insertTrain',passport.authenticate('jwt',{session:false}),trainController.insertTrain);
router.get('/insertStation',passport.authenticate("jwt",{session:false}),stationController.insertStation);


module.exports = router;