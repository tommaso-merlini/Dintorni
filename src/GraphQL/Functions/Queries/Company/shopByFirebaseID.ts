import { GraphQLError } from "graphql";
import Shop from "../../../../Schema/Company/Shop/Shop.model";

interface shopByFirebaseIDParams {
  firebaseID: string;
}

const shopByFirebaseID = async (
  _: any,
  { firebaseID }: shopByFirebaseIDParams
) => {
  try {
    //get the shop from mongodb if not cached
    const shop = await Shop.findOne({ firebaseID: firebaseID });

    if (!shop) throw new Error("this shop does not exist");
    if (!shop.isActive) throw new Error("this shop is not active");

    //return shop
    return shop;
  } catch (e: any) {
    console.log("error while fetching the shop by firebase id");
    throw new GraphQLError(e.message);
    return null;
  }
};

export default shopByFirebaseID;
