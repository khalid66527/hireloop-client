// import { ServerFetch } from "../core/server"

import { ServerFetch } from "../core/server"

const baseUrl =process.env.NEXT_PUBLIC_BASE_URL

export const getJobs = async ()=>{
   
    return ServerFetch('/api/jobs')
    // const res = await fetch(`${baseUrl}/api/jobs`)
    // return res.json()
}

export const getJobsId =  async (jobId)=>{
return ServerFetch(`/api/jobs/${jobId}`)
}


export const getCompany = async (companyId , status = "active")=>{
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`)
    return res.json()
}