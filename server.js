const dbOperation = require('./db-files/dbOperation');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const API_PORT = process.env.PORT || 5000;
const app = express();
const jsonParser = bodyParser.json();

app.post('/newF', async (req, res) => {
    console.log('called');
    const result = await dbOperation.addNewF(req.body.name, req.body.username, req.body.password
        , req.body.nat_id, req.body.birthdate, req.body.address, req.body.phone);
    return result;
})

app.use(express.json({
    type: ['application/json', 'text/plain']
  }))

app.post('/newSAM', jsonParser, async (req, res) => {
    console.log(' ');

    console.log(req.body);

    console.log(req.body.name)
    console.log(req.body.username)
    console.log(req.body.password)

    const result = await dbOperation.addNewSAM(req.body.name, req.body.username, req.body.password);
    return result;
})

app.listen(API_PORT, () => console.log(`listening on port ${API_PORT}`));