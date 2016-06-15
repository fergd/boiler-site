module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        paths: {
            sass: 'styles/sass',
            devCSS: 'styles/css',
            prodCSS: 'styles/deploy/styles',
        }, 

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
                src: 'styles/css/*.css'
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
                    cwd: 'images/svg',
                    src: ['*.svg'],
                    dest: 'images/output'
                }]
            }
        },
        grunticon: {
            myIcons: {
                    files: [{
                        expand: true,
                        cwd: 'images/svg',
                        src: ['*.svg', '*.png'],
                        dest: "images/output"
                    }],
                options: {
                    loadersnippet: "grunticon.loader.js",
                    defaultWidth: "24px",
                    datasvgcss: "../../styles/css/vendors/icons.data.svg.scss",
                    datapngcss: "../../styles/css/vendors/icons.data.png.scss",
                    urlpngcss: "../../styles/css/vendors/icons.fallback.scss",
                    previewhtml: "../../trash/preview.html",
                    loadersnippet: "../../trash/grunticon.loader.js"
                    // colors: {
                    //     black: "#000000"
                    // },
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.registerTask("default", ["connect", "sass",  "postcss", 'svgmin', 'grunticon:myIcons', "watch"]);
    grunt.registerTask("compile", ["uglify"]);

    grunt.registerTask("icons", ['svgmin', 'grunticon:myIcons']);
};
