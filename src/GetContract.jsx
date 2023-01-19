import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import HelloWorld from './abis/HelloWorld.json'
import config from './config.json'; // config


const GetContract = () => {
  let [newMessage, setNewMessage] = useState("");
  let [message, setMessage] = useState("");
  let [account, setAccount] = useState(null)
  let [provider, setProvider] = useState(null)
  const [status, setStatus] = useState("");

  let helloWorld
  let update = true


  const loadBlockchainData = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])

    const signer = provider.getSigner();

    // Javascript "version" of the smart contracts
    helloWorld = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)
    newMessage = await helloWorld.message();
    console.log(newMessage)
    setNewMessage(newMessage)

    window.ethereum.on('accountsChanged', async () => {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  /* ===================== useEffect ===================== */
  useEffect(() => {
    loadBlockchainData();
    addSmartContractListener();
    if (update) {
      updateMessage();
      update = false
    }
  }, [])


  const addSmartContractListener = async () => {
    const network = await provider.getNetwork()
    const signer = provider.getSigner();
    helloWorld = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)
    helloWorld.on("UpdatedMessages", (from, to, value, event)=>{
      console.log(value)
    })
  }

  const updateMessage = async () => {
    const network = await provider.getNetwork()
    const signer = provider.getSigner();
    helloWorld = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)
    await helloWorld.update('Fabio')
  }


  return (
    <div>HelloWorld</div>
  )
}

export default GetContract