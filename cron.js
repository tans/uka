const cron = require("node-cron");

cron.schedule("*/5 * * * * *", function () {
  try {
    console.log(new Date());
    fetch(process.env.HOST + "/api/job").then();
  } catch (err) {}
});
