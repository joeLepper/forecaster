import express from 'express'
import check from './src/check'
import notify from './src/notify'

let app = express()
let switchState = 0
let forecast = {}
let tick = () => {
  check((err, state, data) => {
    console.log(state)
    switchState = state
    forecast = data
    notify(err, state)
  })
}

tick()
setInterval(tick, 600000)

app.get('/forecast', (req, res) => res.json(forecast))
app.get('/state', (req, res) => res.json(switchState))
app.post('/state/:state', (req, res) => {
  notify(null, req.params.state, (err, result) => res.json(result))
})

app.listen(9999)
