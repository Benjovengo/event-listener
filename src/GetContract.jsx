import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import HelloWorld from './abis/HelloWorld.json'
import config from './config.json'; // config


const GetContract = () => {
  let [newMessage, setNewMessage] = useState("");
  let [account, setAccount] = useState(null)
  let [provider, setProvider] = useState(null)


  const loadBlockchainData = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    const network = await provider.getNetwork()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])

    const signer = provider.getSigner();

    // Javascript "version" of the smart contracts
    const helloWorld = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)
    newMessage = await helloWorld.message();
    setNewMessage(newMessage)

    window.ethereum.on('accountsChanged', async () => {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  useEffect(() => {
    loadBlockchainData()
    console.log(newMessage)
  }, [])



  return (
    <div>HelloWorld</div>
  )
}

export default GetContract