# async-by-page

When you need to operate on a list of things, but you can only get 1 page at a time.

This might already exist, but it's something I've had to do a few times recently so it's time to make a lib.

## Usage

```js
const byPage = require('async-by-page')

byPage(fetchNextPage, (item, next) => {
  // Let's say we only want to operate on items
  // that have a certain flag set. We can just call `next()`
  // with no args to skip.
  if (item.isSubscribedToNewsletter) { return next() }

  // For the others, we can perform an action (like sending an email)
  // and then call `next()` when it's done.
  sendEmail(item, next)
})

// Here we define out "fetch next page" function, that is called from `async-by-page`.
// It takes a single callback argument. If the callback is called with an error,
// the iteration terminates.
//
// The main thing to know with this function is that it is stateful.
// It should keep track of its own state, and return the next page of results
// each time it is called.

let page = 1
function fetchNextBatch (cb) {
  getLeadsBatch(page, (err, res) => {
    page += 1
    return cb(err, res)
  })
}
```

## Can I use it? Is it stable?

Not really :) I'm going to be trying a few different things first, and adding a couple of extra features (eg. option for running in parallel VS series). But your feedback is still welcome. I'd also like to write an implementation with pull-streams because I think it would be a very useful comparison (and probs much cleaner too!).
