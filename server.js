const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const mp4File = req.file.path;
  const mp3File = path.join('uploads', `${req.file.filename}.mp3`);

  ffmpeg(mp4File)
    .output(mp3File)
    .on('end', () => {
      res.download(mp3File, (err) => {
        if (err) {
          console.error('Error downloading file: ', err);
          return res.status(500).send('Error downloading file.');
        }

      
        fs.unlink(mp4File, (err) => {
          if (err) console.error('Error deleting MP4 file: ', err);
        });
        fs.unlink(mp3File, (err) => {
          if (err) console.error('Error deleting MP3 file: ', err);
        });
      });
    })
    .on('error', (err) => {
      console.error('Error converting file: ', err);
      return res.status(500).send('Error converting file.');
    })
    .run();
});

app.listen(3000, () => console.log('Server started on port 3000'));