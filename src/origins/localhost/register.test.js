const session = require("./auth");

beforeEach(async () => {
    // await session.createSession();
});

afterEach(async () => {
    // await session.endSesssion();
});

it("Throw error when password is less than 6 digit", async (done) => {
    session
        .request()
        .post("register")
        .send({ username: "nikku", password: "23" })
        .set("Accept", "application/json")
        .expect(400)
        .then((response) => {
            expect(response.body).toBeTruthy();
            expect(response.body.errors[0].msg).toBe(
                "Please enter a valid password. Min Length should be 6 digit"
            );
            done();
        });
});

it("Throw error when user name alredy exisit", async (done) => {
    session
        .request()
        .post("register")
        .send({ username: "vineet", password: "23435345" })
        .set("Accept", "application/json")
        .expect(400)
        .then((response) => {
            expect(response.body).toBeTruthy();
            expect(response.body.msg).toBe("User Already Exists");
            done();
        });
});
