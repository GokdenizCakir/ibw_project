import React from 'react';
import ConnectWalletButton from './ConnectWallet';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='fixed flex text-white items-center bg-customBlue justify-between px-20 top-0 h-20 w-screen'>
      <div>Hello</div>
      <div className='flex gap-4 items-center'>
        <Link
          className='p-2 bg-customGreen text-white rounded-md'
          href='/create-project'
        >
          Create Project
        </Link>
        <ConnectWalletButton />
      </div>
    </div>
  );
};

export default Navbar;
