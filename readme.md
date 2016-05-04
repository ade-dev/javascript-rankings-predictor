## Rankings predictor - JavaScript application

### Summary
A rankings predictor web application for an assumed game. The application enables users to predict results of matches and to see how the rankings table will be updated to reflect the predictions.

The application can be run in a local environment. Clone the directory and click on index.html to start the app

**Technologies used**: JavaScript, JSON, HTML5, CSS3, SASS, Grunt, Jasmine, Git

### Application directory structure

    app/                       --> Application root folder
      css/                     --> CSS folder
        styles.css             --> Default stylesheet compiled from master.scss
      js/                      --> JavaScript folder
        app.js                 --> Main JavaScript file
      sass/                    --> SASS folder
        styles.scss            --> Main SASS file, compiled to styles.css
      index.html               --> Application interface, click to start the app

    test/                      --> Test root folder
      jasmine-2.4.1/           --> Framework modules
      spec/
        predictor-spec.js      --> Test suite
      spec-runner.html         --> Spec runner, click to run tests
