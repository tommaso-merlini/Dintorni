const AuthenticateToken = require("./AuthenticateToken");

test("authenticate the token", async () => {
    const matchingTokens = AuthenticateToken("60e1905e68cd2432eca53bbf", "60e1905e68cd2432eca53bbf");
    expect(matchingTokens).toBe(true);
    // const notMatchingTokens = AuthenticateToken("60e1905e68cd2432eca53bbf", "60e1915368cd2432eca53bcd");
    // expect(notMatchingTokens).toThrow(Error); // this must fail becasue the tokens do not match
});

