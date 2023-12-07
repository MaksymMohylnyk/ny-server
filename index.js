const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors')
const port = process.env.PORT || 3000;
const app = express();
const uri = "mongodb+srv://Makson:MyStr0ngPassw0rd@sandboxcluster.qmkhiwe.mongodb.net/nydb?retryWrites=true&w=majority";
const server = http.createServer(app);
const routes = require('./routes.js')

mongoose.connect(uri);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors({
    origin: '*'
}));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
  
app.use('/', routes);

server.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server is listening on port ${port}`)
})