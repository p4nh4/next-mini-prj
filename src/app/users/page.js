import React from "react";
import Card from "@/components/card";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


export const metadata = {
  title: 'USER',
  description: 'user testing',
}

async function getUsers(){
    const data = await fetch("https://api.escuelajs.co/api/v1/users?limit=8&offset=8", {cache: "no-store"})
    return data.json()
}

export default async function User(){
    const users = await getUsers()
    return(
        <>
    <Navbar/>
        <main className="flex flex-wrap items-center p-4 justify-around my-24 ">
           
        {
            users.map((user)=>
            (<Card
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            image={user.avatar}
            />
            ))
        }
        </main>
    {/* <Footer/> */}
        </>
    )
}
