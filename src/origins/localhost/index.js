// Export the same string mentioned in the Env variable section under respective modules.
// As we have used key "somevariablename" for this module where we check test cases of http://localhost:7000/ api
module.exports = "somevariablename";

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
