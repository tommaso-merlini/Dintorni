const login = require("./login");
const jwt = require("jsonwebtoken");
require("dotenv").config();

test("login json web token", async () => {
    const id = "60e1915368cd2432eca53bcd"
    const token = login(undefined, {id: id});
    expect(token).not.toBe(null || undefined);    
    tokenVerification = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
    expect(tokenVerification.userId).toBe(id);
});

