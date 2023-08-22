'use client';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useRecoilState } from 'recoil';
import { signerState } from '../_globalState/atom';

const ConnectWalletButton = () => {
  const [account, setAccount] = useState('');
  const [loading, setLoading] = useState(false);
  const [signer, setSigner] = useRecoilState(signerState);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        setLoading(true);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        setSigner(signer);
        const connectedAccount = await signer.getAddress();
        setAccount(connectedAccount);
      } else {
        alert('MetaMask is not installed or not accessible.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {account ? (
        <div className='p-2 bg-customGreen text-white rounded-md flex justify-center items-center'>
          <p>Connected: {account.slice(0, 4) + '...' + account.slice(-4)}</p>
        </div>
      ) : (
        <button
          className='p-2 bg-customGreen text-white rounded-md'
          onClick={connectWallet}
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
