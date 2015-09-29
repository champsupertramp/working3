'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
    'assets/vendor/bootstrap/js/transition.js',
    'assets/vendor/bootstrap/js/alert.js',
    'assets/vendor/bootstrap/js/button.js',
    'assets/vendor/bootstrap/js/carousel.js',
    'assets/vendor/bootstrap/js/collapse.js',
    'assets/vendor/bootstrap/js/dropdown.js',
    'assets/vendor/bootstrap/js/tooltip.js',
    'assets/vendor/bootstrap/js/popover.js',
    'assets/vendor/bootstrap/js/scrollspy.js',
    'assets/vendor/bootstrap/js/tab.js',
    'assets/vendor/bootstrap/js/affix.js',
    'assets/vendor/fitvids/jquery.fitvids.js',
    'assets/vendor/raty/lib/jquery.raty.js',
    'assets/vendor/devbridge-autocomplete/src/jquery.autocomplete.js',
    'assets/vendor/featherlight/src/featherlight.js',
    'assets/vendor/moment/moment.js',
    'assets/vendor/fullcalendar/dist/fullcalendar.js',
    'assets/vendor/jquery.countdown/dist/jquery.countdown.js',
    'assets/vendor/sharrre/jquery.sharrre.js',
    'assets/vendor/formvalidation/dist/js/formValidation.js',
    'assets/vendor/formvalidation/dist/js/framework/bootstrap.js',
    'assets/js/plugins/*.js',
    'assets/js/_*.js'
  ];

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      all: [
        'Gruntfile.js',
        'assets/js/*_.js',
        '!assets/js/scripts.js',
        '!assets/**/*.min.*'
      ]
    },
    less: {
      dev: {
        files: {
          'assets/css/main.css': [
            'assets/less/main.less'
          ],
          'assets/css/tablet.css': [
            'assets/less/tablet.less'
          ],
          'assets/css/mobile.css': [
            'assets/less/mobile.less'
          ],
          'assets/css/insights-and-article-content.css': [
            'assets/less/insights-and-article-content.less'
          ],
          'assets/css/insights-and-article-content-mobile.css': [
            'assets/less/insights-and-article-content-mobile.less'
          ],
          'assets/css/insights-and-article-content-tablet.css': [
            'assets/less/insights-and-article-content-tablet.less'
          ],
          'assets/css/insights-and-article.css': [
            'assets/less/insights-and-article.less'
          ],
          'assets/css/insights-and-article-mobile.css': [
            'assets/less/insights-and-article-mobile.less'
          ],
          'assets/css/insights-and-article-tablet.css': [
            'assets/less/insights-and-article-tablet.less'
          ],
          // home
          'assets/css/home.css': [
            'assets/less/home.less'
          ],
          'assets/css/home_mobile.css': [
            'assets/less/home_mobile.less'
          ],
          'assets/css/home_tablet.css': [
            'assets/less/home_tablet.less'
          ]

        },
        options: {
          compress: false,
          // LESS source map
          // To enable, set sourceMap to true and update sourceMapRootpath based on your install
          sourceMap: true,
          outputSourceFiles: true, // with this param you'll have your less in your map and you can see it
          sourceMapFilename: 'assets/css/main.css.map',
          sourceMapRootpath: 'E:/wamp/www/templates/working-three/'
        }
      },
      build: {
        files: {
          'assets/css/main.min.css': [
            'assets/less/main.less'
          ]
        },
        options: {
          compress: true
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'assets/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'assets/css/'
          }
        },
        src: 'assets/css/main.css'
      },
      build: {
        src: 'assets/css/main.min.css'
      }
    },
    modernizr: {
      build: {
        devFile: 'assets/vendor/modernizr/modernizr.js',
        outputFile: 'assets/js/modernizr.min.js',
        files: {
          'src': [
            ['assets/js/scripts.min.js'],
            ['assets/css/main.min.css']
          ]
        },
        extra: {
          shiv: false
        },
        uglify: true,
        parseFiles: true
      }
    },
    version: {
      default: {
        options: {
          format: true,
          length: 32,
          manifest: 'assets/manifest.json',
          querystring: {
            style: 'roots_css',
            script: 'roots_js'
          }
        },
        files: {
          'assets/index.html': 'assets/{css,js}/{main,scripts}.min.{css,js}'
        }
      }
    },
    watch: {
      less: {
        files: [
          'assets/less/*.less',
          'assets/less/**/*.less'
        ],
       // tasks: ['less:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: true
        },
        files: [
          'assets/css/main.css',
          'assets/js/scripts.js',
          'assets/*.php',
          '*.php'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'jshint',
    'less:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'jshint',
    'less:build',
    'autoprefixer:build',
    'uglify',
    'modernizr',
    'version'
  ]);
};
