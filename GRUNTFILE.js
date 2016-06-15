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
                    'build/scripts/output.min.js': ['scripts/plugins.js']
                }
            }
        },
        // postcss: {
        //     options: {
        //         map: true,
        //         processors: [
        //             require('autoprefixer')({ browsers: ['last 1 version'] })
        //         ]
        //     },
        //     dist: {
        //         src: 'styles/css/*.css'
        //     }
        // },
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
                }
            }
        },

        // grunticon: {
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: 'images/svg',
        //             src: ['*.svg', '*.png'],
        //             dest: "images"
        //         }],
        //         options: {
        //             datasvgcss: "styles/sass/vendors/icons.data.svg.scss",
        //             datapngcss: "styles/sass/vendors/icons.data.png.scss",
        //             urlpngcss: "styles/sass/vendors/icons.fallback.scss",

        //             previewhtml: "preview.html",

        //             // grunticon loader code snippet filename
        //             loadersnippet: "grunticon.loader.js",

        //             // folder name (within dest) for png output
        //             pngfolder: "../../images/png",

        //             // relative path to fallback PNGs for the generated CSS file
        //             pngpath: "../../../images/png",

        //             // additional CSS to create
        //             customselectors: {
        //                 "*": [".icon-$1::before"]
        //             },

        //             // define which color variables are used
        //             // colors: {
        //             //     black: "#000000",
        //             // },

        //             // Template - to control output CSS
        //             template: "grunticon-template.hbs",
        //             defaultWidth: "24px"
        //         }
        //     }
        // },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'images/svg',
                    src: ['*.svg'],
                    dest: 'images/svg/optimized'
                }]
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-gh-pages');

    // grunt command
    // grunt.registerTask("default", ["connect", "sass", "postcss", "grunticon:myIcons", "watch"]);
    grunt.registerTask("default", ["connect", "sass",  "grunticon", "watch"]);
    grunt.registerTask("compile", ["uglify"]);

    grunt.registerTask("icons", ['svgmin', 'grunticon:myIcons']);
};
