var mongoClient = require('mongodb').MongoClient;
var bienflo,bienclo,bienfe,bienal,biencuso4;
module.exports.docketqua = function(app,URL) {
    app.get("/api/flo", function(req, res){
        res.send(bienflo)
    });
    app.get("/api/clo", function(req, res){
        res.json(bienclo);
    });
    app.get("/api/fe", function(req, res){
        res.json(bienfe);
    });
    app.get("/api/al", function(req, res){
        res.json(bienal);
    });
    app.get("/api/cuso4", function(req, res){
        res.json(biencuso4);
    });
    mongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        let dbo = db.db("variable");
        dbo.collection("data").find({name: "ns=1;s=\"Number\".\"C_Cl\""}).toArray(function(err, result) {
            bienclo = result;
            if (err) throw err;
            db.close();
        });
    });

    mongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        let dbo = db.db("variable");
        dbo.collection("data").find({name: "ns=1;s=\"Number\".\"C_CuSO4\""}).toArray(function(err, result) {
            biencuso4 = result;
            if (err) throw err;
            db.close();
        });
    });

    mongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        let dbo = db.db("variable");
        dbo.collection("data").find({name: "ns=1;s=\"Number\".\"C_Fe\""}).toArray(function(err, result) {
            bienfe = result;
            if (err) throw err;
            db.close();
        });
    });

    mongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        let dbo = db.db("variable");
        dbo.collection("data").find({name: "ns=1;s=\"Number\".\"C_Al\""}).toArray(function(err, result) {
            bienal = result;
            if (err) throw err;
            db.close();
        });
    });
    mongoClient.connect(URL, function(err, db) {
        if (err) throw err;
        let dbo = db.db("variable");
        dbo.collection("data").find({name: "ns=1;s=\"Number\".\"C_F\""}).toArray(function(err, result) {
            bienflo= result;
            if (err) throw err;
            db.close();
        });
    });
}