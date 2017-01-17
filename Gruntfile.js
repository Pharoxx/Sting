module.exports = function(grunt){
	
	require("load-grunt-tasks")(grunt);

	grunt.initConfig({
		sass_globbing: {
			your_traget: {
				files: {
					"styles.sass" : "sass/**/*.*"
				},
				options: {
					useSingleQuotes: true
				}
			}
		},
		sass: {
			options: {
				sourceMap: true,
				sourceComments: false
			},
			dist: {
				files: {
					"styles.css" : "styles.sass"
				}
			}
		},
		autoprefixer: {
			// npm update caniuse-db
			options: {
				browsers: ["last 10 versions", "ie 8", "ie 9"]
			},
			dist: {
				files:{
					"styles.css" : "styles.css"
				}
			}
		},
		cssmin: {
			target: {
				files: {
					"styles.css" : "styles.css"
				}
			}
		},
		concat: {
			dist: {
				src: ["js/jQuery.js", "js/functions.js", "js/disable_scrolling.js", "js/scripts.js"],
				dest: "all_js.js"
			}
		},
		uglify: {
			my_target: {
				files: {
					"all_js.js" : "all_js.js"
				}
			}
		},
		processhtml: {
			options: {
				// Task-specific options go here. 
			},
			your_target: {
				files: {
					"build/index.html" : ["index.html"],
					"build/single.html" : ['single.html'],
					"build/articles.html" : ['articles.html']
				} 
			}
		},
		watch: {
			prod: {
				files: ["*.sass", "**/*.sass", "*.css", "**/*.css"],
				tasks: ["sass_globbing", "sass", "autoprefixer"]
			},
			dev: {
				files: ["*.sass", "**/*.sass"],
				tasks: ["sass_globbing", "sass"]
			}
		},
		browserSync: {
			bsFiles: {
				src : ['*.css', '*.html', '*.js', '**/*.css', '**/*.html', '**/*.js']
			},
			options: {
				watchTask: true,
				server: {
					baseDir: "./"
				}
			}
		}
	});	
	
	grunt.loadNpmTasks("grunt-sass-globbing");
	grunt.loadNpmTasks("grunt-autoprefixer");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-processhtml');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');


	grunt.registerTask("prod", ["sass_globbing", "sass", "autoprefixer", "cssmin", "concat", "uglify", "processhtml"]);
	grunt.registerTask("dev", ["browserSync", "watch:dev"]);

}
