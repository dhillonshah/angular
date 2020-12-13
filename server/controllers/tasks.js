var express = require('express');
var router = express.Router();

//refernce our task model
const Task = require('../models/task')
const globals = require('../../config/globals')
// allow cross origins
router.use(((req, res, next) => {
    res.header('Access-Control-Allow-Origin', globals.clientRoot);
    res.header('Access-Control-Allow-Header', 'Origin, X-requested-With, Content-Type,Accept');
    res.header('Access-Control-Allow-Origin', 'GET,POST,PUT,DELETE,OPTIONS');
    next()
}))
//GET ALL
router.get('/', (req, res) => {
    //return all tasks
    Task.find((err, tasks) => {
        if (err) {
            return res.send(err).status(400)
        } else {
            res.json(tasks).status(200)
        }

    })
})

router.get('/', (req, res) => {
    //return selected by id
    Task.findById(req.params._id,(err, tasks) => {
        if (err) {
            return res.send(err).status(400)
        } else {
            res.json(tasks).status(200)
        }

    })
})
router.post('/',(req, res) => {
    Task.create({
        name: req.body.name,
        complete: req.body.complete,
        priority: req.body.priority
    }, (err,task) => {
        if (err)
        {
            return res.send(err).status(400)
    }
    else
        {
        (res.json(task).status(201))
    }
    })
})
//make public
module.exports = router
