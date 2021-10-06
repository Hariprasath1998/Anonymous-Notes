const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors')
const path = require('path');

app = express();
PORT = process.env.PORT || 5000

connectDB();
app.use(cors())




app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false}))

// Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/forms', require('./routes/api/forms'))
app.use('/api/submitresponse', require('./routes/api/submitresponse'))
app.use('/api/auth', require('./routes/api/auth'))

// Serve static assets in production
// if(process.env.NODE_ENV === 'production'){
if(true){
    // Set Static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



app.listen(PORT);