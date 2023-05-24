
const express = require('express');
const app = express();
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
// name for database
const dbName = 'exe1';
let db;
async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(url);
    console.log('Successfully connected to MongoDB');
    db = client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}
// port for start
app.listen(82, async function() {
  try {
    await connectToMongoDB();
    console.log('Server started and connected to MongoDB');

  } catch (err) {
    console.error('Error starting the server:', err);
  }
});


// show
app.get('/equipes', async (req, res) => {
    try {
      const docs = await db.collection('equipe').find({}).toArray();
      res.json(docs);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  // show by id
app.get('/equipes/:id', async (req, res) => {
    let id=parseInt(req.params.id)
    try {
      const docs = await db.collection('equipe').find({id}).toArray();
      res.json(docs);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
// Add 
  app.post('/equipes/', async (req, res) => {
    console.log(req.body);
       db.collection('equipe').insertOne(req.body);
      res.status(200).json(req.body);
   
  });

//   delete
app.delete('/equipes/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(id);
       db.collection('equipe').deleteOne(req.params.body);
      res.status(200).send('bien supprimer');
   
  });
// update
  app.patch('/equipes/:id', async (req, res) => {
      const id =parseInt(req.params.id)
      const replaceEquipe=req.body;
      console.log(replaceEquipe);
       db.collection('equipe').replaceOne({id},replaceEquipe);
      res.status(200).send('success update');
   
  });
  
