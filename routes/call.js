/**
 * Created by janghunlee on 2017. 12. 16..
 */

module.exports = call;

function call(app , callModel , userModel , randomstring ,shuttleModel) {
    app.get('/call/list',(req,res)=>{
        "use strict";
        var token = req.query.token;

        userModel.find({"token":token},(err,model)=>{
            if(err) throw err;

            if(model.length == 0){
                res.send(404 , "User Not Found");
            }
            else{
                var school = model[0]["school"];

                callModel.find({"school":school},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        res.send(404);
                    }
                    else{
                        res.send(200,model);
                    }
                })
            }
        });
    });

    app.post('/call/shuttle',(req,res)=>{
        "use strict";
        var data = req.body;
        console.log(data.token);
        userModel.find({"token":data.token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send(404,"User Not Found");
            }
            else{
                var saveCall = new callModel({
                    "school":model[0]["school"],
                    "name":model[0]["name"],
                    "class":model[0]["school"],
                    "price":data.price,
                    "tip":data.tip,
                    "type":data.type,
                    "menu":data.menu,
                    "userToken":data.token,
                    "callToken":randomstring.generate()
                });

                saveCall.save((err)=>{
                    if(err) throw err;
                    res.send(200);
                });
            }
        });
    });

    app.post('/call/shuttle/accept',(req,res)=>{
        "use strict";
        var data = req.body;

        userModel.find({"token":data.token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send(404);
            }
            else{
                var name = model[0]["name"];

                callModel.find({"callToken":data.callToken},(err,model)=>{
                    if(err) throw err;
                    if(model.length == 0){
                        res.send(404,"Token Error");
                    }
                    else{
                        var saveShuttle = new shuttleModel({
                            "school":model[0]["school"],
                            "name":model[0]["name"],
                            "class":model[0]["class"],
                            "price":model[0]["price"],
                            "tip":model[0]["tip"],
                            "type":model[0]["type"],
                            "menu":model[0]["menu"],
                            "userToken":model[0]["userToken"],
                            "shuttleToken":data.token,
                            "shuttleName":name,
                        });

                        saveShuttle.save((err)=>{
                            if(err) throw err;

                            userModel.update({"token":model[0]["userToken"]},{$set:{"status":"order"}},(err)=>{
                                if(err) throw err;
                            });

                            userModel.update({"token":data.token},{$set:{"status":"order"}},(err)=>{
                                if(err) throw err;
                            });

                            callModel.remove({"callToken":data.callToken},(err,model)=>{
                                if(err) throw err;

                                res.send(200);
                            });
                        });
                    }
                });
            }
        });
    });

    app.get('/call/shuttle/list',(req,res)=>{
        "use strict";
        var token = req.query.token;

        userModel.find({"token":token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send(404);
            }
            else{
                if(model[0]["status"] == "shuttle"){
                    shuttleModel.find({"shuttleToken":token},(err,model)=>{
                        if(err) throw err;

                        if(model.length == 0){
                            res.send(404)
                        }
                        else{
                            res.send(200,model);
                        }
                    });
                }
            }
        });
    });
}