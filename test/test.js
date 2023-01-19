const { expect } = require("chai");
const { ethers } = require('hardhat');

describe("Hello World", function () {
  // instance of a contract
  let helloWorld

  // run before each test
  beforeEach(async () => {
    // Setup accounts
    [ account1, account2, account3 ] = await ethers.getSigners()

    // deploy contract
    const HelloWorld = await ethers.getContractFactory('HelloWorld')
    helloWorld = await HelloWorld.deploy('Hello World!!')
  })

  it('Update message.', async () => {
    await helloWorld.update('Fábio')
    let result = await helloWorld.message()
    expect(result).to.be.equal('Fábio')
  })


});
