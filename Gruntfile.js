module.exports = function (grunt) {

    grunt.initConfig({

        sass: {
            options: {
                style: 'compressed',
                precision: 5
            },
            all: {
                files: {
                    'public/stylesheets/style.css': 'sass/style.scss'
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

};