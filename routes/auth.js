/**
 * Created by janghunlee on 2017. 12. 16..
 */

var passport = require('passport');
var FacebookTokenStrategy = require('passport-facebook-token');

module.exports = auth;

function auth(app , randomstring , userModel) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done){
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    passport.use(new FacebookTokenStrategy({
        clientID : "552505858435061",
        clientSecret : "aeb29558f28b1f8507f9b4f8f9c6b848"
    }, function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        userModel.findOne({
            id : profile.id
        }, function (err, user) {
            if(err){
                return done(err);
            }
            if(!user){
                var saveUser = new userModel({
                    id : profile.id,
                    name : profile.displayName,
                });
                saveUser.save(function (err) {
                    if(err) console.log(err);
                    else{
                        done(null, profile);
                    }
                })
            }
            else if(user){
                done(null, profile);
            }
        })
    }));

    app.get('/auth/facebook/token', passport.authenticate('facebook-token'), function (req, res) {
        console.log("user token : " + req.param('access_token'));
        if(req.user){
            var response = {
                id : req.user.id,
                name : req.user.displayName

            };
            res.send(200, response);
        }
        else if(!req.user){
            res.send(401, "Can't find User On Facebook. It May Be Unusable.");
        }
    });

    app.get('/auth/facebook/callback', passport.authenticate('facebook-token', {
        successRedirect : '/',
        failureRedirect : '/'
    }));

    // passport.use(new FacebookStrategy({
    //     clientID: '552505858435061',
    //     clientSecret: 'aeb29558f28b1f8507f9b4f8f9c6b848',
    //     callbackURL: 'soylatte.kr:6974/auth/facebook/callback',
    //     passReqToCallback: true,
    // }, (req, accessToken, refreshToken, profile, done) => {
    //     userModel.findOne({ id: profile.id }, (err, user) => {
    //         if (user) {
    //             return done(err, user);
    //         }
    //         var token = randomstring.generate();
    //         var saveUser = new userModel({
    //             id: profile.id,
    //             name: profile.name,
    //             password : profile.password,
    //             token : token,
    //         });
    //         saveUser.save((err) => {
    //             if(err) throw err;
    //             return done(200 , token);
    //         });
    //     });
    // }));
    //
    //
    // app.get('/auth/facebook', passport.authenticate('facebook', {
    //     authType: 'rerequest', scope: ['public_profile', 'email']
    // }));
    // app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
    //     res.redirect('/');
    // });

    app.post('/auth/login',(req,res)=>{
        "use strict";
        var data = req.body;

        userModel.find({"id":data.id,"password":data.password},(err,model)=>{
            if(err) throw err;

            if(model.length == 0){
                res.send(404,"User Not Found");
            }
            else{
                res.send(200,model[0]["token"]);
            }
        });
    });

    app.post('/auth/register',(req,res)=>{
        "use strict";
        var data = req.body;

        data.token = randomstring.generate();

        userModel.find({"id":data.id},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                var saveUser = new userModel({
                    "id":data.id,
                    "password":data.password,
                    "name":data.name,
                    "token":data.token,
                });
                saveUser.save((err,model)=>{
                    if(err) throw err;
                    res.send(200 , data.token);
                });
            }
            else{
                console.log(model);
                res.send(409 , "User Already Exist");
            }
        });
    });

    app.post('/auth/update/school',(req,res)=>{
        "use strict";
        var data = req.body;

        userModel.find({"token":data.token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                res.send(404);
            }
            else{
                userModel.update({"token":data.token},{$set:{"school":data.school,"class":data.class}},(err,model)=>{
                    if(err) throw err;
                    res.send(200);
                });
            }
        });
    });
}