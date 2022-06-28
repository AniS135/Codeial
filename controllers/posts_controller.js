const Post = require('../models/post');

module.exports.create = function (req, res) {
    let variable = {
        content: req.body.content,
        user: req.user._id
    }
    Post.create(variable, function (err, post) {
        if (err) { console.log('Error in creating a post'); return; }

        return res.redirect('back');
    })
}