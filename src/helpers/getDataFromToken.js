  

  import jwt from "jsonwebtoken";


  export const getDataFromToken = async(request)=>{
    try{
        const token = request.cookies.get("token")?.value || '';
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        const {email , username , _id} = decoded;
        return {email,username,_id}
    }catch(error){
        throw new Error({error : 'there was some error while getting data from the token',error})
    }
  }