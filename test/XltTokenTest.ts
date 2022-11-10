import { expect } from "chai";
import { ethers } from "hardhat";
import { XltToken } from "../typechain-types";

async function deployContracts() {
    const [deployer, user] = await ethers.getSigners();

    // #1. Deploy Xlt Token Contract
    const XltToken = await ethers.getContractFactory("XltToken")
    const xltToken = await XltToken.connect(deployer).deploy();
    await xltToken.deployed();
    return { deployer, user, xltToken }
}

describe("Buy Xlt token", function () {
    it("user get right amount of xlt when they buy them", async function () {
        const { deployer, user, xltToken } = await deployContracts();

        const option = { value: ethers.utils.parseEther("2") }
        const buy: any = await xltToken.connect(user).buyXlt(option)
        await buy.wait();

        expect(Number(await xltToken.balanceOf(user.address))).to.equal(2 * 0.2047073300 * 1e18)
    })
})