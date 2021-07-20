const { expect } = require("chai");

describe("Auth0Token", function () {
    
    let owner, addr1, addr2, addr3, addr4, addr5;
    let CibraxToken, cibraxToken;
    let Faucet, faucet;
    
    before(async function() {
        [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

        CibraxToken = await ethers.getContractFactory("CibraxToken");
        cibraxToken = await CibraxToken.deploy(1000);
        
        await cibraxToken.deployed();

        Faucet = await ethers.getContractFactory("Faucet");
        faucet = await Faucet.deploy(cibraxToken.address);
        
        await faucet.deployed();

        await cibraxToken.transfer(faucet.address, 500);
    });

    it("Deployment should assign a name", async function () {
        const name = await cibraxToken.name();
        expect(name).to.equal("Cibrax");
    });

    it("Deployment should assign a symbol", async function () {
        const name = await cibraxToken.symbol();
        expect(name).to.equal("CIBRAX");
    });

    it("Owner can transfer tokens", async function () {
        const amount = 100;

        const tx = await cibraxToken.transfer(addr1.address, amount)        ;

        const receipt = await tx.wait();

        const otherBalance = await cibraxToken.balanceOf(addr1.address);

        expect(amount).to.equal(otherBalance);
        expect(receipt.events?.filter((x) => {return x.event == "Transfer"})).to.not.be.null;
    });

    it("Faucet can transfer assigned tokens", async function () {
        const amount = 1;

        await faucet.requestTokens(addr3.address, amount);
        
        const balance = await cibraxToken.balanceOf(addr3.address);

        expect(amount).to.equal(balance);
    });

    it("Faucet returns token name", async function () {
        
        const name = await faucet.tokenName();
        expect(name).to.equal("Cibrax");
        
    });

    it("Faucet can not transfer more than assigned tokens", async function () {
        
        await expect(faucet.requestTokens(addr4.address, 5)).to.be.reverted;
        
    });
    
    it("Faucet can not transfer on consecutive calls", async function () {
        const amount = 1;

        await faucet.requestTokens(addr4.address, amount);
        
        await expect(faucet.requestTokens(addr4.address, amount)).to.be.reverted;

    });

    it("Faucet can transfer allowed tokens", async function () {
        
        const allowedAmount = 5;
        const amount = 1;

        await cibraxToken.approve(faucet.address, allowedAmount);
        
        await faucet.requestTokens(addr5.address, amount);
        
        const balance = await cibraxToken.balanceOf(addr5.address);

        expect(amount).to.equal(balance);
    });

});