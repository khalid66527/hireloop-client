 'use server'

import { ServerMutation } from "../core/server"


 export const createApplication = async (newApplicationData) =>{
    return ServerMutation(`/api/applications`,newApplicationData)
 }