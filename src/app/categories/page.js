import React from "react";
import CardC from "@/components/catecard";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export const metadata = {
  title: 'CATEGORIES',
  description: 'test api',
}

async function getCategories(){
    const data = await fetch("https://api.escuelajs.co/api/v1/categories/", {cache: "no-store"})
    return data.json()
}

export default async function Categories(){
    const categories = await getCategories()
    return(
        <>
        <Navbar/>
        <main className="flex flex-wrap items-center p-4 justify-around my-24">
           
        {
            categories.map((cate)=>
            (<CardC
            key={cate.id}
            id={cate.id}
            name={cate.name}
            image={cate.image}
            />
            ))
        }
        </main>
        {/* <Footer/>+ */}
        </>
    )
}
