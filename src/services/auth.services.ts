import { loginSchemaType, registerSchemaType } from "@/schemas/auth.schemas";

export async function registerUser(formData : registerSchemaType){


    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`,  {

        method:"POST",
        body:JSON.stringify(formData) , 
        headers:{
            "Content-type":"application/json"
        }

    })

    const data =await  response.json();

    return data
}

export async function loginUser(formData : loginSchemaType){


    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signin`,  {

        method:"POST",
        body:JSON.stringify(formData) , 
        headers:{
            "Content-type":"application/json"
        }

    })

    const data =await  response.json();

    return data
}