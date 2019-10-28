// implement your API here
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

app.get('*', handleDefaultRequest)
app.get('/api/users', getAllUsers)

function handleDefaultRequest(req, res) {
    res.json('Its working')
}

app.listen(process.env.PORT || 4000, () => {
    console.log('port is listening on ' + (process.env.PORT || 4000))
})