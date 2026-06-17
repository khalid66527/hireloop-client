import { ServerFetch } from "../core/server"
import { getUserSession } from "../core/session"

// const baseUrl =process.env.NEXT_PUBLIC_BASE_URL

// export const getRecruiterCompany = async (recruiterId)=>{
//     const res = await fetch(`${baseUrl}/api/my/company?recruiterId =${recruiterId}`)
//     return res.json()
// }


export const getRecruiterCompany = async (recruiterId)=>{
  return ServerFetch(`/api/my/company?recruiterId=${recruiterId}`)
  
}


export const getLoggdInRecruiterCompany = async ()=>{
  const user = await getUserSession();

  return getRecruiterCompany(user?.id)
}