import React, { useState, useEffect } from 'react';

/* Contract */
import HelloWorld from './abis/HelloWorld.json'
import config from './config.json'; // config

let provider = new ethers.providers.Web3Provider(window.ethereum, "any")
const network = await provider.getNetwork()
// get accounts
const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
console.log(accounts[0])
// get signer
const signer = provider.getSigner();

// Javascript "version" of the smart contracts
const helloWorld = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)

const GetContract = () => {
  const [newMessage, setNewMessage] = useState("");

/*   //called only once
  useEffect(async () => {
    
  }, []);

  function addSmartContractListener() { //TODO: implement
    
  }

  const updateMessage = async (message) => {

  }; */


  return (
    <div>HelloWorld</div>
  )
}

export default GetContract