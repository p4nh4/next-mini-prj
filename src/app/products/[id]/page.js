import React from "react";

export async function generateMetadata({params}){
    const prod = await getProducts(params.id)
    return{
        title: prod.title,
        description: prod.description,
        thumbnail: prod.images[0],
        metadataBase: new URL('https://istad.co'),
        alternates: {
            canonical: '/',
            languages: {
            'en-US': '/en-US',
            'de-DE': '/de-DE',
            },
        },
        openGraph: {
            images: prod.images[0],
            title: prod.title,
            description: prod.description,
        },
    }
}
async function getProducts(id){
    const cateID = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
    return cateID.json()
}
export default async function Product({params}){
    const {id} = params
    const prod = await getProducts(id)
    return(
        
<main className="flex flex-wrap items-center p-4 justify-around my-24 ">
<a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
    <img className="object-cover w-full rounded-t-lg h-150 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={prod.images[0]} alt=""/>
    <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{prod.title}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">${prod.price}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{prod.category.name}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{prod.description}</p>
    </div>
</a>
</main>
    )
}