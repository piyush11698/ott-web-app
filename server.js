const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/ott-web-app'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ott-web-app/index.html'));
});

app.listen(process.env.PORT || 4200);