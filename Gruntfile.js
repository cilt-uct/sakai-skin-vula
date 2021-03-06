'use strict';
module.exports = function(grunt) {

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
    // jshint: {
    //   options: {
    //     jshintrc: '.jshintrc'
    //   },
    //   all: [
    //     'Gruntfile.js',
    //     'assets/js/**/*.js',
    //     '!assets/build/app.min.js'
    //   ]
    // },
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
      local_template: {
        files: (function() {
          var l = grunt.file.readJSON('config.json');
          var out = [];
          l.local.ckeditor.forEach(function(element, index) {
             out.push({
                 expand: true,
                 cwd: 'editor/ckextraplugins/templates',
                 src: ['**'],
                 dest: element
             });
          });
          return out;
        })()
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
    compress: {
        main: {
          options: {
            mode: 'tgz',
            archive: (function() {
                var l = grunt.file.readJSON('config.json');
                return l.tar.skin;
            })()
          },
          files: [
            {expand: true, cwd: 'tmp/', src: ['**/*'], dest: '/'}, // makes all src relative to cwd
          ]
        },
        editor: {
            options: {
                mode: 'tgz',
                archive: (function() {
                    var l = grunt.file.readJSON('config.json');
                    return l.tar.editor;
                })()
            },
            files: [
              {expand: true, cwd: 'editor/ckextraplugins/templates', src: ['**/*'], dest: '/'}, // makes all src relative to cwd
            ]
        }        
    },     
    if: { // If statements to determine where to deploy the files (local/remote)
      local: {
          options: {
              config: 'app.local.do'
          },
          ifTrue: ['copy:local','copy:local_template']
      },
      tar: {
        options: {
            config: 'app.tar.do'
        },
        ifTrue: ['compress:main','compress:editor']
      },
      remote: {
          options: {
              config: 'app.remote.do'
          },
          ifTrue: ['sftp']
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-ssh');
  grunt.loadNpmTasks('grunt-if');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Register Grunt tasks
  grunt.registerTask('build', [
    'clean:build'
    ,'sass'
    ,'postcss'
    //,'cssmin'
    ,'uglify'
    ,'copy:dist'
  ]);
  
  grunt.registerTask('default', ['build', 'if', 'watch']);
  grunt.registerTask('deploy', ['build', 'if']);
};
