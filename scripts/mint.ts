import { ethers } from "hardhat";
import dotenv from 'dotenv';
dotenv.config();
const contract = require("../artifacts/contracts/HamletNftC.sol/HamletNftC.json")
const contractInterface = contract.abi;
let provider = ethers.provider;
const tokenURI = "https://s3.ap-northeast-2.amazonaws.com/xletter.bucket/Hamlet_C.json"
const privateKey = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey||"");

const signer = wallet.connect(provider);

const nft = new ethers.Contract(
    "0xC1275D9da8aBDEeaF4cd6d181Cd82E0a5090fd36",
    contractInterface,
    signer
);

async function main() {
    nft
    .mint("0x396eC1747A6BC98A7E45fC707F3CBa187a1447F7", tokenURI)
    .then((tx:any) => tx.wait())
    .then((receipt:any) => console.log("TransactionHash ", receipt.TransactionHash))
    .catch((e:any)=> console.log("Error", e));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
