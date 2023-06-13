
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './router.js';
import cors from 'cors'
import dotenv from 'dotenv';
import passport from 'passport';
import { authRoutes } from './middleware/auth.js';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const clientPath = __dirname + '../client';
const PORT = 3000;

// app.use(express.static(conf.clientPath));

app.use(cors())
app.use(express.static(clientPath));
app.use(passport.initialize());
app.use(express.json());
app.use(router);
app.use('/auth', authRoutes());
app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running at http://localhost:${PORT}`); // eslint-disable-line no-console
});

