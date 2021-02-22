if (process.env.NODE_ENV !== 'production') { //ha a környezet nem lenne töltenne be
    require('dotenv').config()
}

const express = require('express');
const router = express.Router();
const semester = require('../models/Semester');


//get back all the posts
router.get('/', async (req, res) => {
    try {
        const sem = await semester.findOne();
        res.send(sem)

    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    try {
        var myquery = { _id: req.body.id };
        var newvalues = { $set: { startDate: req.body.startDate, endDate: req.body.endDate } };
        await semester.updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
        res.send();
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:user/getdates', async (req, res) => {
    try {
        const currDate = new Date();
        const sem = await semester.findOne();
        const startDate = new Date(sem.startDate);
        const endDate = new Date(sem.endDate);
        var response;

        if(currDate < startDate){
            response = false;
        } else if(currDate > endDate){
            response = false;
        } else {
            response = true;
        }

        res.send(response);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;