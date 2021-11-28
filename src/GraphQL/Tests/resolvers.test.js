const { gql } = require("apollo-server-express");
const {
  testClient,
  connectToDb,
  dropTestDb,
  closeDbConnection,
} = require("./init");
const { ObjectId } = require("mongodb");

const firebaseCompanyJwt =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgwNTg1Zjk5MjExMmZmODgxMTEzOTlhMzY5NzU2MTc1YWExYjRjZjkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiY29tcGFueSIsImNvbXBhbnkiOnRydWUsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9maXItZGVtby03ODg0ZCIsImF1ZCI6ImZpci1kZW1vLTc4ODRkIiwiYXV0aF90aW1lIjoxNjM3ODc3MDM4LCJ1c2VyX2lkIjoiY2E4MzRJQUptQWN6eWN1azBHeEliOWcyZkg2MyIsInN1YiI6ImNhODM0SUFKbUFjenljdWswR3hJYjlnMmZINjMiLCJpYXQiOjE2MzgxMDI2ODUsImV4cCI6MTYzODEwNjI4NSwiZW1haWwiOiJuaWNvbG8ubWVybGluaUBzdHVkZW50aS51bmlwci5pdCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJuaWNvbG8ubWVybGluaUBzdHVkZW50aS51bmlwci5pdCJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.BvyyUfG8adHmGmOPCywJtBPJzldCwwCUTmcV3NT7X-B6ZQZzFNQN2deOLxiHeSwIqKSjfpeQmhG6k8SYv8ligiH5ux0ZNe09Kia44xnWWQkcS5rfNNoQiqtp3jgcNT1jYJKOfz2LogGsg2XYTWKlJjugUh3yOTg_9ahIWqoSJcKZz9SPHhwTtEqk9L9h17YST4PguoidSjHpe1HIUgF7hWNOubLJ87YaWJkOSE199nTFnlSlLFrdyM4dqgTyUeYvXkeK2GA__LgtB_aCAxRCgTom9GJ4PdEWLVGo85mV7p8gEZllz8pgKlGnaFcn8U2jCIQvqCskoYopig5JjWQ63w";

const { query, mutate } = testClient;

beforeAll(async () => {
  await connectToDb();
  //await dropTestDb()
});

afterAll(async () => {
  //await dropTestDb()
  await closeDbConnection();
});

describe("graphql resolvers", () => {
  const shopID = "612fd2dfc52d2e002bf6d5e2";
  var shop = {};

  it("get a single shop", async () => {
    const GET_SHOP = gql`
      query shop($id: ID!) {
        shop(id: $id) {
          _id
        }
      }
    `;
    const { data } = await query({
      mutation: GET_SHOP,
      variables: {
        id: shopID,
      },
    });

    //console.log(data);

    shop = data.shop;

    expect(data).toEqual({
      shop,
    });
  });

  it("create a shop", async () => {
    const CREATE_SHOP = gql`
      mutation createShop($input: shopInput!) {
        createShop(input: $input)
      }
    `;

    const { data } = await mutate({
      mutation: CREATE_SHOP,
      variables: {
        input: {
          name: "macelleria pucci 10",
          address: "via cavour 41",
          categories: ["panetteria"],
          openDays: "1_2_3_4_5_6_7",
          image: "https://immagineprova",
          openHours: "08.00_20.00",
          orderHours: "08.00_20.00",
          pickUpHours: "08.00_20.00",
          isActive: true,
          phone: "3711959427",
          location: {
            type: "Point",
            coordinates: [42.562309, 12.64576],
          },
          cashbackInfo: {
            cashBack: 10,
            fee: 5,
            minPayment: 3,
          },
          firebaseID: "YQx1P1181rQN69w7HIgHRyB0mkl2",
        },
      },
    });

    expect(data).toEqual({ createShop: true });
  });
});
