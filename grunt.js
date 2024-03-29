/*global config:true, task:true, node:true*/
config.init({
  pkg: '<json:package.json>',
  meta: {
    banner: ''
  },
  concat: {
    'dist/jquery.nexttslideshow.js': ['src/intro.js', 'src/nextt-slideshow.js', 'src/outro.js']
  },
  min: {
    'dist/jquery.nexttslideshow.min.js': ['dist/jquery.nexttslideshow.js']
  },
  lint: {
    files: ['src/nextt-slideshow.js']
  },
  watch: {
    files: ['grunt.js', 'src/**/*.js', 'specs/**/*.js'],
    tasks: 'jasmine'
  },
  jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      immed: true,
      latedef: true,
      newcap: true,
      noarg: true,
      sub: true,
      undef: true,
      eqnull: true,
      browser: true
    },
    globals: {
      jQuery: true,
      $: true
    }
  },
  uglify: {}
});

task.registerTask('jasmine', 'Runs jasmine specs', function (data, name) {
  
  global.jasmine = require('jasmine-node');
  for(var key in jasmine) {
      global[key] = jasmine[key];
  }

  var jasmineJquery = require("jasmine-jquery");
  global.window = require('jsdom').jsdom().createWindow();
  global.jQuery = global.$ = require("jquery");
  
  //set fixtures paths
  jasmine.getFixtures().fixturesPath = __dirname + '/fixtures';

  jasmine.executeSpecsInFolder(__dirname + '/specs', function(runner) {
    return !runner.results().failedCount;
  }, true, true);

});

// Default task.
task.registerTask('default', 'lint concat min jasmine');
