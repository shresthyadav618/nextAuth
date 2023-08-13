  

  import jwt from "jsonwebtoken";


  export const getDataFromToken = async(request)=>{
    try{
        const token = request.cookies.get("token")?.value || '';
        console.log('the value of token is : ',token);
        console.log(process.env.TOKEN_SECRET);
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
        console.log(decoded)
        const {email , username , _id} = decoded;
        return {email,username,_id}
    }catch(error){
        throw new Error({error : 'there was some error while getting data from the token',error})
    }
  }