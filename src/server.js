const express = require('express');
const dbOperation = require('../dbFiles/dbOperation');
const corst = require('cors');

dbOperation.getTablesNames().then(res => {
    console.log(res);
});