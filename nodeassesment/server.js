const http = require("node:http");
const fs = require('fs');
const dbConnect = require('./dbConnecion.js');
const server = http.createServer( (req,res) => {
        switch(req.url){
            case '/selectTable':
                res.setHeader('content-type','text/json');
                dbConnect.selectTrainData().then((results)=>{
                    console.log(results);
                    res.write("success"+JSON.stringify(results));
                    res.statusCode = 200;
                    res.end();
                });
            break;
            case '/selectpassenger':
                dbConnect.selectPassengerData().then((results) => {
                    console.log(results);
                    fs.writeFile('result.json',JSON.stringify(results),function(err){
                        if(err) throw err;
                        console.log('yessss');
                    });
                    res.end();
                });
            break;
            default:
                res.statusCode = 404;
                res.end();
        }
});
server.listen(3000);

