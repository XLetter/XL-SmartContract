import { ethers } from "hardhat";

async function main() {

  const XltToken = await ethers.getContractFactory("XltToken");
  const xltToken = await XltToken.deploy();

  await xltToken.deployed();

  console.log(`xltToken contract deployted to ${xltToken.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
