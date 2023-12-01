import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// we simply export a function
export const getDataFromToken = (request: NextRequest) => {
    try {
        // get the token from request, if empty return ''
        const encodedToken = request.cookies.get("token")?.value || '';

        // decode using secret
        const decodedToken:any = jwt.verify(encodedToken, process.env.NEXT_PUBLIC_TOKEN_SECRET!);

        // return the id from the token
        return decodedToken.id;
        
    } catch (error: any) {
        throw new Error(error.message);
    }

}