const dbOperation = require('./db-files/dbOperation');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const API_PORT = process.env.PORT || 5000;
const app = express();
const jsonParser = bodyParser.json();
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))
// app.use(bodyParser.urlencoded({extended: true}));


// Admin //
app.post('/addClub', jsonParser, async (req, res) => {
    return await dbOperation.addClub(req.body.name, req.body.location);
})

app.post('/delClub', jsonParser, async (req, res) => {
    return await dbOperation.delClub(req.body.name);
})

app.post('/addStadium', jsonParser, async (req, res) => {
    return await dbOperation.addStadium(req.body.name, req.body.location, req.body.capacity);
})

app.post('/delStadium', jsonParser, async (req, res) => {
    return await dbOperation.delStadium(req.body.name);
})

app.post('/blockFan', jsonParser, async (req, res) => {
    return await dbOperation.blockFan(req.body.nat_id);
})

app.post('/unblockFan', jsonParser, async (req, res) => {
    return await dbOperation.unblockFan(req.body.nat_id);
})

app.post('/viewStadiums', jsonParser, async (req, res) => {
    const result = await dbOperation.viewStadiums();
    console.log(result.recordset)
    res.send(result.recordset);
})

app.get('/viewClubs', jsonParser, async (req, res) => {
    const result = await dbOperation.viewClubs();
    console.log(result.recordset)
    res.send(result.recordset);
})

// Sports Association Manager //
app.post('/newSAM', jsonParser, async (req, res) => {
    return await dbOperation.addNewSAM(req.body.name, req.body.username, req.body.password);
})

// Club Representative //
app.post('/newCR', jsonParser, async (req, res) => {
    return await dbOperation.addNewCR(
        req.body.name, 
        req.body.username, 
        req.body.password,
        req.body.club
    );
})

// Stadium Manager //
app.post('/newSM', jsonParser, async (req, res) => {
    return await dbOperation.addNewSM(
        req.body.name, 
        req.body.username, 
        req.body.password,
        req.body.stadium
    );
})

// Fan //
app.post('/newF', jsonParser, async (req, res) => {
    return await dbOperation.addNewF(
        req.body.name, 
        req.body.username, 
        req.body.password,
        req.body.nat_id,
        req.body.birthdate,
        req.body.address,
        req.body.phone
    );
})

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));