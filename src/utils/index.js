const R = require("ramda");

const createSession = async (ModuleConfig, path = "") => {
    if (!ModuleConfig.loginApi) {
        throw new Error(
            `No login Api found in env.json for variable ${ModuleConfig.variable}`
        );
    }

    const requestP = new Promise((resolve) => {
        ModuleConfig.request
            .post(ModuleConfig.loginApi)
            .send({
                username: ModuleConfig.username,
                password: ModuleConfig.password
            })
            .end((err, res) => {
                if (err || res.status !== 200) {
                    return resolve({ failed: true, data: "Failed to login" });
                }
                return resolve({
                    failed: false,
                    data:
                        path === ""
                            ? res.body
                            : R.path(path.split("."), res.body)
                });
            });
    });

    return requestP;
};

const endSesssion = async (ModuleConfig) => {
    if (!ModuleConfig.logoutApi) {
        throw new Error(
            `No logut Api found in env.json for variable ${ModuleConfig.variable}`
        );
    }

    const requestP = new Promise((resolve) => {
        ModuleConfig.request
            .get(ModuleConfig.logoutApi)
            .send()
            .end((err, res) => {
                if (err) return resolve({ failed: true, data: err.text });
                return resolve({ failed: false, data: res.body });
            });
    });

    return requestP;
};

module.exports = (variableKey) => {
    const ModuleConfig = global[variableKey];
    let sessionInfo = null;

    return {
        request: () => {
            ModuleConfig.request.auth = function (cb) {
                let tokenHeader = {};
                if (cb) {
                    tokenHeader = cb(sessionInfo.data.token);
                } else if (sessionInfo) {
                    tokenHeader = { token: sessionInfo.data.token };
                }
                tokenHeader = R.reject((value) => !value)(tokenHeader);
                this.set(tokenHeader);
                return this;
            };

            return ModuleConfig.request;
        },
        createSession: async (path) => {
            if (!sessionInfo) {
                const response = await createSession(ModuleConfig, path);
                if (!response.failed) {
                    sessionInfo = response;
                }
                return response;
            }
        },
        endSesssion: async () => {
            const response = await endSesssion(ModuleConfig);
            if (!response.failed) {
                sessionInfo = null;
            }
            return response;
        }
    };
};
