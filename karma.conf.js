/**
 * @file Karma configuration
 * @author harttle<yangjvn@126.com>
 * Generated on Tue Sep 05 2017 13:07:07 GMT+0800 (CST)
 */

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: './',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'requirejs', 'chai-as-promised', 'chai-sinon'],

        // list of files / patterns to load in the browser
        files: [
            'test-main.js',
            {pattern: 'src/**/*.js', included: false},
            {pattern: 'amd_modules/**/*.js', included: false},
            {pattern: 'test/**/*.js', included: false}
        ],

        // list of files to exclude
        exclude: [
            '**/*.swp',
            'amd_modules/**/test/**.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],
        coverageReporter: {
            reporters: [
                {
                    type: 'text-summary'
                }, {
                    type: 'lcov',
                    dir: 'coverage/'
                }
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadless'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
