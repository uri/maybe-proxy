var {Maybe, Nothing} = require("./index");

function apiRequest() {
  if (Math.random() < 0.5) {
   return {person: {name: 'bobby', projects: [{lang: 'elixir', name: 'brute'}]}};
  } else {
  return {projects: []};
  }
}

function someOp(value) {
  console.log("Performing some op", value)
}

var maybePerson = Maybe(apiRequest());
debugger

var lang = maybePerson.person.projects[0].lang.value
console.log( lang )

// Perform somethign only if value is present
maybePerson.person.projects.andThen(projects => someOp(projects))
