const useSet = require("./useSet");
const client = require("../redis");

test("set async redis", async () => {
  expect(
    await useSet(
      "prova",
      {
        prova: "prova",
      },
      client,
      "never"
    )
  ).toBe("OK");
});
