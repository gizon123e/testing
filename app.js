const express = require("express");
const app = express()
// midelware error
app.use(require("./midelware/error-midelware"));

app.listen(4000, () => {
  console.log("connection express success");
});
