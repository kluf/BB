module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: 'app/**/*.js',
        tasks: ['browserify'],
        options: {
          interrupt: true
        }
      },
      templates: {
        files: 'app/**/*.jade',
        tasks: ['jade'],
        options: {
          interrupt: true
        }
      },
    },

    jade: {
      compile: {
        options: {
          namespace: false,
          wrap: true,
        },
        files: {
          "app/templates/compiledTemplates.js": ["app/templates/join.jade", "app/templates/havbar.jade"]
        }
      }
    },

    browserify: {
      options: {
        debug: true,
        aliasMappings: [
          {
            cwd: 'app/',
            src: ['**/*.js'],
            dest: 'app/'
          }
        ]
      },
      app: {
        src: [ 'app/**/*.js' ],
        dest: 'static/bundle.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('runFrontend', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['server.js'],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("nodemon quit"));
    });
  });

  grunt.registerTask('runAPI', function () {
    grunt.util.spawn({
      cmd: 'node',
      args: ['api.js'],
      opts: {
        stdio: 'inherit'
      }
    }, function () {
      grunt.fail.fatal(new Error("nodemon quit"));
    });
  });


  grunt.registerTask('compile', ['jade', 'browserify']);

  // Run the server and watch for file changes
  grunt.registerTask('server', ['compile', 'runFrontend', 'runAPI', 'watch']);

  // Default task(s).
  grunt.registerTask('default', ['compile']);

};