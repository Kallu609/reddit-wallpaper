const config = require('./config.js');
const url = require('url');
const request = require('request-promise');
const requestImageSize = require('request-image-size');
const wallpaper = require('wallpaper');

function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function buildUrl() {
    return `https://www.reddit.com/r/${pickRandom(config.subreddits)}/${config.sort}.json?t=${config.from}&limit=${config.limit}`;
}

const redditUrl = buildUrl();

request(redditUrl)
    .then((htmlString) => {
        const json = JSON.parse(htmlString);

        let urls = json.data.children
            .map(submission => submission.data.url)
            .filter(submission => {
                const host = url.parse(submission).host;
                return config.domains.includes(host);
            });

    })
    .catch((err) => {
        throw err;
    });
    
/*
wallpaper.set('wallpaper.png').then(() => {
	console.log('done');
});
*/