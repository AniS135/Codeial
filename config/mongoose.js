const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/codeial_db');

const db= mongoose.connection;