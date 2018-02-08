const config = {
  // List of allowed domains for wallpapers
  domains: ['i.imgur.com', 'imgur.com', 'i.redd.it'],

  // List of allowed file-types
  types: ['png', 'jpg', 'jpeg'],

  // List of subreddits to get wallpapers from
  // 'subreddits': ['wallpapers'],
  subreddits: ['EarthPorn', 'CityPorn', 'SkyPorn', 'WeatherPorn', 'BotanicalPorn', 'LakePorn', 'VillagePorn', 'BeachPorn', 'WaterPorn', 'SpacePorn', 'multiwall', 'wallpapers', 'wallpaper'],

  // Sort
  sort: 'top',

  // Timeframe of posts to get
  from: 'year',

  // Limit of posts to get (Your wallpaper will be chosen randomly)
  limit: 15,

  // Minimum size of image
  minSize: {
    height: 1080,
    width: 0
  },
  
  // Allowed aspect ratios
  aspectRatios: ['16:9'],

  // Scaling method for the wallpaper. Options: fill, fit, stretch, center
  scale: 'fill',

  // How often to change wallpaper (in minutes)
  interval: 60, // Every hour
}

module.exports = config;