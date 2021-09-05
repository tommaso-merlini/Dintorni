const useGet = require("./useGet");
const client = require("../redis");

test("get async redis", async () => {
  expect(await useGet("prova", client)).toStrictEqual(
    {
      prova: "prova",
    },
    null
  );
});
