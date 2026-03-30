import * as z from "zod"
 
export const registerSchema = z.object({
  name: z
    .string()
    .nonempty("Name Requies")
    .min(8, "Min Chars is 8")
    .max(30, "Max Chars is 30"),

    email : z.string()
    .nonempty("Email Requied")
    .email("Email Not Valid"),

    password:
    z.string()

    .nonempty("Password Is Requied")
    .min(5 , "min Chars is 10"),

    rePassword:
    z.string()
    .nonempty("Re Password is Required")
     .min(5 , "min Chars is 10"),

     phone :
     z.string()
     .nonempty("Phone is Required")
     .regex(/^01[0125][0-9]{8}$/, "Egyptian Mobile Only")


}).refine((data)=> data.password === data.rePassword , {
    path:["rePassword"],
    error:"password Not Matched"
})

export type registerSchemaType = z.infer<typeof registerSchema >

export const loginSchema = z.object({

    email : z.string()
    .nonempty("Email Requied")
    .email("Email Not Valid"),

    password:
    z.string()

    .nonempty("Password Is Requied")
    .min(5 , "min Chars is 10"),

  
  

})

export type loginSchemaType = z.infer<typeof loginSchema >