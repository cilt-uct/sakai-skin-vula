'use strict';

// Load Grunt
module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: grunt.file.readJSON('config.json'), // don't keep passwords in source control
    vendor: {
        bootstrap: 'bootstrap-sass/assets',
        fontawesome: 'font-awesome-sass/assets'
    },

    // Tasks
    clean: { // Empties folders to start fresh
      build: {
        files: [{
          dot: true,
          src: [
            'tmp/{,*/}*',
            '.sass-cache/{,*/}*',
          ]
        }]
      }
    },

    sass: { // Begin Sass Plugin
      skin: {
        options: {
          sourcemap: 'none',
          loadPath: [ "<%= vendor.bootstrap %>/stylesheets", "<%= vendor.fontawesome %>/stylesheets"],
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.scss'],
          dest: 'tmp',
          ext: '.css'
        }]
      }
    },

    postcss: { // Begin Post CSS Plugin
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'tmp/' // ...to the specified directory
        },
        processors: [
          require('autoprefixer')
        ]
      },
      dist: {
        src: 'tmp/*.css'
      }
    },

    cssmin: { // Begin CSS Minify Plugin
      target: {
        files: [{
          expand: true,
          cwd: 'tmp',
          src: ['*.css', '!*.min.css'],
          dest: 'tmp',
          ext: '.min.css'
        }]
      }
    },

    watch: { // Compile everything into one task with Watch Plugin
      sass: {
        files: '**/*.scss',
        tasks: [
            'sass',
            'postcss',
            //'cssmin',
            'if'],
        options: {
          livereload: true,
        },
      },
    },

    copy: { // Copy files from src folder to appropriate dest
      dist: {
        files: [
          {expand: true, cwd: "<%= vendor.bootstrap %>/fonts/", src: ['**'], dest: 'tmp/fonts'},
          {expand: true, cwd: "<%= vendor.fontawesome %>/fonts/", src: ['**'], dest: 'tmp/fonts'},
          {expand: true, cwd: 'fonts/', src: ['**'], dest: 'tmp/fonts'},
          {expand: true, cwd: 'js/', src: ['ie/*','lib/*'], dest: 'tmp/js'},
          {expand: true, src: ['images/**'], dest: 'tmp/'},
        ]
      },
      local: {
        files: (function() {
          var l = grunt.file.readJSON('config.json');
          var out = [];
          l.local.dest.forEach(function(element, index) {
             out.push({
                 expand: true,
                 cwd: 'tmp/',
                 src: ['**'],
                 dest: element
             });
          });
          return out;
        })()
      }
    },

    uglify: {
      options: {
        mangle: false,
        uglifyOptions: { ecma: 8 }
      },
      js: {
        files: {
          'tmp/js/morpheus.plugins.min.js': ['js/plugins/*.js'],
          'tmp/js/morpheus.scripts.min.js': ['js/src/*.js']
        }
      }
    },

    sftp: { // Move newly created CSS files to server
      dist: {
        files: {
            "./": "tmp/**"
        },
        options: {
            "path": "<%= app.remote.path %>",
            "host": "<%= app.remote.dest %>",
            "username": "<%= app.remote.username %>",
            "port": "<%= app.remote.port %>",
            "password": "<%= app.remote.password %>",
            "srcBasePath": "tmp/",
            "createDirectories": true
        }
      }
    },

    if: { // If statements to determine where to deploy the files (local/remote)
        local: {
            options: {
                config: 'app.local.do'
            },
            ifTrue: ['copy:local']
        },
        remote: {
            options: {
                config: 'app.remote.do'
            },
            ifTrue: ['sftp']
        }
    }
  });

  if ((grunt.config.get("app").local.do) && (grunt.config.get("app").remote.do)) {

    grunt.log.writeln('Update');

    if (grunt.config.get("app").local.do) {
      grunt.log.writeln('    local: '+ grunt.config.get("app").local.dest);
    }

    if (grunt.config.get("app").remote.do) {
      grunt.log.writeln('    remote: '+ grunt.config.get("app").remote.dest +':'+ grunt.config.get("app").remote.path);
    }
  }

  // Load Grunt plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-if');

  // Register Grunt tasks
  grunt.registerTask('build', [
    'clean:build'
    ,'sass'
    ,'postcss'
    //,'cssmin'
    ,'uglify'
    ,'copy:dist'
  ]);

  grunt.registerTask('default', ['build', 'watch']);
  grunt.registerTask('deploy', ['build', 'if']);
};
