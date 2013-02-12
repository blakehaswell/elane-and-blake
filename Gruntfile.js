module.exports = function (grunt) {

    grunt.initConfig({

        sass: {
            options: {
                style: 'compressed',
                precision: 5,
                require: 'sass-globbing'
            },
            all: {
                files: {
                    'public/stylesheets/app.css': 'sass/app.scss'
                }
            }
        },

        watch: {
            sass: {
                files: 'sass/*/**.scss',
                tasks: 'sass'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

};