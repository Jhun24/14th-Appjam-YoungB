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
        clientID : "492282487787280",
        clientSecret : "82e04699121bbfad4ced501d4c9df584"
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

    app.get('/auth/facebook/token', function (req, res) {
        console.log("user token : " + req.query('token'));
        var accessToken = req.query('token');
        if(accessToken){
        userModel.find({"token": accessToken},(err,model)=>{
            if(err) throw err;

            if(model.length == 0){
                res.send(201,"User Not Found");
            }
            else{
                res.send(200,model[0]["token"]);
            }
        });
      }else{
          res.send(401, "Can't find User On Facebook. It May Be Unusable.");
      }
    });

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

        userModel.find({"token": data.token},(err,model)=>{
            if(err) throw err;

            if(model.length == 0){
                res.send(404,"User Not Found");
            }
            else{
                res.send(200, model[0]);
            }
        });
    });

    app.post('/auth/register',(req,res)=>{
        "use strict";
        var data = req.body;

        data.token = randomstring.generate();

        userModel.find({"token":data.token},(err,model)=>{
            if(err) throw err;
            if(model.length == 0){
                var saveUser = new userModel({
                    "token":data.token,
                    "name":data.name,
                    "school":data.school,
                    "class":data.class,
                    "grade": data.grade,
                    "number": data.number
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
}
