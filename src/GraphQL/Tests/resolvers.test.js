const { gql } = require("apollo-server-express");
const {
  testClient,
  connectToDb,
  dropTestDb,
  closeDbConnection,
} = require("./init");
const { ObjectId } = require("mongodb");
const shopByFirebaseID = require("../Functions/Queries/Company/shopByFirebaseID");

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

jest.useRealTimers();

describe("graphql resolvers", () => {
  var shopID = "";
  var firebaseShopID = "";

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
          isActive: false,
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

    shopID = data.createShop;

    expect(data.createShop).not.toBeNull();
  });

  it("activate a shop", async () => {
    const ACTIVATE_SHOP = gql`
      mutation activateShop($id: ID!) {
        activateShop(id: $id)
      }
    `;

    const { data } = await mutate({
      mutation: ACTIVATE_SHOP,
      variables: {
        id: shopID,
      },
    });

    expect(data.activateShop).toBe(true);
  });

  it("get a single shop", async () => {
    const GET_SHOP = gql`
      query shop($id: ID!) {
        shop(id: $id) {
          _id
          categories
          name
          address
          openDays
          image
          openHours
          orderHours
          pickUpHours
          isActive
          phone
          location {
            type
            coordinates
          }
          firebaseID
          favourites
          likes
          email
        }
      }
    `;
    const { data } = await query({
      mutation: GET_SHOP,
      variables: {
        id: shopID,
      },
    });

    firebaseShopID = data.shop.firebaseID;

    expect(data.shop).not.toBeNull();
  });

  it("get close shops", async () => {
    const GET_SHOP_CLOSE_SHOPS = gql`
      query closeShops(
        $location: locationInput!
        $category: String
        $cashBack: Int
        $range: Int!
        $limit: Int!
        $offset: Int!
      ) {
        closeShops(
          location: $location
          category: $category
          cashBack: $cashBack
          range: $range
          limit: $limit
          offset: $offset
        ) {
          _id
          name
          categories
          openDays
          openHours
          isActive
          location {
            type
            coordinates
          }
          cashbackInfo {
            cashBack
            fee
            minPayment
          }
          likes
        }
      }
    `;
    const { data } = await query({
      mutation: GET_SHOP_CLOSE_SHOPS,
      variables: {
        location: {
          type: "Point",
          coordinates: [42.561576, 12.6470763],
        },
        category: null,
        cashBack: 0,
        range: 10000,
        limit: 5,
        offset: 0,
      },
    });

    expect(data.closeShops).not.toBeNull();

    // expect(data).toEqual({
    //   closeShops: [
    //     {
    //       _id: shop._id,
    //       name: shop.name,
    //       categories: shop.categories,
    //       openDays: shop.openDays,
    //       openHours: shop.openHours,
    //       isActive: shop.isActive,
    //       location: {
    //         type: shop.type,
    //         coordinates: shop.coordinates,
    //       },
    //       cashbackInfo: {
    //         cashBack: shop.cashBack,
    //         fee: shop.fee,
    //         minPayment: shop.minPayment,
    //       },
    //       likes: shop.likes,
    //     },
    //   ],
    // });
  });

  it("get an array of shops", async () => {
    const GET_SHOPS = gql`
      query shops($ids: [ID!]!) {
        shops(ids: $ids) {
          _id
          categories
          name
          address
          openDays
          image
          openHours
          orderHours
          pickUpHours
          isActive
          phone
          location {
            type
            coordinates
          }
          firebaseID
          favourites
          likes
          email
        }
      }
    `;
    const { data } = await query({
      mutation: GET_SHOPS,
      variables: {
        ids: [shopID],
      },
    });

    expect(data.shops).not.toBeNull();
  });

  it("get a single shop by the shop firebase id", async () => {
    const GET_SHOP_BY_FIREBASE_ID = gql`
      query shopByFirebaseID($firebaseID: String!) {
        shopByFirebaseID(firebaseID: $firebaseID) {
          _id
          categories
          name
          address
          openDays
          image
          openHours
          orderHours
          pickUpHours
          isActive
          phone
          location {
            type
            coordinates
          }
          firebaseID
          favourites
          likes
          email
        }
      }
    `;

    const { data } = await query({
      mutation: GET_SHOP_BY_FIREBASE_ID,
      variables: {
        firebaseID: firebaseShopID,
      },
    });

    expect(data.shopByFirebaseID).not.toBeNull();
  });

  it("disactivate a shop", async () => {
    const DISACTIVATE_SHOP = gql`
      mutation disactivateShop($id: ID!) {
        disactivateShop(id: $id)
      }
    `;

    const { data } = await mutate({
      mutation: DISACTIVATE_SHOP,
      variables: {
        id: shopID,
      },
    });

    expect(data.disactivateShop).toBe(true);
  });

  // it("create a product", async () => {
  //   const CREATE_PRODUCT = gql`
  //     mutation createProduct($input: shopInput!) {
  //       createShop(input: $input)
  //     }
  //   `;

  //   const { data } = await mutate({
  //     mutation: CREATE_SHOP,
  //     variables: {
  //       input: {
  //         name: "macelleria pucci 10",
  //         address: "via cavour 41",
  //         categories: ["panetteria"],
  //         openDays: "1_2_3_4_5_6_7",
  //         image: "https://immagineprova",
  //         openHours: "08.00_20.00",
  //         orderHours: "08.00_20.00",
  //         pickUpHours: "08.00_20.00",
  //         isActive: true,
  //         phone: "3711959427",
  //         location: {
  //           type: "Point",
  //           coordinates: [42.562309, 12.64576],
  //         },
  //         cashbackInfo: {
  //           cashBack: 10,
  //           fee: 5,
  //           minPayment: 3,
  //         },
  //         firebaseID: "YQx1P1181rQN69w7HIgHRyB0mkl2",
  //       },
  //     },
  //   });

  //   shopID = data.createShop;

  //   expect(data.createShop).not.toBeNull();
  // });
});
