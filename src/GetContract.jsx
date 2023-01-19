import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import HelloWorld from './abis/HelloWorld.json'
import config from './config.json'; // config


const GetContract = () => {
  //let [newMessage, setNewMessage] = useState("");
  let [message, setMessage] = useState("");
  let [account, setAccount] = useState(null)
  let [provider, setProvider] = useState(null)
  let [contract, setContract] = useState("");


  let update = true


  const loadBlockchainData = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setAccount(accounts[0])

    const signer = provider.getSigner();

    // Javascript "version" of the smart contracts
    contract = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)
    setContract(contract)


    window.ethereum.on('accountsChanged', async () => {
      accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })
  }

  /* ===================== useEffect ===================== */
  useEffect(() => {
    addSmartContractListener();
    loadBlockchainData();
    if (update) {
      updateMessage('Debug');
      update = false
    }
  }, [])


  const addSmartContractListener = async () => {
    //provider = new ethers.providers.Web3Provider(window.ethereum)
    //setProvider(provider)
    const network = await provider.getNetwork()
    const signer = provider.getSigner();
    contract = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)
    contract.on("UpdatedMessages", (old, data)=>{
      if (typeof old !== 'undefined') {
        console.log(old, data)
      }
      
    })
  }

  const updateMessage = async (_text) => {
    //const network = await provider.getNetwork()
    //const signer = provider.getSigner();
    //helloWorld = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)
    await contract.update(_text)
  }


  return (
    <>
      <div>HelloWorld</div>
      <button onClick={()=> updateMessage('Test')}>Click me</button>
    </>
  )
}

export default GetContract