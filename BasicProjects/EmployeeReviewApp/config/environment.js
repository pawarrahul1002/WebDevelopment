// Encode database password to handle special characters
//const dbpassword = encodeURIComponent('PlacementCell%codingninjas');

// Development configuration object
const developement = {
    name: 'development', 
    port: 4040,                              
    secret_key: 'pawar#$^%$#@rahul&^%$#',
    mongoose_path: "mongodb://127.0.0.1:27017/EmployeeReview",
};


module.exports = developement; // Export development configuration object

