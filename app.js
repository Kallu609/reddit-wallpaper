const config    = require('./config.js');
const fs        = require('fs');
const path      = require('path');
const ratio     = require('aspect-ratio');
const request   = require('request-promise');
const shortid   = require('shortid');
const wallpaper = require('wallpaper');

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function buildUrl() {
  return `https://www.reddit.com/r/${pickRandom(config.subreddits)}/${config.sort}.json?t=${config.from}&limit=${config.limit}`;
}

function download(uri, filename, callback) {
  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
}

async function changeWallpaper() {
  const htmlString = await request(buildUrl());
  const json = JSON.parse(htmlString);

  const images = json.data.children.map(submission => {
    const width  = submission.data.preview.images[0].source.width;
    const height = submission.data.preview.images[0].source.height;

    if (submission.data.post_hint === 'image' && width >= config.minSize.width && height >= config.minSize.height && config.aspectRatios.includes(ratio(width, height))) {
      return {
        url:       submission.data.url,
        ext:       submission.data.url.split('.').pop(),
        domain:    submission.data.domain,
        subreddit: submission.data.subreddit,
        width:     width,
        height:    height,
      };
    }
  }).filter(submission => {
    if (submission) {
      return config.domains.includes(submission.domain);
    }
  });

  if (images.length === 0) {
    changeWallpaper();
    return;
  }

  const randomImage = pickRandom(images);
  const targetPath = path.join('wallpapers', (shortid.generate() + '.' + randomImage.ext));
    
  download(randomImage.url, targetPath, () => {
    wallpaper.set(targetPath, { scale: config.scale }).then(() => {
      console.log(`Wallpaper set to '${targetPath}' from subreddit '/r/${randomImage.subreddit}'`)
    });
  });
}

changeWallpaper();
setInterval(changeWallpaper, config.interval);