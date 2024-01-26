const express = require('express');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    console.log('No file uploaded');
    return res.status(400).send('No file uploaded.');
  }

  console.log('File uploaded: ', req.file.path);

  const mp4File = req.file.path;
  const mp3File = path.join('uploads', `${req.file.filename}.mp3`);

  console.log('MP4 file: ', mp4File);
  console.log('MP3 file: ', mp3File);

  ffmpeg(mp4File)
    .output(mp3File)
    .on('start', () => {
      console.log('Conversion started');
    })
    .on('error', (err) => {
      console.error('Error occurred during conversion: ', err);
      return res.status(500).send('Error occurred during conversion.');
    })
    .on('end', () => {
      console.log('Conversion ended');
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
    });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});