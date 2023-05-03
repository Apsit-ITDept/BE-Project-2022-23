const { spawn } = require('child_process');
const express = require('express');

const app = express();

app.use(express.json());

app.post('/api/run-python-script', (req, res) => {
  const pythonProcess = spawn('python', ['path/to/python/file.py']);

  pythonProcess.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    res.send(`child process exited with code ${code}`);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});