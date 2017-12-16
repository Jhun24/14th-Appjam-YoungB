/**
 * Created by janghunlee on 2017. 12. 16..
 */

module.exports = auth;

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

function auth(app , randomstring , userModel) {

    app.get('/auth/facebook', passport.authenticate('facebook', {
        authType: 'rerequest', scope: ['public_profile', 'email']
    }));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res) {
        res.redirect('/');
    });

    passport.use(new FacebookStrategy({
        clientID: '페이스북 클라이언트 아이디',
        clientSecret: '페이스북 클라이언트 시크릿',
        callbackURL: '홈페이지주소/auth/facebook/callback',
        passReqToCallback: true,
    }, (req, accessToken, refreshToken, profile, done) => {
        userModel.findOne({ id: profile.id }, (err, user) => {
            if (user) {
                return done(err, user);
            } // 회원 정보가 있으면 로그인
            var saveUser = new userModel({ // 없으면 회원 생성
                id: profile.id,
                name: profile.name,
                password : profile.password,
                token : randomstring.generate(),
            });
            saveUser.save((err) => {
                if(err) throw err;
                return done(200 , saveUser.token); // 새로운 회원 생성 후 로그인
            });
        });
    }));

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
                var saveUser = new userModel(data);
                saveUser.save((err,model)=>{
                    if(err) throw err;
                    res.send(200 , data.token);
                });
            }
            else{
                res.send(409 , "User Already Exist");
            }
        });
    });
}