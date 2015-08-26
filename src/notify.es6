import wemo from 'wemo'

export default (err, state, cb) => {
  let client = wemo.Search()

  client.on('found', (device) => {
    let wSwitch = new wemo(device.id, device.port)
    wSwitch.setBinaryState(state, (err, result) => {
      if (err) console.error(err)
      client.exit()
      if (cb) cb(err, result)
    })
  })
}
