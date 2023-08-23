import React from 'react';
import ConnectWalletButton from './ConnectWallet';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='fixed flex text-white items-center bg-customBlue justify-between px-20 top-0 h-20 w-screen'>
      <div className='font-mono text-2xl'>
        Secureseed <span className='text-[#9eacc4] text-xs'>by Skylab</span>
      </div>
      <div className='flex gap-4 items-center'>
        <Link
          className='p-2 bg-customGreen text-white rounded-md'
          href='/create-project'
        >
          Submit Project
        </Link>
        <ConnectWalletButton />
      </div>
    </div>
  );
};

export default Navbar;
