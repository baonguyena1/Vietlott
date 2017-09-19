var db_util = {
    connectDatabase: function (mongoose, config) {
        var dbPath;
        dbPath = "mongodb://" + config.USER + ":";
        dbPath += config.PASS + "@";
        dbPath += config.HOST + ((config.PORT.length > 0) ? ":" : "");
        dbPath += config.PORT + "/";
        dbPath += config.DATABASE;
        console.log('dbPath = ' + dbPath);
        return mongoose.connect(dbPath);
    }
};
module.exports = db_util;