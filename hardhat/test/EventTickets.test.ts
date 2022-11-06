import chai, { expect } from "chai";
import { ethers } from "hardhat";
import { utils } from "ethers";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

describe("Event tickets", function () {
  before(async function () {
    this.contractFactory = await ethers.getContractFactory("EventTickets");
    this.contract = await this.contractFactory.deploy();
    await this.contract.deployed();
  });

  it("Create new event", async function () {
    expect(await this.contract.getEvents()).to.deep.equal([]);

    await expect(this.contract.createEvent("", "22.10.2055 22:22", "1")).to
      .eventually.be.rejected;
    await expect(this.contract.createEvent("new event", "", "1")).to.eventually
      .be.rejected;
    await expect(
      this.contract.createEvent("new event", "22.10.2055 22:22", "-1")
    ).to.eventually.be.rejected;

    await this.contract.createEvent("new event", "22.10.2055 22:22", "1");
    expect(await this.contract.getEvents()).to.have.length(1);
  });

  it("Buy ticket for event", async function () {
    await expect(
      this.contract.mint("adskdjsan", utils.parseEther("50"), {
        value: utils.parseEther("50"),
      })
    ).to.eventually.be.rejected;

    await this.contract.createEvent(
      "new event",
      "22.10.2055 22:22",
      utils.parseEther("1")
    );

    const event = (await this.contract.getEvents())[1];

    const depositTx = await this.contract.mint(
      event.id,
      utils.parseEther("1"),
      { value: utils.parseEther("1") }
    );
    await depositTx.wait();
  });
});
