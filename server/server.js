const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./db');
const Item = require('./models/Item');

const app = express();
const PORT = 3000;
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.random().toString(36).substring(2, 8);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });


app.post('/upload', upload.single('file'), async (req, res) => {
  const name = req.body.name?.trim();
  const originalFilePath = req.file?.path;

  if (!name) {
    if (originalFilePath) fs.unlinkSync(originalFilePath);
    return res.status(400).json({ message: 'שגיאה: חסר שם לקובץ' });
  }

  const ext = path.extname(req.file.originalname);
  const filePath = `uploads/${name}${ext}`;

  const existsByName = await Item.findOne({ name });
  if (existsByName) {
    if (originalFilePath) fs.unlinkSync(originalFilePath);
    return res.status(400).json({ message: 'שגיאה: שם קובץ כבר קיים!' });
  }

  fs.renameSync(originalFilePath, filePath);

  const newItem = new Item({ name, filePath });
  await newItem.save();

  res.json({ message: '✅ הקובץ הועלה בהצלחה!' });
});

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


