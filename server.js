const express = require('express');
const routes = require('./src/routes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('/api to use the api');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});