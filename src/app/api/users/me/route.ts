import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request:NextRequest) {
    try {
       const userId = await getDataFromToken(request);
       
       // this will return all data, so we deselect feilds we do not want
       const user = await User.findOne({_id: userId}).select("-password -isAdmin");
       
       // now we can return a message and the user as json
       return NextResponse.json({
        message: "User found",
        data: user
       })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}