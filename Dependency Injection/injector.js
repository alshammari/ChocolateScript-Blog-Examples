///////////////////////
// Dependency Injector:
///////////////////////
var Injector = function(fn) {
  // Store for dependencies
  //=======================
  this.dependencies = [];

  // Map a string name to a dependency:
  //===================================
  this.map = function(name, dependency) {
    this.dependencies[name] = dependency;
  };

  // Get a mapped dependency:
  //=========================
  this.get = function(dependencyArray) {
    var self = this;
    return dependencyArray.map(function(value) {
        return self.dependencies[value];
    });            
  };

  // Run the code with dependencies:
  //================================
  this.run = function(fn) {
    var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
    var FN_STRING = fn.toString();
    var ARGS = FN_STRING.match(FN_ARGS)[1].split(',');
    ARGS = ARGS.map(function(value) {
      return value.trim();
    });
    fn.apply(fn, this.get(ARGS));
  };

  // Semantic alias for "run" function
  // because dependencies are injected
  // into the argument passed to it.
  //==================================
  this.injectInto = function(fn) {
    return this.run(fn);
  };
};