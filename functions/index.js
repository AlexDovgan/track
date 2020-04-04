const functions = require('firebase-functions');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');
var express = require('express');
const uuidv1 = require('uuid/v1');
const file = require('fs');
const util = require('util');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');

var app = express();
const cors = require('cors')
admin.initializeApp();
//functions.config().firebase
app.use(express.json()); // for parsing application/json
app.use(cors({ origin: true }));

app.post('/uplink', async function (req, res, next) {
  let db = admin.firestore();
  console.log(req.body);
  //if (req.body.payload_fields.lat !== 0 && req.body.payload_fields.long !== 0) {
    await db.collection("history").add(req.body);
    await db.collection("last_data").doc(req.body.dev_id).set(req.body);
  //}
  res.json({ result: true });
});
app.post('/plate', async function (req, res, next) {
  console.log(req.body);
});


app.get('/screenshot', async (req, res) => {
  const url = req.query.url;
  const width = parseInt(req.query.width);
  const height =  parseInt(req.query.height);



  if (!url) {
    return res.send('Please provide URL as GET parameter, for example: <a href="?url=https://example.com">?url=https://example.com</a>');
  }
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({
    width:width,
    height:height
  });

  await page.goto(url);
  const imageBuffer = await page.screenshot();
  await browser.close();
  const tempFileInPath = path.join(os.tmpdir(), uuidv1() + ".png");
  const tempFileOutPath = path.join(os.tmpdir(), uuidv1() + ".bmp");

  const writeFile = util.promisify(file.writeFile);

  await writeFile(tempFileInPath, imageBuffer, 'binary');

  await spawn('convert', [tempFileInPath,
    '-depth',
    '4',
    '-compress',
    'RLE',
    '-type',
    'palette',
    'BMP3:' + tempFileOutPath]);

  // await spawn('convert', [tempFileInPath,
  //     "-dither",
  //      "FloydSteinberg",
  //      "-remap",
  //      "pattern:gray50",
  //      'BMP3:' + tempFileOutPath]);

  res.set('Content-Type', 'image/bmb');
  //file.createReadStream(tempFilePath).pipe(response)
  res.download(tempFileOutPath,"screenshot.bmp");

});

exports.api = functions.https.onRequest(app);


