import chai, { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

describe("Piggy Bank", function () {
  before(async function () {
    this.PiggyBank = await ethers.getContractFactory("PiggyBank");
    this.piggyBank = await this.PiggyBank.deploy();
    await this.piggyBank.deployed();
  });

  it("Create new saving", async function () {
    expect(await this.piggyBank.getSavingNames()).to.deep.equal([]);

    await this.piggyBank.createSaving("Car", utils.parseEther("100"));
    expect((await this.piggyBank.getSavingNames())[0]).to.eq("Car");

    const savingDetails = await this.piggyBank.getSavingDetails("Car");
    expect(savingDetails.savingLimit).to.eq(utils.parseEther("100"));
    expect(savingDetails.currentAmount).to.eq("0");
  });

  it("Deposit", async function () {
    const depositTx = await this.piggyBank.deposit(
      "Car",
      utils.parseEther("50"),
      { value: utils.parseEther("50") }
    );
    await depositTx.wait();

    const savingDetails = await this.piggyBank.getSavingDetails("Car");
    expect(savingDetails.savingLimit).to.eq(utils.parseEther("100"));
    expect(savingDetails.currentAmount).to.eq(utils.parseEther("50"));
  });

  it("Withdraw before limit", async function () {
    await expect(this.piggyBank.withdraw("Car")).to.eventually.be.rejected;
  });

  it("Withdraw on limit", async function () {
    const depositTx = await this.piggyBank.deposit(
      "Car",
      utils.parseEther("50"),
      { value: utils.parseEther("50") }
    );
    await depositTx.wait();

    expect(await this.piggyBank.withdraw("Car"));
    console.log(await this.piggyBank.getSavingDetails("Car"));
    console.log(await this.piggyBank.getSavingNames());
  });
});
