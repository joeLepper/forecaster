const key = '9ba2533f17f17f518c65453e9cf5e122'
const lat = 45.5653940
const lng = -122.6928590
const fmtStr = 'MM-DD-YYYY HH:mm'

let F = require('forecast.io')
let forecast = new F({ APIKey: key })
let moment = require('moment')
let args = require('yargs').argv
let temp = args.threshold || 67
let within = args.within || 2

export default (thresholds, cb) => {
  if (typeof thresholds === 'function') {
    cb = thresholds
    thresholds = {}
  }
  thresholds.temp = thresholds.temp || temp
  thresholds.within = thresholds.within || within
  forecast.get(lat, lng, (err, res, data) => {
    if (err) throw new Error(err)
    let result = data.hourly.data
      .filter((_, i) => i < +thresholds.within)
      .some((d) => {
        console.log(+d.temperature, +thresholds.temp, +d.temperature < +thresholds.temp)
        return +d.temperature < +thresholds.temp
      })
    cb(err, result ? 1 : 0)
  })
}
