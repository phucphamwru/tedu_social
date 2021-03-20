import express from 'express';

const port = process.env.POST || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello ...");
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
});

