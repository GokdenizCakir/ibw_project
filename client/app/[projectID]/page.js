'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { MaxUint256, ethers } from 'ethers';
import { contractABI, contractAddress } from '../constant/constant';
import { useRecoilValue } from 'recoil';
import { signerState } from '../_globalState/atom';

const page = () => {
  const { projectID } = useParams();
  const [project, setProject] = useState({});
  const [number, setNumber] = useState('');
  const signer = useRecoilValue(signerState);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Sending a donation transaction with value in Ether
      const valueInEther = ethers.parseEther(number);
      const tx = await contract.contribute(0, { value: valueInEther });
      await tx.wait();

      // Handle success
      console.log('Donation successful!');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setNumber('');
    }
  };

  useEffect(() => {
    const getPool = async () => {
      try {
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        contract.getPool(1)
        await tx.wait();
      } catch (error) {
        console.error('Error:', error);
      }
    };
    getPool();

    const getProject = async () => {
      const res = await fetch(
        'http://localhost:8000/api/v1/projects/' + projectID
      );
      const data = await res.json();
      setProject(data.data.project);
    };
    getProject();
  }, []);

  return (
    <div className='flex justify-center p-20 items-center'>
      <div className='bg-[#e6f2ea] flex gap-24 rounded-lg p-20 shadow-lg'>
        <div>
          <h2 className='text-4xl mb-12'>{project?.name}</h2>
          <h2 className='mb-12'>
            by:{' '}
            {project?.publicKey?.slice(0, 4) +
              '.....' +
              project?.publicKey?.slice(-4)}
          </h2>
          <h3>{project?.description}</h3>
        </div>

        <div className='flex flex-col rounded-sm bg-customLightGreen/50 items-center p-12 mt-12'>
          <h2>Donation Amount:</h2>
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className='border-customLightGreen w-60 p-1 mb-2 rounded-lg border-2'
            type='number'
          />
          {loading ? (
            <div>loading...</div>
          ) : (
            <button
              onClick={handleClick}
              className='bg-customLightGreen w-60 py-1 rounded-lg'
            >
              Donate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
