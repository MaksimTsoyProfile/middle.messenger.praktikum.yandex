import express from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

const distPath = path.join(process.cwd(), 'dist');

app.use(express.static(path.join(distPath)));

app.get('/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
  res.status(200);
});

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});
