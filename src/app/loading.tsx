
import React from 'react'
import { Spinner } from "@/components/ui/spinner"
import Link from 'next/link'
export default function Loading() {
  return (
    <div className='flex h-screen items-center justify-center flex-col gap-6'>
      <div className="nav-logo ">
            <Link className="text-3xl font-bold flex gap-2 " href="/">
              <div className="bg-black w-10 h-10 text-white flex items-center justify-center rounded-lg">
                S
              </div>
              ShopMart
            </Link>
          </div>

          {/*  spinner */}
          <Spinner className="size-8"/>
    </div>
  )
}
