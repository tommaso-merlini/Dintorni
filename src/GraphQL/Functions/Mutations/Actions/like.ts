import { GraphQLError } from "graphql";
import useDel from "../../../../Redis/useDel/useDel";
import Shop from "../../../../Schema/Company/Shop/Shop.model";
import Product from "../../../../Schema/Product/Product.model";

/**
 * @title Add Like or Remove Like
 * @author Tommaso Merlini
 *
 * ---------------------------------
 *
 * @param id the id of the product/shop *
 * @param to if the action is directed to product or shop
 * @param action the action can be increment or decrement
 * @returns Boolean!
 */

interface Like {
  id: string;
  to: string;
  action: string;
}

const like = async (_: any, { id, to, action }: Like, { client }) => {
  try {
    var likeAction = 0;

    switch (action) {
      case "increment":
        likeAction = 1;
        break;
      case "decrement":
        likeAction = -1;
        break;
      default:
        throw new Error(
          `${action} is not a valid action, try with increment or decrement`
        );
    }

    switch (to) {
      case "shop":
        const shop = await Shop.updateOne(
          { _id: id },
          { $inc: { likes: likeAction } }
        );
        if (shop.n === 0) {
          throw new Error(`shop with id ${id} does not exist`);
        }
        await useDel(`shop/${id}`, client);
        break;

      case "product":
        //like on mongodb
        const product = await Product.updateOne(
          { _id: id },
          { $inc: { likes: likeAction } }
        );
        if (product.n === 0) {
          throw new Error(`Product with id ${id} does not exist`);
        }
        await useDel(`product/${id}`, client);
        break;

      default:
        throw new Error(
          `"to" variable can not be ${to}, try with shop or product`
        );
    }
    return true;
  } catch (e: any) {
    throw new GraphQLError(e.message);
  }
};

export default like;
