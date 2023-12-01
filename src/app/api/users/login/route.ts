import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        // get the email and password from the request
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: 'User does not exist'}, {status: 400});
        }
        
        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: 'Invalid password'}, {status: 400});
        }
        // create token data 
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token
        const token = jwt.sign(tokenData, process.env.NEXT_PUBLIC_TOKEN_SECRET!, { expiresIn: '1h' });

        // set token in users cookie
        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        })

        // similarly you can also get the cookie response.cookies.get
        response.cookies.set('token', token, {httpOnly: true});

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}