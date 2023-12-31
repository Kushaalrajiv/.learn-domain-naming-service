const main = async () => {
  const [owner, superCoder] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("learn");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  let txn = await domainContract.register("Kushaal",  {value: hre.ethers.utils.parseEther('0.1')});
  await txn.wait();
  console.log("Minted domain Kushaal.learn");

  txn = await domainContract.setRecord("Kushaal", "Reinforcement Learning");
  await txn.wait();
  console.log("Set record for Kushaal.learn");

  const address = await domainContract.getAddress("Kushaal");
  console.log("Owner of domain Kushaal:", address);

//   const balance = await hre.ethers.provider.getBalance(domainContract.address);
//   console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

//   let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
// console.log("Balance of owner before withdrawal:", hre.ethers.utils.formatEther(ownerBalance));

// // Oops, looks like the owner is saving their money!
// txn = await domainContract.connect(owner).withdraw();
// await txn.wait();

// // Fetch balance of contract & owner
// const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
// ownerBalance = await hre.ethers.provider.getBalance(owner.address);

// console.log("Contract balance after withdrawal:", hre.ethers.utils.formatEther(contractBalance));
// console.log("Balance of owner after withdrawal:", hre.ethers.utils.formatEther(ownerBalance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();