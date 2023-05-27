import Image from 'next/image'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import User from './users/page'
import Products from './products/page'
import Categories from './categories/page'
import Link from 'next/link'
import { Suspense } from 'react'
import Loading from './loading'

export default function Home() {
  return (
    <>
<Suspense fallback={ <Loading/>}>
    <Navbar/>
    
    <main className="flex min-h-screen flex-col items-center justify-between p-24">   
    <h1  id="prod" class=" mt-40 mb-0 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">PRODUCTs</h1>
    <Products/>
    <h1  id="cate" class="mt-40 mb-0 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">CATEGORies</h1>
    <Categories/>
    <h1  id="user" class="mt-40 mb-0 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">USERs</h1>
    <User/>
    </main>
   
    <Footer/>
    </Suspense>
    </>
  )
}
