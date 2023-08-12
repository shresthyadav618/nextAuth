import userModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
export const sendMail = async({email,emailType,userId})=>{

    try{
        
    

    console.log(`got the ${emailType} userId`,userId);
    const hashedToken = await bcryptjs.hash(userId.toString(),10);
    console.log('token is',hashedToken);
   
   
    if(emailType==="VERIFY"){
        const User = await userModel.findByIdAndUpdate(userId , {
            verifyToken : hashedToken, verifyTokenExpiry : Date.now() + 3600000
        });
    }else{
        const User = await userModel.findByIdAndUpdate(userId , {
            forgotPasswordToken : hashedToken, forgotPasswordTokenExpiry : Date.now() + 3600000
        });
    }
    
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1d26ccb10cf27b",
          pass: "426b68a166a4e7"
        }
      });
    
      const mailOptions = {
        from : "next-auth@gmail.com",
        to : email,
        subject : emailType==="VERIFY" ? "VERIFY YOUR EMAIL" :  "RESET YOUR PASSWORD",
        html : `<p>Click <a href={${process.env.DOMAIN}/verifyemail?token=${hashedToken}}>here</a>to ${emailType==="VERIFY" ? "verify your email":"reset your password"}
        or copy and paste the link in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`
      }
    
      const mailResponse = await transporter.sendMail(mailOptions);
      return mailResponse;
    
    }catch(error){
        console.log('there was some error',error);
        throw new Error(error.message);
    }

}

