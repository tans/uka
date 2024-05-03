const cron = require("node-cron");

cron.schedule("*/5 * * * * *", function () {
  try {
    console.log(new Date());
    fetch("https://uka.minapp.xin/api/job").then();
  } catch (err) {}
});
