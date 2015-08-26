import express from 'express'
import check from './src/check'
import notify from './src/notify'

let app = express()
let switchState = 0
let tick = () => {
  check((err, state) => {
    console.log(state)
    switchState = state
    notify(err, state)
  })
}

tick()
setInterval(tick, 600000)

app.get('/state', (req, res) => res.json(switchState))
app.post('/state/:state', (req, res) => {
  notify(null, req.params.state, (err, result) => res.json(result))
})

app.listen(9999)
