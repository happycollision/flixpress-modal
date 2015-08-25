'use strict';
module.exports = function (grunt) {
  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed MIT */\n',
    // Task configuration.
    clean: {
      files: ['dist', '.tmp']
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:9000/test/<%= pkg.name %>.html']
        }
      }
    },
    sass: {
      options: {
        sourcemap: 'none',
        compass: true,
        /*require: ['susy','breakpoint'],
        bundleExec: true*/
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['**.{scss,sass}'],
          dest: '.tmp',
          ext: '.css'
        }]
      }
    },
    postcss: {
      dist: {
        options: {
          processors: [
            require('autoprefixer-core')({browsers: '> 0.05%'})
          ],
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['.tmp/*.css'],
          dest: 'dist/'
        }]
      },
      distmin: {
        options: {
          processors: [
            require('autoprefixer-core')({browsers: '> 0.05%'}),
            require('csswring')
          ],
        },
        files: [{
          expand: true,
          flatten: true,
          src: '.tmp/*.css',
          dest: 'dist/',
          ext: '.min.css'
        }]
      },
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint', 'concat', 'uglify']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
      sass: {
        files: 'src/*.sass',
        tasks: ['css']
      },
      livereload: {
        options: {
          livereload: '<%= connect.dev.options.livereload %>'
        },
        files: ['demo/**/*', 'dist/**/*']
      }
    },
    connect: {
      options: {
        hostname: '*',
        port: 9000
      },
      server: {},
      dev: {
        options: {
          livereload: 35728,
          open: {
            target: 'http://localhost:9000/',
            appName: 'google chrome'
          }
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', /*'connect:server', 'qunit',*/ 'clean', 'concat', 'uglify', 'css']);
  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });
  grunt.registerTask('css', ['sass', 'postcss']);
  grunt.registerTask('serve', ['default', 'connect:dev', 'watch']);
  grunt.registerTask('test', ['jshint', 'connect', 'qunit']);
};
