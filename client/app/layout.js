'use client';
import { RecoilRoot } from 'recoil';
import Navbar from './_components/Navbar';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <RecoilRoot>
        <body className="bg-customLightGreen overflow-hidden relative backdrop-sepia min-h-screen bg-[url('/motif.jpg')] bg-opacity-5">
          <div className='h-screen overflow-y-scroll'>
            <Navbar />
            <div className='pt-20'>{children}</div>
          </div>
        </body>
      </RecoilRoot>
    </html>
  );
}
