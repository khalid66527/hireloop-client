

const baseUrl=process.env.NEXT_PUBLIC_BASE_URL

// export const ServerFetch =async (path)=>{
//     const res = await fetch(`${baseUrl}${path}`);
//     return res.json()
// }

export const ServerFetch = async (path) => {
  
    const res = await fetch(`${baseUrl}${path}`, {
      cache: "no-store",
    });
    return await res.json();
  
};

 export const ServerMutation = async (path, data) =>{
    const res = await fetch(`${baseUrl}${path}`,{
        method: "POST",
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify(data)
    });

    return res.json()
    
 }