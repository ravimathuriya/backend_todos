const connectToMongo = require("./db")
const express = require('express')
const app = express();
const port = 5000;
var cors = require('cors')


connectToMongo();

//for using req.body
app.use(express.json())
app.use(cors())


//routes file connections
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

//for mongoose connections
app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port)