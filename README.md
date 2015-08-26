Forecaster
==========

A system for keeping the chickens warm.

Chickens don't always lay eggs. Unless they're warm. So let's keep them warm. Forecaster checks the forecast.io API every ten minutes and runs through the hourly forecast to see if the temperature at my house will drop below a configurable threshold within a configurable number of hours.

If the temperature _is_ going to be below that threshold Forecaster will search the local network for a WeMo switch and flip it on. Otherwise it'll find that same switch and confirm that it's off.

Install
-------

Make sure you've got node (Forecaster runs with v0.10).

- Clone the repo.
- `$ npm i`

Run
---

For testing purposes:

`$ node .`

For forever purposes:

`$ ./node_modules/.bin/forever start index.js`
