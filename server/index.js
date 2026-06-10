import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const AUTH_API_URL =
  process.env.AUTH_API_URL ||
  'https://csyibgv5y0.execute-api.eu-north-1.amazonaws.com/api/auth/signin';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API is running' });
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email || username, password }),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch {
    res.status(500).json({ status: 'error', message: 'Authentication service unavailable' });
  }
});

const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));

app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res.status(404).json({ message: 'Not found' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
