 'use server'

import { ServerMutation } from "../core/server"


 export const createJob = async (newJobsData) =>{
    return ServerMutation(`/api/jobs`,newJobsData)
 }

// const baseUrl=process.env.NEXT_PUBLIC_BASE_URL
//  export const createJob = async (newJobsData) =>{
//     const res = await fetch(`${baseUrl}/api/jobs`,{
//         method: "POST",
//         headers:{
//             'Content-type':'application/json',
//         },
//         body:JSON.stringify(newJobsData)
//     });

//     return res.json()
//  }