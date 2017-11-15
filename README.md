# maybe-proxy

This maybe monad implemented with a `Proxy`. This monad let's you chain method
calls without relying on a higher order `then`/`chain`/`andThen` function

```javascript
var {Maybe} = require("./index");

function apiRequest() {
  if (Math.random() < 0.5) {
   return {person: {name: 'bobby', projects: [{lang: 'elixir', name: 'brute'}]}};
  } else {
  return {projects: []};
  }
}

var lang = maybePerson.person.projects[0].lang.value
console.log(lang)
```

Use `value` to return the current value. This returns the value or `null`.

`andThen` is still useful if wanting to use a function not implemented on the underlying value:

```javascript
function someOp(value) {
  console.log("Performing some op", value)
}
maybePerson.person.projects.andThen(projects => someOp(projects))
```

Chaining methods together with will always return a new `Maybe`.

```javascript
var maybeProjects = maybePerson.projects
console.log(maybePerson.value) // prints null or value
console.log(maybeProjects.value) // prints null or value

maybeProjects.andThen(value => { // only prints value if value is not null
  console.log(value)
  return value // value must be return if chaining is to continue
}).andThen(v => someOp(v)).andThen(v => someOtherOp(v))
```
