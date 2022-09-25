import {expect} from "chai";
import {ethers} from "hardhat";
import { XltToken } from "../typechain-types";

let xltToken : XltToken;

const deployedContract :string = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"

describe("Get instance of xltToken", function () {
    before(async function() {
        xltToken = await ethers.getContractAt("XltToken", deployedContract) as XltToken
    })
    it("user get right amount of xlt when they buy them", async function() {
        const signers = await ethers.getSigners();
        const buyerAddress = signers[5].address;
        const signer = await ethers.getSigner(buyerAddress);

        const option = {value: ethers.utils.parseEther("2")}
        const buy: any = await xltToken.connect(signer).buyXlt(option)
        const tx = await buy.wait();
        const amount = tx.events[0].args[0];
        const buyer = tx.events[0].args[1];
        console.log(await xltToken.balanceOf(buyer))

        expect(Number(await xltToken.balanceOf(buyerAddress))).to.equal(2*0.2047073300*1e18)
    })
})