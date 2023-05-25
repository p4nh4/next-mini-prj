import Image from 'next/image'
import Navbar from '@/components/navbar'
import Link from 'next/link'
import Footer from '@/components/footer'

export default function Form() {
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      <Navbar/>
      <div class="flex md:order-2">
      <Link href="/form/postUser" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">POST USER</Link>
      <Link href="/form/postProduct" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">POST PRODUCT</Link>
      </div>

      
{/* <h1 class="mt-40 mb-0 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">FETCHING</h1> */}


    </main>
    <Footer/>
    </>
  )
}
