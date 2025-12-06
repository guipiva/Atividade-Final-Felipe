const express = require('express');
const router = express.Router();


let items = [
  { id: 1, name: 'Smartphone Samsung', description: 'Smartphone Android 128GB, 8GB RAM', price: 2599 },
  { id: 2, name: 'Fone Bluetooth', description: 'Fone de ouvido Bluetooth com cancelamento de ruído', price: 299 },
  { id: 3, name: 'Cadeira Ergonômica', description: 'Cadeira escritório com suporte lombar', price: 899 },
  { id: 4, name: 'Webcam Full HD', description: 'Webcam 1080p com microfone integrado', price: 219 },
  { id: 5, name: 'SSD NVMe 1TB', description: 'SSD NVMe de alta velocidade 1TB', price: 649 }
];

router.get('/items', (req, res) => res.json(items));

router.get('/items/:id', (req, res) => {
  const it = items.find(i => i.id === Number(req.params.id));
  if (!it) return res.status(404).json({ message: 'Not found' });
  res.json(it);
});

router.post('/items', (req, res) => {
  const id = items.length ? items.at(-1).id + 1 : 1;
  const item = { id, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

router.put('/items/:id', (req, res) => {
  const idx = items.findIndex(i => i.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  items[idx] = { ...items[idx], ...req.body };
  res.json(items[idx]);
});

router.delete('/items/:id', (req, res) => {
  items = items.filter(i => i.id !== Number(req.params.id));
  res.status(204).send();
});

module.exports = router;
