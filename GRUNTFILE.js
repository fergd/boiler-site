module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        // Define paths.
        paths: {
            sass: 'styles/sass',
            devCSS: 'styles/css',
            prodCSS: 'styles/deploy/styles',
        }, // paths

        connect: {
            uses_defaults: {}
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
        }, // sass

        watch: {
            options: {
                livereload: true,
                host: 'localhost',
                port: 8000
            },
            site: {
                files: ['**/*.html', 'js/**/*.{js,json}', 'styles/css/*.css', 'images/**/*.{png,jpg,jpeg,gif,webp,svg}']
            },
            js: {
                files: ['scripts/*.js'],
                tasks: ["uglify"]
            },
            // sass: {
            //   files: ['styles/sass/*.sass'],
            //   tasks: ['sass']
            // },
            css: {
                files: ["styles/sass/**/*.scss"],
                tasks: ["sass"]
            },

        }, // watch

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'dest/output.min.js': ['scripts/plugins.js']
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({ browsers: ['last 1 version'] })
                ]
            },
            dist: {
                src: 'styles/css/*.css'
            }
        },
        grunticon: {
            myIcons: {
                files: [{
                    expand: true,
                    cwd: 'images/source',
                    src: ['*.svg', '*.png'],
                    dest: "example/output"
                }],
                options: {
                  cssprefix: ".icon-",
                  defaultWidth: "32px"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-grunticon');

    // grunt command
    grunt.registerTask("default", ["connect", "sass", "postcss", "grunticon:myIcons", "watch"]);
    grunt.registerTask("compile", ["uglify"]);
};
