const cron = require("node-cron");

cron.schedule("*/5 * * * * *", function () {
  try {
    fetch("https://uka.minapp.xin/api/job").then();
  } catch (err) {}
});
