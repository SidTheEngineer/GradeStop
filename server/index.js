const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);
app.use(express.static(path.resolve(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});
app.listen(app.get('port'), () => {
  console.log('Express server started on port ', app.get('port'));
});