const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const Company = require("../../../../Schema/Company/Company.model");
const MongoFilter = require("../../../MongoFilter/MongoFilter");
const { GraphQLError } = require("graphql");


const closeCompanies = async (_, { location, category, cashBack, range, limit, offset }, __, info) => {
  try{

    if(limit < 0 || offset < 0) {
      throw new Error("limit and offset cannot be negative");
    }

    //get the requested fields and store them in a filter const
    const filter = MongoFilter(info);

    const setCategories = () => {
      if(category === null) {
        return { $exists: true }; //all categories
      } 
      return category;
    }

    const setCashBack = () => {
      if(cashBack === null) {
        return 0; //all types of cashback
      } 
      return cashBack;
    }


    var closeCompanies = await Company.aggregate( [
      {
        $geoNear: {
            near: { type: "Point", coordinates: [location.coordinates[0], location.coordinates[1]] },
            spherical: true,
            query: { categories: setCategories() },
            distanceField: "coordinates",
            minDistance: 0,
            maxDistance: range,
        }
      },
      {
        $skip: offset
      },
      { $limit: limit },
      {
        $match :{ // Filter documents that don't have balance > 0
          "cashbackInfo.cashBack": { $gte: setCashBack() },
          isActive: true
        }
      },
      { $project: filter },
    ]);    

    console.log(closeCompanies);

    return closeCompanies;
  } catch(e) {
    console.log("error while fetching the close companies");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = closeCompanies;
