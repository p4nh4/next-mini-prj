import React from "react";
import CardP from "@/components/prodcard";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export const metadata = {
  title: 'PRODUCT',
  description: 'test api',
}

async function getProduct(){
    const data = await fetch("https://api.escuelajs.co/api/v1/products?limit=20&offset=20", {cache: "no-store"})
    return data.json()
}


export default async function Products(){
    const products = await getProduct()
  
    return(
        <>
      <Navbar/>
        <main className="flex flex-wrap items-center p-4 justify-around my-24 ">
           
        {
            products.map((prod)=>
            (<CardP
            key={prod.id}
            id={prod.id}
            title={prod.title}
            price={prod.price}
            desc={prod.description}
            cate={prod.category.name}
            image={prod.images[0]}
            />
            ))
        }
        </main>
   {/* <Footer/> */}
        </>
    )
}
