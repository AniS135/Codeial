const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function (req, res) {
    User.findById(req.params.id, function(err,user){
        return res.render('profile',{
            title: 'UserName',
            profile_user: user
        });
    }); 
}

module.exports.update = async function(req,res){
    if(req.user.id==req.params.id){

        try{
            let user=await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){ console.log('******Multer Error',err); return;}

                user.name=req.body.name;
                user.email=req.body.email;

                if(req.file){
                    const prev=path.join(__dirname,'..',user.avatar);
                    if(user.avatar){
                        if(fs.existsSync(prev)){
                            fs.unlinkSync(prev);
                        }else{
                            user.avatar="";
                        } 
                    }
                    
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar= User.avatarPath +'/'+req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });


        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }

    }else{
        req.flash('error','Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

// Render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

// Render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

// get the sign up data
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in finding user in sign up');
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) { console.log('Error in creating user while signing up'); return; }

                return res.redirect('/users/sign-in');
            });
        } else {
            res.redirect('back');
        }
    })
}

module.exports.createSession = function (req, res) {
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req,res,next) {
    req.logout(function(err) {
        if (err) { 
            return next(err);
        }
    });
    req.flash('success','You have logged out!');
    return res.redirect('/');
}