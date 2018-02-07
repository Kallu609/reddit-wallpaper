const config = {
    // List of allowed domains for wallpapers
    "domains": ["i.imgur.com", "imgur.com", "i.redd.it"],

    // List of allowed file-types
    "types": ["png", "jpg", "jpeg"],
    
    // List of subreddits to get wallpapers from
    "subreddits": ["earthporn", "wallpapers"],

    // Sort
    "sort": "top",

    // Timeframe of posts to get
    "from": "year",

    // Limit of posts to get (Your wallpaper will be chosen randomly)
    "limit": 15
}

module.exports = config;