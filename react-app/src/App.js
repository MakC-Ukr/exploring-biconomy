import React, { useEffect, useState } from "react";
import {Biconomy} from "@biconomy/mexa";
import Web3 from 'web3';







function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [biconomyTester, setBiconomyTester] = useState(null);

  const [x, setX] = useState(0);

  const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "increaseX",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "name": "isTrustedForwarder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "trustedForwarder",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "versionRecipient",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "x",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
  ];
  const ADDRESS = "0x4E724d7b82F859f5aFD2102432F5F2bBeB89880A";


  async function fetchData()
  {
    const x = await biconomyTester.methods.x().call();
    console.log("X=",x);
    setX(x);
  }


  useEffect(
     ()=>{
      async function initBico()
      {
        window.ethereum.request({ method: "eth_requestAccounts" });
        const biconomy = new Biconomy(window.ethereum,{apiKey: "MJiigX672.55ec7618-d447-4a20-88d8-b0d801ccd390", debug: true});
        let web3 = new Web3(biconomy);
        console.log("Provider is", window.ethereum);
        console.log("web3.defaultAccount is ", web3);



        connectWalletHandler();

        biconomy.onEvent(biconomy.READY, async () => {
          await window.ethereum.enable();
          const s = new web3.eth.Contract(ABI, ADDRESS);
          await setBiconomyTester(s);
          console.log("S is ",s);
          console.log("CHECK 2");
          console.log("CHECK 3");
        }).onEvent(biconomy.ERROR, (error, message) => {
          console.log(error)
        });
      

      }

      initBico();
    },[]
  );

  const connectWalletButton = () => {
    return (<button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;
  
    if (!ethereum) {
      alert("Please install Metamask!");
    }
  
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Found an account! Address: ", accounts[0]);
        setCurrentAccount(accounts[0]);
      } catch (err) {
        console.log(err)
      }
    }

  return (
    <div >
      <h1>Biconomy exploring</h1>
      <h4>X = {x}</h4>
      <div>
      {currentAccount===""? connectWalletButton() : "account connected"}
      </div>
      <button onClick={fetchData}>Fetch</button>
      <button onClick={()=>{
        if(currentAccount==="")
          connectWalletHandler();
        biconomyTester.methods.increaseX().send({
          from:currentAccount
        });
      }}>
        Increase x (gas) 
      </button>
    </div>
  );
}

export default App;
