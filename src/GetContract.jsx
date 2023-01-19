import React, { useState, useEffect } from 'react';

/* Contract */
import HelloWorld from './abis/HelloWorld.json'
import config from './config.json'; // config

const GetContract = () => {
  const [newMessage, setNewMessage] = useState("");

  //called only once
  useEffect(async () => {
    
  }, []);

  function addSmartContractListener() { //TODO: implement
    
  }

  const updateMessage = async (message) => {

  };


  return (
    <div>HelloWorld</div>
  )
}

export default GetContract