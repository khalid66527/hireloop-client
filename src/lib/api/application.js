import { ServerFetch } from "../core/server"





export const getApplicantionByApplicat = async (applicantId)=>{
  return ServerFetch(`/api/applicantions?applicantId=${applicantId}`)
  
}
