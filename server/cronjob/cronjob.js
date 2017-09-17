var cron = require('cron');

var cronJob = {
    getVietlott: function() {
        var job = new cron.CronJob({
            cronTime: '00 10 18 * * 0,2,5',     // running at 18:10 at sunday, wenesday, friday
            onTick: function() {
                // get new vietlot result and update to database
                console.log('cron run every second');
            },
            start: false,
            timeZone: 'Asia/Ho_Chi_Minh'
        });
        return job;
    },
    start: function() {
        this.getVietlott().start();
    }
};

module.exports = cronJob;