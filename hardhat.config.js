/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");

 require('dotenv').config();
 
 const API = process.env.API_URL
 const KEY = process.env.PRIVATE_KEY_RINKEBY
 
 module.exports = {
   solidity: "0.8.3",
   networks: {
     rinkeby: {
       url: `${API}`,
       accounts: [`${KEY}`]
     }
   }
 };