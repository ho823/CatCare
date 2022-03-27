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

app.post('/api/animal', (req: any, res: any) => {
  const newAnimal = req.body;
  connectionDb.query('INSERT INTO animal SET ?', newAnimal, (err: any, results: any) => {
    if (err) {
      res.status(500).json({
        message: 'Sauvegarde impossible',
        error: err,
      })
    } else {
      res.status(200).json({
        res: results
      })
    }
  })
/*     const newAnimal = {
        id: animals.length + 1,
        name: req.body.name,
        age: req.body.price
    } */
})

app.listen(port, (err: any) => {
  if (err) {
    throw new Error('Something bad happened...');
  }
  console.log('server is listening on port');
});
