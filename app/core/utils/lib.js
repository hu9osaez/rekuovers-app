// Taken from https://github.com/feross/run-series
// Modified to work with React Native

module.exports.runSeries = function(tasks, cb) {
  let current = 0;
  let results = [];
  let isSync = true;

  function done(err) {
    function end() {
      if (cb) cb(err, results);
    }
    if (isSync)
      setImmediate(end); // process.nextTick(end) --> setImmediate(end)
    else end();
  }

  function each(err, result) {
    results.push(result);
    if (++current >= tasks.length || err) done(err);
    else tasks[current](each);
  }

  if (tasks.length > 0) tasks[0](each);
  else done(null);

  isSync = false;
};
