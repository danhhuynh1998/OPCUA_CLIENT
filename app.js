const express = require("express");
const chalk = require("chalk");
const socketIO = require("socket.io");
var dsbien = require('./config/nodeID.json');
// SET UP SERVER ======================================================================
var app      = express();
var port     = process.env.PORT || 3700;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var expressSession  = require('express-session');
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect to our database
require('./api/config/passport')(passport); // pass passport for configuration
const opcua = require("node-opcua");
const endpointUrl = "opc.tcp://DESKTOP-B8N6V6G:4840";
// set up database for history //////////////////////////////////////////////
var mongoClient = require('mongodb').MongoClient;
//var URL = "mongodb://localhost/";
var URL = "mongodb+srv://DanhHuynh:danhhuynhquang@lvtn-zmehu.mongodb.net/test?retryWrites=true&w=majority";

// const  userIdentity = { userName: "user", password: "user" };
(async () => {
    try {
        const client = opcua.OPCUAClient.create({
            endpoint_must_exist: false
        });
        client.on("backoff", (retry, delay) => {
            console.log("Retrying to connect to ", endpointUrl, " attempt ", retry);
        });
        console.log("Connecting to ", chalk.cyan(endpointUrl));
        await client.connect(endpointUrl);
        console.log("Connected to ", chalk.cyan(endpointUrl));

//Create SESSION.....................
        const session = await client.createSession();
        console.log("Session created");
//Create SUBSCRIPTION
        const subscription = await session.createSubscription2({
            requestedPublishingInterval: 2000,
            requestedMaxKeepAliveCount: 20,
            requestedLifetimeCount: 6000,
            maxNotificationsPerPublish: 1000,
            publishingEnabled: true,
            priority: 10
        });

       subscription.on("keepalive", function () {
            console.log("keepalive");
        }).on("terminated", function () {
            console.log("TERMINATED")
        });

// set up our express application
        app.use('/assets', express.static(__dirname + '/public'))
        app.use(morgan('dev')); // log every request to the console
        app.use(cookieParser()); // read cookies (needed for auth)
        app.use(bodyParser.json()); // get information from html forms
        app.use(bodyParser.urlencoded({ extended: true }));
        app.set('view engine', 'ejs'); // set up ejs for templating
// required for passport
        app.use(expressSession({
            secret: 'xxxxxxxxxxxxx',
            resave: false,
            saveUninitialized: true,
            maxAge: 24 * 60 * 60 * 1000
        }));
        app.use(passport.initialize());
        app.use(passport.session()); // persistent login sessions
        app.use(flash()); // use connect-flash for flash messages stored in session
        app.use((req,res,next) => {
            res.header("Access-Control-Allow-Origin","*");
            res.header('Access-Control-Allow-Methods',"*");
            res.header('Access-Control-Allow-Headers',"*");
            next();
        });

// routes ======================================================================
        require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// INITIALIZE SOCKET.IO
        const io = socketIO.listen(app.listen(port));

// SOCKET.IO LISTEN REFRESH FROM HTML AND THEN READ VALUE FROM OPCUA SERVER
            io.sockets.on('connection', (socket) => {
                var value_valve = [
                    'valve_1',
                    'valve_2',
                    'valve_3',
                    'valve_4',
                    'valve_5',
                    'valve_6',
                    'valve_7',
                    'valve_8',
                    'valve_cuso4',
                    'valve_clo',
                    'valve_phen_nhom',
                    'valve_phen_sat',
                    'valve_flo',
                    'valve_xa_1',
                    'valve_xa_2',
                    'valve_xa_3',
                    'motor_khuay',
                    'motor_ozone',
                    'main_switch',
                    'emergency',
                    'mode'
                  ];
                function socket_on(param){
                    socket.on(param,function(data){
                        const nodesToWrite = ({
                            nodeId: data.nodeid.toString(),
                            attributeId: opcua.AttributeIds.Value,
                            value: {
                                statusCode: opcua.StatusCodes.Good,
                                value: {
                                    dataType: opcua.DataType.Boolean,
                                    value: data.value
                                }
                            }
                        });
                        session.write(nodesToWrite, function(err,statusCode,diagnosticInfo) {
                            if (!err) {
                                console.log(" write ok" );
                                // console.log(diagnosticInfo);
                                console.log(statusCode);
                            }
                        });
                    })
                }
                for (var i = 0; i < value_valve.length; i++) {
                    socket_on(value_valve[i])
                }
            });
            io.sockets.on('connection', (socket) => {
                ket_qua = doc_all_bien();
                ket_qua.then(function(data){
                    // console.log(data)
                    io.sockets.emit('value',data)
                })
            });
// GOI HAM XUAT FILE JSON TU MONGODB
var x = require('./api/getdata/getData.js')
// WIRTE ARRAY OF VARIABLE TO DB COLLECTION VARIABLE
setInterval(() => {
        let today = new Date();
        x.docketqua(app,URL);
        mongoClient.connect(URL, function(err, db) {
            let upcsdl = doc_all_bien();
            upcsdl.then(function(data){
                let datacsdl = data.splice(28);
                for (let i = 0; i < datacsdl.length; i++){
                    let myobj = {
                        name: dsbien[i+28].name,
                        time: today.toLocaleDateString()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds(),
                        value: Math.floor((Math.random() * 100) + 1)};
                    let dbo = db.db("variable");
                    dbo.collection("data").insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    db.close();
                    });
                }
            });
        });
    },5000)
// READ........................................
            var mangsolieu = new Array();
            function doc_1_bien(node,i){
                let nodeIdToMonitor = node;
                let maxAge = 0;
                let nodeToRead = { nodeId: nodeIdToMonitor, attributeId: opcua.AttributeIds.Value};
                return new Promise(function(res)
                {
                    session.read(nodeToRead, maxAge , function(err,dataValue)
                    {
                        mangsolieu[i] = dataValue.value.value;
                        return res();
                    });
                });
            }
            async function doc_all_bien(){
                    for(i = 0; i < dsbien.length ; i ++){
                        await doc_1_bien(dsbien[i].name,i);
                    };
                    return mangsolieu;
            };

// LISTEN AND UPADATE THE DATA IF THERE IS ANY CHANGE
            for(let i = 0; i < dsbien.length ; i++) {
                let nodeId = dsbien[i].name;
                let itemToMonitor = {
                    nodeId: nodeId,
                    attributeId: opcua.AttributeIds.Value
                };
                let parameters = {
                    samplingInterval: 10,
                    discardOldest: true,
                    queueSize: 1
                };
                let monitoredItem = await subscription.monitor(itemToMonitor, parameters, opcua.TimestampsToReturn.Both);
                monitoredItem.on("changed", (dataValue) => {
                    io.emit(dsbien[i].chanel.toString(),dataValue.value.value.toString());
                });
            }
// detect CTRL+C and close
        let running = true;
        process.on("SIGINT", async () => {
            if (!running) {
                return; // avoid calling shutdown twice
            }
            console.log("Shutting down client");
            running = false;
            await subscription.terminate();
            await session.close();
            await client.disconnect();
            console.log("Done");
            process.exit(0);
        });
    }
    catch (err) {
        console.log(chalk.bgRed.white("Error" + err.message));
        console.log(err);
        process.exit(-1);
    }
})();

// e-mail notifications
var notification = require('./api/notifications/notification')
//notification()