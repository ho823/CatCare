const express = require('express');
const app = express();
const cors = require('cors');
const port = 7070;
import { Request, Response } from "express";
import {IAnimal, IHistorical, IMeds, IVaccine} from '../types';




const connectionDb = require('./config');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (request: Request, response: Response) => {
  response.send('Bienvenue sur Express');
});

app.get('/api/animal', (req: Request, res: Response) => {
  connectionDb.query('SELECT * FROM animal', (err: Error, results: IAnimal[]) => {
    if (err) {
      res.status(500).json({
        message: "Affichage impossible",
        error: err,
      })
    } else {
      res.json(results)
    }
  })
})

app.put('/api/animal/:id', (req: Request, res: Response) => {
  const idAnimal = req.params.id;
  const newAnimal = req.body;
  connectionDb.query('UPDATE animal SET ? WHERE id = ?', [newAnimal, idAnimal], (err: Error, results: IAnimal) => {
    if (err) {
      return res.status(500).json({
        message: 'Sauvegarde impossible',
        error: err,
      })
    } else {
      return res.sendStatus(200).json(req.body);
    }
  })
})

app.get('/api/vaccine', (req: Request, res: Response) => {
  connectionDb.query('SELECT * FROM vaccine', (err: Error, results: IVaccine[]) => {
    if (err) {
      res.status(500).json({
        message: "Affichage impossible",
        error: err,
      })
    } else {
      res.json(results)
    }
  })
})

app.get('/api/meds', (req: Request, res: Response) => {
  connectionDb.query('SELECT * FROM meds', (err: Error, results: IMeds[]) => {
    if (err) {
      res.status(500).json({
        message: "Affichage impossible",
        error: err,
      })
    } else {
      res.json(results)
    }
  })
})

app.delete('/api/meds/:id', (req: Request, res: Response) => {
  const idMeds = req.params.id;
  connectionDb.query('DELETE FROM meds WHERE id = ?', [idMeds], (err: Error) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'Suppression impossible',
        error: err,
      })
    } else {
      res.sendStatus(200);
    }
  })
})

app.get('/api/historical', (req: Request, res: Response) => {
  connectionDb.query('SELECT * FROM historical', (err: Error, results: IHistorical[]) => {
    if (err) {
      res.status(500).json({
        message: "Affichage impossible",
        error: err,
      })
    } else {
      res.json(results)
    }
  })
})

app.post('/api/historical', (req: Request, res: Response) => {
  const formHistoric = req.body;
  connectionDb.query('INSERT INTO historical SET ?', formHistoric, (err: Error, results: IHistorical) => {
    if (err) {
      console.log(err)
      res.status(500).json({
        message: 'Ajout impossible',
        error: err,
      })
    } else {
      res.json(req.body)
      res.status(200);
    }
  })
})

app.delete('/api/historical/:id', (req: Request, res: Response) => {
  const idHistorical = req.params.id;
  connectionDb.query('DELETE FROM historical WHERE id = ?', idHistorical, (err: Error) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'Suppression impossible',
        error: err,
      })
    } else {
      res.sendStatus(200);
    }
  })
})

app.listen(port, (err: Error) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log('server is listening on port');
});
