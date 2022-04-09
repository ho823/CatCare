const express = require('express');
const app = express();
const cors = require('cors');
const port = 7070;



const connectionDb = require('./config');
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/', (request: any, response: any) => {
  response.send('Bienvenue sur Express');
});

app.get('/api/animal', (req: any, res:any) => {
  connectionDb.query('SELECT * FROM animal', (err: any, results: any) => {
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

app.put('/api/animal/:id', (req: any, res: any) => {
  const idAnimal = req.params.id;
  const newAnimal = req.body;
  connectionDb.query('UPDATE animal SET ? WHERE id = ?', [newAnimal, idAnimal], (err: any, results: any) => {
    if (err) {
      res.status(500).json({
        message: 'Sauvegarde impossible',
        error: err,
      })
    } else {
      res.sendStatus(200);
    }
  })
/*     const newAnimal = {
        id: animals.length + 1,
        name: req.body.name,
        age: req.body.price
    } */
})

app.get('/api/vaccine', (req: any, res:any) => {
  connectionDb.query('SELECT * FROM vaccine', (err: any, results: any) => {
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

app.get('/api/meds', (req: any, res:any) => {
  connectionDb.query('SELECT * FROM meds', (err: any, results: any) => {
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

app.delete('/api/meds/:id', (req: any, res: any) => {
  const idMeds = req.params.id;
  connectionDb.query('DELETE FROM meds WHERE id = ?', [idMeds], (err: any) => {
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

app.get('/api/historical', (req: any, res:any) => {
  connectionDb.query('SELECT * FROM historical', (err: any, results: any) => {
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

app.post('/api/historical', (req: any, res: any) => {
  const formHistoric = req.body;
  connectionDb.query('INSERT INTO historical SET ?', formHistoric, (err: any, results: any) => {
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

app.put('/api/historical/:id', (req: any, res: any) => {
  const idHistorical = req.params.id;
  const newHistorical = req.body;
  connectionDb.query('UPDATE animal SET ? WHERE id = ?', [newHistorical, idHistorical], (err: any, results: any) => {
    if (err) {
      res.status(500).json({
        message: 'Sauvegarde impossible',
        error: err,
      })
    } else {
      res.sendStatus(200);
      res.json(req.body)
    }
  })
/*     const newAnimal = {
        id: animals.length + 1,
        name: req.body.name,
        age: req.body.price
    } */
})

app.delete('/api/historical/:id', (req: any, res: any) => {
  const idHistorical = req.params.id;
  connectionDb.query('DELETE FROM historical WHERE id = ?', idHistorical, (err: any) => {
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

app.listen(port, (err: any) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log('server is listening on port');
});
