const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());


    const Paymaster = await ethers.getContractFactory("Paymaster");
    const paymaster = await Paymaster.deploy();
    console.log("Paymaster Address: ", paymaster.address);

    await paymaster.setRelayHub('0x6650d69225CA31049DB7Bd210aE4671c0B1ca132')
    await paymaster.setTrustedForwarder('0x83A54884bE4657706785D7309cf46B58FE5f6e8a')

    const NFT = await ethers.getContractFactory("MyNFT");
    const nft =  await NFT.deploy('0x83A54884bE4657706785D7309cf46B58FE5f6e8a');
    console.log("NFT address", nft.address);

    await paymaster.setTarget(nft.address)
    // const paymasterAddress = await paymaster.address
    await deployer.sendTransaction({to: '0xF7f7cf7AA77fA95585722B21dF738e021e3D5ca2', value: ethers.utils.parseEther('1')})
    //await deployer.provider.send({to:'0x8cbC9765372eBA67eb2D691129533DEEE34134dD', value: ethers.utils.parseEther('1')})
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    // const Forwarder = await ethers.getContractFactory("MinimalForwarder");
    // const forwarder = await Forwarder.deploy();
  
    // console.log("Forwarder address:", forwarder.address);

 
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });