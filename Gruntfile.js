'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('vula-skin/package.json'),
    app: grunt.file.readJSON('config.json'),

    skin: {
      root: 'vula-skin',
      target: 'vula-skin/target'
    },

    vendor: {
      bootstrap: 'vula-skin/node_modules/bootstrap-icons/font/fonts',
      fontawesome: 'vula-skin/node_modules/font-awesome/fonts'
    },

    // Clean build output
    clean: {
      build: {
        files: [{
          dot: true,
          src: [
            'tmp/{,*/}*',
            '.sass-cache/{,*/}*',
            '<%= skin.target %>/{,*/}*'
          ]
        }]
      }
    },

    // Compile SCSS → CSS
    sass: {
      skin: {
        files: [{
          expand: true,
          cwd: '<%= skin.root %>/sass',
          src: ['**/*.scss'],
          dest: 'tmp/css',
          ext: '.css'
        }]
      }
    },

    // Autoprefix CSS
    postcss: {
      options: {
        map: {
          inline: false,
          annotation: 'tmp/css'
        },
        processors: [
          require('autoprefixer')
        ]
      },
      dist: {
        src: 'tmp/css/*.css'
      }
    },

    // Copy assets into vula-skin/target
    copy: {
      dist: {
        files: [
          // CSS
          {
            expand: true,
            cwd: 'tmp/css',
            src: ['**/*.css', '**/*.map'],
            dest: '<%= skin.target %>/css'
          },

          // Fonts
          {
            expand: true,
            cwd: '<%= vendor.bootstrap %>',
            src: ['**/*'],
            dest: '<%= skin.target %>/fonts'
          },
          {
            expand: true,
            cwd: '<%= vendor.fontawesome %>',
            src: ['**/*'],
            dest: '<%= skin.target %>/fonts'
          },

          // Images
          {
            expand: true,
            cwd: '<%= skin.root %>/images',
            src: ['**/*'],
            dest: '<%= skin.target %>/images'
          }
        ]
      },

      // Deploy to local Sakai installs
      local: {
        files: (function () {
          var l = grunt.file.readJSON('config.json');
          var out = [];

          l.local.dest.forEach(function (dest) {
            out.push({
              expand: true,
              cwd: '<%= skin.target %>/',
              src: ['**/*'],
              dest: dest
            });
          });

          return out;
        })()
      }
    },

    // Create tarball
    compress: {
      skin: {
        options: {
          mode: 'tgz',
          archive: '<%= app.tar.skin %>'
        },
        files: [
          {
            expand: true,
            cwd: '<%= skin.target %>/',
            src: ['**/*'],
            dest: '/'
          }
        ]
      }
    },

    // Conditional execution
    if: {
      local: {
        options: { config: 'app.local.do' },
        ifTrue: ['copy:local']
      },
      tar: {
        options: { config: 'app.tar.do' },
        ifTrue: ['compress:skin']
      }
    },

    // Watch for development
    watch: {
      skin: {
        files: [
          '<%= skin.root %>/sass/**/*.scss',
          '<%= skin.root %>/images/**/*'
        ],
        tasks: ['build', 'if'],
        options: {
          livereload: true
        }
      }
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-if');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Tasks
  grunt.registerTask('build', [
    'clean:build',
    'sass',
    'postcss',
    'copy:dist'
  ]);

  grunt.registerTask('default', ['build', 'if', 'watch']);
  grunt.registerTask('deploy', ['build', 'if']);
};
