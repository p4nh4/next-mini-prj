import Image from 'next/image'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import User from './users/page'
import Products from './products/page'
import Categories from './categories/page'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">   
    {/* <img src='https://i.pinimg.com/originals/93/63/eb/9363ebc5e8fad43049a09b57b77022fe.gif'/> */}
    <Link href="/users" id="user" class="mt-40 mb-0 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">USERs</Link>
    <User/>
    <Link href="/products" id="prod" class="mt-40 mb-0 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">PRODUCTs</Link>
    <Products/>
    <Link href="/categories" id="cate" class="mt-40 mb-0 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">CATEGORies</Link>
    <Categories/>
    </main>
    <Footer/>
    </>
  )
}
