const graphqlFields = require('graphql-fields');

//this function takes the mongodbqueryfields and returns them with value of 1 => so we can filter the mongodbquery
const MongoFilter = (info) => {
    const requestedFields = graphqlFields(info);
    for (var key in requestedFields) {
        if (requestedFields.hasOwnProperty(key)) {
            requestedFields[key] = 1;
        }
    }

    return requestedFields;
}

module.exports = MongoFilter;