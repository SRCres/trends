module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    paths: {
      app: {
        root: 'app/',
        assets: {
          fonts: 'dist/assets/fonts'
        },
        css: 'app/css/',
        less: 'app/less/',
        js: 'app/js/',
        vendor: 'app/vendor/'
      },
      dist: {
        root: 'dist/',
        assets: {
          fonts: 'dist/assets/fonts'
        },
        css: 'dist/css',
        js: 'dist/js'
      }
    },

    jshint: {
      app: ['<%= paths.app.js %>**/*.js'],
      gruntfile : ['./Gruntfile.js']
    },

    less: {
      dev: {
        options: {
          compress: false
        },
        files: {
          "<%= paths.app.css %>styles.css": [
            "<%= paths.app.less %>styles.less"
          ]
        }
      },
      prod: {
        options: {
          compress: true
        },
        files: {
          "<%= paths.dist.css %>styles.css" : [
            "<%= paths.app.less %>styles.less"
          ]
        }
      }
    },

    requirejs: {
      dev: {
        options: {
          baseUrl: '<%= paths.app.root %>',
          mainConfigFile: '<%= paths.app.root %>config.js',
          name: 'js/initialize',
          include: 'vendor/requirejs/require.js',
          optimize: 'none',
          /*excludeShallow: [
            'application',
            'views/Dashboard/views/Game',
            'models/Games',
            'controllers/appController',
            '../vendors/require-less/less!style/_preguntados'
          ],*/
          out: '<%= paths.app.root %>app.js'
        }
      },
      prod: {
        options: {
          baseUrl: '<%= paths.app.root %>',
          mainConfigFile: '<%= paths.app.root %>config.js',
          include: '<%= paths.app.js %>initialize.js',
          name: '<%= paths.app.vendor %>almond/almond.js',
          out: '<%= paths.dist.root %><%= pkg.name %>.min.js'
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['dev']);

  grunt.registerTask('dev', [
    'jshint:gruntfile',
    'jshint:app',
    'requirejs:dev',
    'less:dev'
  ]);
};