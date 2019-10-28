// implement your API here
const express = require('express');
const cors = require('cors');
const db = require('./data/db')

const app = express();

app.use(cors());
app.use(express.json())

app.post('/api/users', postUser)
app.get('/api/users', getAllUsers)
app.get('/api/users/:id', getUserById)
app.delete('/api/users/:id', deleteUser)
app.put('/api/users/:id', updateUser)
app.get('*', handleDefaultRequest)

function handleDefaultRequest(req, res) {
    res.json('Its working')
}

function postUser(req, res) {

    const { name, bio } = req.body

    if (name && bio) {
        const user = {
            name: name,
            bio: bio
        }
        db.insert(user)
            .then(data => {
                console.log(data)
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json({
                    error: 'There was an error while saving the user to the database'
                })
            })
    } else {
        res.status(400).json({
            errorMessage: 'Please provide name and bio for the user.'
        })
    }

}

function getAllUsers(req, res) {
    db.find()
        .then(data => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: 'The users information could not be retrieved'
            })
        })
}

function getUserById(req, res) {
    const { id } = req.params;
    if (id) {
        db.findById(id)
            .then(data => {
                console.log(data)
                res.status(200).json(data)
            })
            .catch(error => {
                res.status(500).json({
                    error: 'The user with the specified ID does not exist.'
                })
            })
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        })
    }
}

function deleteUser(req, res) {
    const { id } = req.params;
    if (id) {
        db.remove(id)
            .then(data => {
                res.status(200).json(data)
                console.log(data)
            })
            .catch(error => {
                res.status(500).json({
                    error: 'The user could not be removed'
                })
            })
    } else {
        res.status(404).json({
            message: 'The user with the specified ID does not exist.'
        })
    }
}

function updateUser(req, res) {
    const { id } = req.params;
    const { name, bio } = req.body;
    if (name && bio) {
        db.update(id, req.body)
            .then(data => {
                if (data == '1') {
                    db.findById()
                        .then(users => {
                            console.log(users)
                            res.status(200).json(users)
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: 'The users information could not be modified'
                            })
                        })
                }
                else {
                    res.status(404).json({ 
                        message: "The user with the specified ID does not exist." 
                    })
                }
            })
            .catch(error => {
                res.status(500).json({
                    error: "The user could not be removed"
                })
            })
    } else {
        res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
        })
    }
}

app.listen(process.env.PORT || 4000, () => {
    console.log('port is listening on ' + (process.env.PORT || 4000))
})