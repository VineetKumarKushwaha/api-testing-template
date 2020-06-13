const supertest = require("supertest");
const config = require("../../env.json");

if (!config) throw new Error("env.json is missing at root level");
const allVariables = config.variables;
Object.keys(allVariables).forEach((variable) => {
    const originInfo = allVariables[variable];
    if (!(originInfo && typeof originInfo.origin === "string")) {
        throw new Error(
            `
                variables object is invalid in env*.json. Invalid entry for ${variable} variable!!
                Env Format::-
                {
                    variables: {
                        [name]: {
                            origin: string,
                            authenticationRequired: boolean,
                            username: string, //Incase authentication flag is true
                            password: string //Incase authentication flag is true
                        }
                    }
                }
            `
        );
    }
    if (
        originInfo.authenticationRequired &&
        !(originInfo.username && originInfo.password)
    ) {
        throw new Error(
            `
                Both Username and password are required when authenticationRequired is true.
                Not found username/password for ${variable} variable!!
                Env Format::-
                {
                    variables: {
                        [name]: {
                            origin: string,
                            authenticationRequired: boolean,
                            username: string, //Incase authentication flag is true
                            password: string //Incase authentication flag is true
                        }
                    }
                }
            `
        );
    }
    global[variable] = {
        request: supertest.agent(originInfo.origin),
        username: originInfo.username,
        password: originInfo.password,
        loginApi: originInfo.loginApi,
        logoutApi: originInfo.logoutApi,
        variable
    };
});
