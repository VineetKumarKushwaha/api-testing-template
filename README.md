# API Testing template

## Support

-   Authentication with custom and default header
-   Support of cookie authentication on the fly
-   Docker based so can be easily setup with any CI tool

### Pendings

-   Docker optimization
-   Code refactoring
-   add standard auth bearer based authentication

### How to use

-   env.json

            Here you can specify multiple domains/origins. It can be very useful when your services runnning on multiple port or origins.

            Schema

            ```
            {
                "variables": {
                    "somevariablename": {
                        "origin": "http://localhost:7000/",
                        "username": "somewthing",
                        "password": "password",
                        "authenticationRequired": true,
                        "loginApi": "login",
                        "logoutApi": "logout"
                    },
                    "restapiexample": {
                        "origin": "http://dummy.restapiexample.com/",
                        "authenticationRequired": false
                    },
                    "jsonplaceholder": {
                        "origin": "https://jsonplaceholder.typicode.com/",
                        "authenticationRequired": false
                    }
                }
            }
            ```
            Here direct keys under variables will be attached to global variable can be available to the module.

*   # Folder and Files

    ### src

    -   ### origins

        -   ### modulename:-

                This will be your respective origin folder and below are the common snippets

            -   index.js

                ```
                    // Export the same string mentioned in the Env variable section under respective modules.
                    // As we have used key "somevariablename" for this module where we check test cases of http://localhost:7000/ api
                    module.exports = "somevariablename"; // Replace with the same key mentioned in the env.json

                    /**
                    *{
                            variables: {
                                localhost: {
                                    origin: "http://localhost:7000/",
                                    authenticationRequired: true,
                                    username: "some",
                                    password: "some"
                                }
                            }
                        }
                    */

                ```

            -   auth.js

                ```
                    const ModuleKey = require("./index");
                    const sessionUtils = require("../../utils/index");

                    module.exports = sessionUtils(ModuleKey);

                ```

            -   \*.test.js :- Create different test files for different end point of the module- example http://localhost:7000/ (Test all the API which are hosted on http://localhost:7000/ likewise you can do for other domains/origins if needed)

    -   utils - Generic things so should not be changed

-   # Install dependency

*   `nvm use`
*   `npm i`

-   # How to run

*   ### For normal mode
    `npm run test`
*   ### For Watch mode
    `npm run test:watch`
*   ### For Dev mode Docker
    `npm run test:dev`
*   ### For Prod mode Docker
    `npm run test:ci`
