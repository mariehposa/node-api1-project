// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db')

const app = express();

app.use(cors());
app.use(express.json())

app.get('/api/users', getAllUsers)
app.get('*', handleDefaultRequest)

function handleDefaultRequest(req, res) {
    res.json('Its working')
}

function getAllUsers (req, res) {
    db.find()
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
}

app.listen(process.env.PORT || 4000, () => {
    console.log('port is listening on ' + (process.env.PORT || 4000))
})