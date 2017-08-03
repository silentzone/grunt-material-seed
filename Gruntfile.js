module.exports = function (grunt) { 
    //任务配置,所有插件的配置信息
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //uglify插件的配置信息(js压缩插件)
        //没有混淆  后面再修改吧  
        uglify: {  
            build: {// 按原文件结构压缩js文件夹内所有JS文件
                 options: { 
                    stripBanners: true,
                    banner: '/*|<%=pkg.name%>-<%=pkg.verson%>.js <%=grunt.template.today("yyyy-mm-dd")%>*/\n',
                    sourceMapRoot: './dist/js/',
                    sourceMap:function(path) { return path.replace('.js',".map")}, 
                    preserveComments: false,  
                    beautify: false,
                    mangle: true,
                    compress: true
                },
                files: [{
                    expand: true,
                    src: ['dist/js/*.js','!dist/js/*.min.js'],//所有js文件
                    // ext:'.js',
                    dest: '/',//输出到此目录下
                    rename: function (dst, src) {
                        // To keep the source js files and make new files as `*.min.js`:
                        // return dst + '/' + src.replace('.js', '.min.js');
                        // Or to override to src: 
                        return   src.replace('.js', '.min.js');
                    }
                }]
            }/*,
             release: {//任务四：合并压缩a.js和b.js
             files: {
             'build/test.min.js': ['src/test.js', 'src/test1.js']
             }
             }*/
        },
        //jshint插件的配置信息(js语法规整校验插件)
        jshint: {
            build: ['Gruntfils.js', 'src/js/*.js','!src/js/*.min.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
 
        //less插件配置
        less: {
            compileCore: {
                options: {
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'boot.css.map',
                  sourceMapFilename: 'dist/css/boot.css.map'
                },
                src: 'src/less/bootstrap.less',
                dest: 'dist/css/boot.css'
            },
            compileCustom: { 
                options: {
                  strictMath: true,
                  sourceMap: true,
                  outputSourceFiles: true,
                  sourceMapURL: 'custom.css.map',
                  sourceMapFilename: 'dist/css/custom.css.map'
                },
                src: 'src/less/custom/index.less',
                dest: 'dist/css/custom.css'
            }

            //默认
            // main: {
            //     expand: true,
            //     src: ['src/less/*.less'],
            //     dest: 'src/dist',
            //     ext: '.css'
            // },
            // dev: {
            //     options: {
            //         compress: true,
            //         yuicompress:false
            //     }
            // }
        },
 
        //css压缩插件
        cssmin: {
            options: {
                // TODO: disable `zeroUnits` optimization once clean-css 3.2 is released
                //    and then simplify the fix for https://github.com/twbs/bootstrap/issues/14837 accordingly
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                sourceMapInlineSources: true,
                advanced: false
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
 
        //watch插件的配置信息(监控js,css文件,如改变自动压缩,语法检查) 
        watch: {
            client: {    //用于监听less文件,当改变时自动编译成css文件
                files: ['src/less/**/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
            clientcss: {    //用于监听css文件,当改变时自动压缩css文件
                files: ['dist/css/*.css'],
                tasks: ['cssmin','cssmin'],
                options: {
                    livereload: true
                }
            },
            // build: {
            //     files: ['src/js/*.js'], // , 
            //     tasks: ['jshint', 'uglify'],
            //     options: {
            //         spawn: false
            //     }
            // },
             livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    '**/*.html',
                    'src/**/*', 
                ]
            }
        },
        // 清理
        clean: {
          dist: 'dist',
        },
        copy: {
            // 拷贝img目录
            img: {expand: true, cwd: 'src/img/', src: '**', dest: 'dist/img/'},
            // 拷贝 plugin 
            plugin: {expand: true, cwd: 'src/plugin/', src: '**', dest: 'dist/plugin/'},
            // less css 不拷贝 统一由less 负责
            // 拷贝 js 
            js : {expand: true, cwd: 'src/js/', src: '**', dest: 'dist/js/'}
        },
         connect: {
            default: {
                options: {
                    port: 9000,
                    open: true,
                    livereload: 35729,
                    // Change this to '0.0.0.0' to access the server from outside
                    hostname: 'localhost'
                },
                server: {
                    options: {
                        port: 9001,
                        base: './'
                    }
                }
            }
        }    
    });
 
 
    //告诉grunt我们将使用插件
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');

  
    
 
    grunt.registerTask('serve', ['clean','jshint','copy', 'less', 'cssmin','uglify','connect','watch']);
    // publish 发布任务 未实现
 
};