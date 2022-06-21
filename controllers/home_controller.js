module.exports.home = function(req,res){
    return res.end('<h1>Express is up for codeial!</h1>');
}
module.exports.about= function(req,res){
    return res.end('<h1>This is a codeial site</h1>');
}