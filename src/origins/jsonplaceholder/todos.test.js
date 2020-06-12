const session = require("./auth");

it("Fetch todos", async (done) => {
    session
        .request()
        .get("todos/1")
        .set("Accept", "application/json")
        .expect(200)
        .then((response) => {
            expect(response.body.id).toBe(1);
            expect(response.body.title).toBe("delectus aut autem");
            expect(response.body.completed).toBe(false);
            done();
        });
});
