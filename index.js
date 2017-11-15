function Maybe(value) {
  if (value === null || value === undefined)
    return new Proxy(Nothing, handler)
  else if (typeof value === 'function')
    return new Proxy(value, handler)
  else
    return new Proxy(new MaybeContainer(value), handler)

}

function Nothing() {}
Nothing.andThen = function() {
  return Maybe(null);
}

const handler = {
  get(target, key) {
    if (key === 'value' || key === 'andThen') {
      if (target[key] === undefined)
        return null;
      else
        return target[key]
    } else {
      return target.andThen(value => {
        if (typeof value[key] === 'function'){
          return value[key].bind(value)
        } else {
          return value[key]
        }
      })
    }
  },
  apply(target, thisArg, args) {
    if (target.value !== Nothing) {
      return Maybe(target.apply(thisArg, args))
    } else {
      return Maybe(Nothing)
    }
  },
}


class MaybeContainer {
  constructor(value) {
    this.value = value;
  }

  andThen(fn) {
    if (this.value === Nothing || this.value === null) {
      return Maybe(Nothing)
    } else {
      return Maybe(fn(this.value))
    }
  }
}

module.exports = { Maybe }
