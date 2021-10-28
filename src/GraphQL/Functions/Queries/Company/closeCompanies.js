const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");
const Company = require("../../../../Schema/Company/Company.model");
const MongoFilter = require("../../../MongoFilter/MongoFilter");
const { GraphQLError } = require("graphql");


const closeCompanies = async (_, { location, category, range, limit, offset }, __, info) => {
  try{

    if(limit < 0 || offset < 0) {
      throw new Error("limit and offset cannot be negative");
    }

    //get the requested fields and store them in a filter const
    const filter = MongoFilter(info);
  
    if(category) { //if the category not specified search for the category
      var closeCompanies = await Company.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [location.coordinates[0], location.coordinates[1]],
            },
            $minDistance: 0,
            $maxDistance: range,
          },
        },
        categories: category,
        isActive: true
      }, filter).skip(offset).limit(limit);
    } else { //if the category is not specified search for all categories
      var closeCompanies = await Company.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [location.coordinates[0], location.coordinates[1]],
            },
            $minDistance: 0,
            $maxDistance: range,
          },
        },
        isActive: true
      }, filter).skip(offset).limit(limit);
    }
    
    return closeCompanies;
  } catch(e) {
    console.log("error while fetching the close companies");
    throw new GraphQLError(e.message);
    return null;
  }
};

module.exports = closeCompanies;
