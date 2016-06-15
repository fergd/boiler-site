module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        paths: {
            sass: 'app/styles/sass',
            devCSS: 'app/styles/css',
            prodCSS: 'app/styles/deploy/styles',
        }, 
        connect: {
            uses_defaults: {},
            // if your files are not in the root directory, set the dir here
            options: {
                base: 'app'
            }
        },
        sass: {
            global: {
                options: {
                    sourceMap: true,
                    sourceComments: false,
                    outputStyle: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<%= paths.sass %>/',
                    src: ['**/*.scss'],
                    dest: '<%= paths.devCSS %>/',
                    ext: '.css'
                }, ],
            }
        }, 
        watch: {
            options: {
                livereload: true,
                host: 'localhost',
                port: 8000
            },
            site: {
                files: ['**/*.html', 'js/**/*.{js,json}', 'app/styles/css/*.css', 'app/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
            },
            js: {
                files: ['app/scripts/*.js'],
                tasks: ["uglify"]
            },
            css: {
                files: ["app/styles/sass/**/*.scss"],
                tasks: ["sass"]
            },

        },
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'build/scripts/output.min.js': ['scripts/plugins.js']
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('pixrem')(),
                    require('autoprefixer')({ browsers: ['last 1 version'] }),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'app/styles/css/*.css'
            }
        },
        svgmin: {
            dist: {
                options: {
                    plugins: [
                        // Don't remove XML declaration (needed to avoid errors creating PNG on Win 7)
                        { removeXMLProcInst: false }
                    ]
                },
                files: [{
                    expand: true,
                    cwd: 'app/images/svg',
                    src: ['*.svg'],
                    dest: 'app/images/output'
                }]
            }
        },
        grunticon: {
            myIcons: {
                    files: [{
                        expand: true,
                        cwd: 'app/images/svg',
                        src: ['*.svg', '*.png'],
                        dest: "app/images/output"
                    }],
                options: {
                    defaultWidth: "24px",
                    datasvgcss: "../../styles/css/vendors/icons.data.svg.scss",
                    datapngcss: "../../styles/css/vendors/icons.data.png.scss",
                    urlpngcss: "../../styles/css/vendors/icons.fallback.scss",
                    previewhtml: "../../../trash/preview.html",
                    loadersnippet: "../../../trash/grunticon.loader.js"
                    // colors: {
                    //     black: "#000000"
                    // },
                }
            }
        },
        clean: {
            trash: [
                'trash/*.*'
            ],
            cleanStuff: [
                '<%= clean.trash %>',
                'app/images/output',
                'app/styles/css'
            ],
            deployClean: [
                'build/images/svg',
                'build/styles/sass'
            ]
            // javascript: [
            //     // Coffee-generated
            //     'public/scripts/js/',
            //     // uglify-generated
            //     'public/scripts/vendors/plugins.min.js'
            // ],
        },
        copy: {
          build: {
            cwd: 'app',
            src: [ '**' ],
            dest: 'build',
            expand: true
          },
        },

          'gh-pages': {
            options: {
              base: 'build'
            },
            src: '**/*'
          }
   });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask("default", ["connect", "sass",  "postcss", 'svgmin', 'grunticon:myIcons', "watch"]);
    grunt.registerTask("compile", ["uglify"]);

    grunt.registerTask("cleanAll", ['clean']);
    grunt.registerTask("buildAll", ['svgmin', 'grunticon:myIcons', 'sass', 'postcss']);
    grunt.registerTask("icons", ['svgmin', 'grunticon:myIcons']);
    grunt.registerTask("deploy", ['buildAll', 'copy', 'clean:deployClean', 'gh-pages']);
};
