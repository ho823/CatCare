"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const port = 7070;
const connectionDb = require('./config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.get('/', (request, response) => {
    response.send('Bienvenue sur Express');
});
app.get('/api/animal', (req, res) => {
    connectionDb.query('SELECT * FROM animal', (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Affichage impossible",
                error: err,
            });
        }
        else {
            res.json(results);
        }
    });
});
app.put('/api/animal/:id', (req, res) => {
    const idAnimal = req.params.id;
    const newAnimal = req.body;
    connectionDb.query('UPDATE animal SET ? WHERE id = ?', [newAnimal, idAnimal], (err, results) => {
        if (err) {
            res.status(500).json({
                message: 'Sauvegarde impossible',
                error: err,
            });
        }
        else {
            res.sendStatus(200);
        }
    });
    /*     const newAnimal = {
            id: animals.length + 1,
            name: req.body.name,
            age: req.body.price
        } */
});
app.get('/api/vaccine', (req, res) => {
    connectionDb.query('SELECT * FROM vaccine', (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Affichage impossible",
                error: err,
            });
        }
        else {
            res.json(results);
        }
    });
});
app.get('/api/meds', (req, res) => {
    connectionDb.query('SELECT * FROM meds', (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Affichage impossible",
                error: err,
            });
        }
        else {
            res.json(results);
        }
    });
});
app.delete('/api/meds/:id', (req, res) => {
    const idMeds = req.params.id;
    connectionDb.query('DELETE FROM meds WHERE id = ?', [idMeds], (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'Suppression impossible',
                error: err,
            });
        }
        else {
            res.sendStatus(200);
        }
    });
});
app.get('/api/historical', (req, res) => {
    connectionDb.query('SELECT * FROM historical', (err, results) => {
        if (err) {
            res.status(500).json({
                message: "Affichage impossible",
                error: err,
            });
        }
        else {
            res.json(results);
        }
    });
});
app.post('/api/historical', (req, res) => {
    const formHistoric = req.body;
    connectionDb.query('INSERT INTO historical SET ?', formHistoric, (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'Ajout impossible',
                error: err,
            });
        }
        else {
            res.json(req.body);
            res.status(200);
        }
    });
});
app.put('/api/historical/:id', (req, res) => {
    const idHistorical = req.params.id;
    const newHistorical = req.body;
    connectionDb.query('UPDATE animal SET ? WHERE id = ?', [newHistorical, idHistorical], (err, results) => {
        if (err) {
            res.status(500).json({
                message: 'Sauvegarde impossible',
                error: err,
            });
        }
        else {
            res.sendStatus(200);
            res.json(req.body);
        }
    });
    /*     const newAnimal = {
            id: animals.length + 1,
            name: req.body.name,
            age: req.body.price
        } */
});
app.delete('/api/historical/:id', (req, res) => {
    const idHistorical = req.params.id;
    connectionDb.query('DELETE FROM historical WHERE id = ?', idHistorical, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'Suppression impossible',
                error: err,
            });
        }
        else {
            res.sendStatus(200);
        }
    });
});
app.listen(port, (err) => {
    if (err) {
        throw new Error('Something bad happened...');
    }
    console.log('server is listening on port');
});
