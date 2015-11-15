function Newspaper(config){
  this.config = merge(require("./defaultConfig"), config || {})

  this.name = this.config.name
  this.color = this.config.color

  this._prefixQueue = this.config.prefixQueue
  this._actionQueue = this.config.actionQueue

  this.addPrefix = function(newFunc){
    this._prefixQueue.push(newFunc)
  }
  this.addAction = function(newFunc){
    this._actionQueue.push(newFunc)
  }

  this.removePrefix = function(func){
    this._prefixQueue.splice(this._prefixQueue.indexOf(func), 1)
  }
  this.removeAction = function(func){
    this._actionQueue.splice(this._actionQueue.indexOf(func), 1)
  }

  this.config.methods.forEach(function(method){
    Object.defineProperty(this, method, {
      get: function(){
        evaulateQueue.call(this, this._actionQueue, method);
        return console[method].bind(window.console, ...evaulateQueue.call(this, this._prefixQueue, method))
      }.bind(this)
    })
  }, this)


  return this
}

module.exports = Newspaper;

function evaulateQueue(startQueue, method){
  return flatten(startQueue.map(function(step){
    if (Object.prototype.toString.call(step) === "[object Function]") return step.call(this, method)
    return step
  }, this))
}

function flatten(arr){
  if (Object.prototype.toString.call(arr) !== "[object Array]") return arr
  return Array.prototype.concat.apply([], arr.map(flatten))
}

function merge(obj1, obj2){
  for (const p in obj2) {
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor === Object) {
        obj1[p] = merge(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch(e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}
