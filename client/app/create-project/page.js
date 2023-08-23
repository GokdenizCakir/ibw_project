'use client';
import { useEffect, useState } from 'react';
import { contractABI, contractAddress } from '../constant/constant';

import { ethers } from 'ethers';
import { useRecoilValue } from 'recoil';
import { signerState } from '../_globalState/atom';

const page = () => {
  const [name, setName] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [instagram, setInstagram] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const signer = useRecoilValue(signerState);

  const handleClick = async () => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.createPool();
      await tx.wait();

      fetch('http://localhost:8000/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          publicKey,
          twitter,
          linkedin,
          instagram,
          description,
        }),
      });

      console.log(tx);
    } catch (error) {
      console.error(error);
    } finally {
      setName('');
      setPublicKey('');
      setTwitter('');
      setLinkedin('');
      setInstagram('');
      setDescription('');

      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center p-12 items-center'>
      <div className='bg-[#e6f2ea] flex flex-col gap-4 w-96 rounded-lg p-12 shadow-lg'>
        <div>
          <h2>Project Name</h2>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type='text'
            className='border-2 p-1 w-full border-customGreen rounded-md'
          />
        </div>
        <div>
          <h2>Public key</h2>
          <input
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            type='text'
            className='border-2 p-1 w-full border-customGreen rounded-md'
          />
        </div>
        <div>
          <h2>Twitter (Optional)</h2>
          <input
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            type='text'
            className='border-2 p-1 w-full border-customGreen rounded-md'
          />
        </div>
        <div>
          <h2>LinkedIn (Optional)</h2>
          <input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            type='text'
            className='border-2 p-1 w-full border-customGreen rounded-md'
          />
        </div>
        <div>
          <h2>Instagram (Optional)</h2>
          <input
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            type='text'
            className='border-2 p-1 w-full border-customGreen rounded-md'
          />
        </div>
        <div>
          <h2>Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'
            rows={4}
            className='border-2 p-1 resize-none w-full border-customGreen rounded-md'
          />
        </div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <button
            onClick={handleClick}
            className='p-2 bg-customGreen text-white rounded-md'
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default page;
