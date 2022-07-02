const Post = require('../models/post');
const User = require('../models/user');


module.exports.home = async function (req, res) {
    // Populate the user of each post
    try {
        let posts = await Post.find({})
            .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });
        let users = await User.find({});
        return res.render('home', {
            title: "Codeial | Home",
            all_users: users,
            posts: posts
        });
    } catch (err) {
        console.log('Error', err);
        return;
    }

}

