// Example of using Amazon Polly with JavaScript
const AWS = require('aws-sdk');
const polly = new AWS.Polly();

const params = {
  Text: 'ChatGPT is a great model',
  OutputFormat: 'mp3',
  VoiceId: 'Joanna' // Specify the voice to use
};

polly.synthesizeSpeech(params, function(err, data) {
  if (err) console.log(err, err.stack);
  else {
    const audio = new Audio(URL.createObjectURL(new Blob([data.AudioStream])));
    audio.play();
  }
});
