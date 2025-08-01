import jwt , {JwtPayload} from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

interface returnFormat{
    success : boolean;
    userData?:any;
    failureData?:any;
}

export function checkAuthentication(token:any):returnFormat{
    try{
        var data;
        const secret = process.env.SECRET
        if(secret){
            data = jwt.verify(token , secret) as JwtPayload    
            console.log(data)
        }
        return {
            success : true,
            userData : data
        }
        
    }
    catch{
        return {
            success:false,
            failureData:{
                msg:"Unauthorized",
                code:401
            }
        }
    }
}

