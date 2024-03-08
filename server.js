import express from 'express';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  res.status(200);
});
