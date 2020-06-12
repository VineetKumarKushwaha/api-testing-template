const session = require("./auth");

it("Fetch user data", async (done) => {
    session
        .request()
        .get("api/v1/employees")
        .set("Accept", "application/json")
        .expect(200)
        .then((response) => {
            expect(response.body.status).toBe("success");
            expect(Array.isArray(response.body.data)).toBeTruthy();
            done();
        });
});
