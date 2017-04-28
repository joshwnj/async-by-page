const series = require('run-series')

// - fetchFunc: should give you the next page each time its called.
// - opFunc: function which operates on a single item
// - cb: callback for when the entire list is complete, or terminates early on error
function asyncByPage (fetchFunc, operationFunc, cb) {
  fetchFunc((err, items) => {
    // terminate on error
    if (err) { return cb(err) }

    // EOF
    if (!items || !items.length) { return cb() }

    series(items.map(item => operationFunc.bind(null, item)), onOpsComplete)
  })

  function onOpsComplete (err) {
    // terminate on error
    if (err) { return cb(err) }

    // recurse
    return operateOnBatch(fetchFunc, operationFunc, cb)
  }
}
