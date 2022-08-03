function log(req, res, next){
    console.log('Logger ishladi...');
    
    next();
}

module.exports = log;