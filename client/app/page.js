'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const res = await fetch('http://localhost:8000/api/v1/projects');
      const data = await res.json();
      setProjects(data.data.projects);
    };
    getProjects();
  }, []);

  return (
    <div>
      <div className='grid pb-20 mt-12 px-16 gap-10 grid-cols-2'>
        <div className='bg-white col-span-2 text-4xl text-customBlue shadow-lg border-2 border-customGreen rounded-2xl p-20'>
          Help one another in acts of piety and righteousness.{' '}
        </div>
        {projects?.map((project, i) => (
          <div key={i} className='rounded-2xl shadow-lg bg-[#9ad8ccef] p-12'>
            <h2 className='text-4xl font-semibold mb-4'>{project.name}</h2>
            <h2 className='mb-4 font-semibold'>
              by:{' '}
              {project?.publicKey?.slice(0, 4) +
                '.....' +
                project?.publicKey?.slice(-5, -1)}
            </h2>
            {project?.description?.slice(0, 100) + '...'}
            <div className='flex mt-16 justify-end'>
              <Link
                href={'/' + project?._id}
                className='flex items-center cursor-pointer rounded-md hover:opacity-90 justify-between px-4 text-white bg-customGreen h-12'
              >
                <h2>Donate Now</h2>
                <svg
                  className='w-10'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                  <g
                    id='SVGRepo_tracerCarrier'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></g>
                  <g id='SVGRepo_iconCarrier'>
                    {' '}
                    <path
                      d='M7 17L17 7M17 7H8M17 7V16'
                      stroke='#FFF'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    ></path>{' '}
                  </g>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
