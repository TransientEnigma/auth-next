import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';

connect();

export async function POST(request: NextRequest) {
    try {
        // we need to grab the token from the requestbody
        const reqBody = await request.json();

        const { token } = reqBody;

        console.log(`api/users/verifyemail, token: ${token}`);

        // we need to find the token and the expiry must be in the future (not expired)
        const user =  await User.findOne({
            verifyToken: token,
            verifyTokenExpiration: {$gt: Date.now()}
        });

        // if there is no user
        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        
        // Note: since we now have the user we can make database calls using that user
        // lets update the user verified status and clear the token and expiry
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        // update the user
        await user.save();

        console.log(`api/users/verifyemail, token: ${user}`);

        // once done we can send a response back (not redirect which is for frontend)
        return NextResponse.json({
            message: 'Email Verified',
            success: true
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}