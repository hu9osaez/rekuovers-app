// Taken from https://github.com/feross/run-parallel
// Modified to work with React Native

module.exports = function (tasks, cb) {
    var results, pending, keys
    var isSync = true

    if (Array.isArray(tasks)) {
        results = []
        pending = tasks.length
    } else {
        keys = Object.keys(tasks)
        results = {}
        pending = keys.length
    }

    function done (err) {
        function end () {
            if (cb) cb(err, results)
            cb = null
        }
        if (isSync) setImmediate(end);  // process.nextTick(end) --> setImmediate(end)
        else end()
    }

    function each (i, err, result) {
        results[i] = result
        if (--pending === 0 || err) {
            done(err)
        }
    }

    if (!pending) {
        // empty
        done(null)
    } else if (keys) {
        // object
        keys.forEach(function (key) {
            tasks[key](function (err, result) { each(key, err, result) })
        })
    } else {
        // array
        tasks.forEach(function (task, i) {
            task(function (err, result) { each(i, err, result) })
        })
    }

    isSync = false
};