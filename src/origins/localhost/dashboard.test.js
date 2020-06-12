const session = require("./auth");

beforeEach(async () => {
    const response = await session.createSession();
    if (response.failed) {
        throw new Error("Login Failed in dashboard.test.js");
    }
});

afterEach(async () => {
    const response = await session.endSesssion();
    if (response.failed) {
        throw new Error("Logout Failed in dashboard.test.js");
    }
});

it("Dashboard should respond with loggedIn user data", async (done) => {
    session
        .request()
        .auth()
        .get("user")
        .set("Accept", "application/json")
        .expect(200)
        .then((response) => {
            expect(response.body).toBeTruthy();
            expect(response.body.msg).toBe("You username is vineet");
            done();
        });
});
