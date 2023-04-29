const mysql = require('mysql2');

const con = mysql.createConnection({
    user:'root',
    password:'root',
    host:'localhost',
    database:'assesment362'
});
con.connect();

const selectTrainData = function (){
    return new Promise((myResolve,myReject)=>{
        con.query('select * from train as t left join station as s on t.id = s.trainId',function(err,result){
             if(result){
                // console.log(result);
                 myResolve(result);
             }
             else{
                 myReject(err);
             }
         })
     })
};

const selectPassengerData = function(){
    return new Promise((myResolve,myReject) => {
        con.query('select * from passenger as p left join ticket as t on p.ticketId = t.id',function(err,result){
            if(result){
                myResolve(result);
            }
            else{
                myReject(err);
            }
        })
    })
};

module.exports = {selectTrainData,selectPassengerData};

