const Company = require("../../../../Schema/Company/Company.model");
const useGet = require("../../../../Redis/useGet/useGet");
const useSet = require("../../../../Redis/useSet/useSet");


const updateCompany = async (_, {id, input}) => {
    try {
        await Company.updateOne({_id:id}, input);
        //check if the company is cached
        const redisCompany = await useGet(`company/${id}`);

        //if the company is cached update it
        if (redisCompany) {
            //merge the input with the company retured by redis
            const mergedProduct = merge(redisCompany, input);
            await useSet(`company/${id}`, company);
        }
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
}

module.exports = updateCompany;