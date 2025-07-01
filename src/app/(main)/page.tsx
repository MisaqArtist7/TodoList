import React from 'react'
import Image from 'next/image'
export default function page() {
  return (
    <section className='flex-row-center min-h-screen'>
      <div className='absolute left-0 -top-20'>
        <Image src="images/pic1.svg" alt="" width={1300.05} height={100}/>
      </div>
      <div className='absolute right-0 top-0'>
        <Image src="images/pic2.svg" alt="" width={333} height={0}/>
      </div>
      <div className='primaryShadow bg-[#151515] border border-black rounded-3xl text-white z-50 w-[369px]'>
        <div className='bg-[#152C2B] px-3 py-7 rounded-t-3xl flex items-center justify-between'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </span>
          <h1 className='font-bold text-lg'>Todo List</h1>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
          </span>
        </div>
        <div className='px-4 py-7 overflow-hidden flex flex-col justify-center gap-4'>
          <div className='flex flex-col justify-center'>
            <h2 className='font-bold'>Today</h2>
            <span className='text-[#7D7878]'>1July, 2025</span>
          </div>
          <div className='flex flex-col justify-center gap-2'>
            <div className='bg-[#201F1F] p-3 rounded-lg flex items-center justify-between'>
              <div className="flex items-center gap-1 text-[#7A7777] pointer-events-none">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </span>
                <span className="line-through">Do exercise</span>
              </div>
              <span>6:00 am</span>
            </div>
            <div className='bg-[#201F1F] p-3 rounded-lg flex items-center justify-between'>
              <div className="flex items-center gap-1 pointer-events-none">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-6 h-6">
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                </span>
                <span>Meditation</span>
              </div>
              <span>7:00 am</span>
            </div>
          </div>
          <div className='mt-7 flex justify-end items-center hover:cursor-pointer'>
            <div className='secoundaryShadow bg-[#152C2B] h-16 w-16 rounded-full flex-row-center'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
