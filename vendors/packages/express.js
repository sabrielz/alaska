const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('./path');

let app = express();
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json({}));
app.use(express.static(path.join(path.xbase, 'storage')));
app.use(cors());

module.exports = app;