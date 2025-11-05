const mongoose = require('mongoose');
mongoose.connect(process.env.MANGODB_URI);
module.exportsdbConnect