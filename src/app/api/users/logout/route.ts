import { NextResponse } from "next/server";

export async function GET() {
    try {
        // create a response object
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        // since its a NextResponse it can interact with cookies
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0)})

        // return response
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}