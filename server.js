const express = require ('express');
const app = express ();
const port = 3000;

//Routes

app.get ('/', (req, res) => {
  res.send ('Hello From API');
});

app.listen (port, () => {
  console.log (`Example app is listning on port ${port}`);
});
