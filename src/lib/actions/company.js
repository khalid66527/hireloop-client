"use client"

import { ServerMutation } from "../core/server"

export const createCompany = async (newCompanyData) =>{
    return ServerMutation(`/api/company`,newCompanyData)
}

// const baseUrl=process.env.NEXT_PUBLIC_BASE_URL
//  export const createCompany = async (newCompanyData) =>{
//     const res = await fetch(`${baseUrl}/api/company`,{
//         method: "POST",
//         headers:{
//             'Content-type':'application/json',
//         },
//         body:JSON.stringify(newCompanyData)
//     });

//     return res.json()

//  }