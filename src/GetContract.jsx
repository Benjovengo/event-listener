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
  let [network, setNetwork] = useState("");
  let [signer, setSigner] = useState(null)

  const loadBlockchainData = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    network = await provider.getNetwork()
    setNetwork(network)
    //const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    //setAccount(accounts[0])

    signer = provider.getSigner();
    setSigner(signer)

    // Javascript "version" of the smart contracts
    contract = new ethers.Contract(config[network.chainId].helloWorld.address, HelloWorld, signer)
    setContract(contract)

  }

  const addSmartContractListener = async () => {
    if (network) {
      provider.once("block", () => {
        contract.on("UpdatedMessages", (old, data)=>{
          console.log(old, data)
        })
      })
    }
  }

  useEffect(() => {
    addSmartContractListener();
    loadBlockchainData();
  }, [])



  const updateMessage = async (_text) => {
    await contract.update(_text)
  }


  return (
    <>
      <div>HelloWorld</div>
      <button onClick={()=> updateMessage('Test')}>Test</button>
      <button onClick={()=> updateMessage('Debug')}>Debug</button>
    </>
  )
}

export default GetContract