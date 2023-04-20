
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './router';
import cors from 'cors'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const clientPath = __dirname + '../client';
const PORT = 3002;

// app.use(express.static(conf.clientPath));

app.use(cors())
app.use(express.static(clientPath));

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`); // eslint-disable-line no-console
});
