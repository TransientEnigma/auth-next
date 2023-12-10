import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({email, emailType, userId}: any) => {

    console.log('*** mailer.ts ln7 ****');

    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        console.log(`hashedToken = ${hashedToken}`);

        if (emailType === "VERIFY") {

            // find and update the user with token and expiration
            var user = await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiration: Date.now() + 3600000
            });

            console.log(`"User" = ${user}`);

        } else if (emailType === "RESET") {

            // find and update the user with token and expiration
            await User.findByIdAndUpdate(userId, 
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiration: Date.now() + 3600000
                }
            );
        } 

        // console.log(`NEXT_PUBLIC_TRANSPORT_USER: ${process.env.NEXT_PUBLIC_TRANSPORT_USER}`);
        // console.log(`NEXT_PUBLIC_TRANSPORT_PASSWORD: ${process.env.NEXT_PUBLIC_TRANSPORT_PASSWORD}`);

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        // secure: true,
        auth: {
            user: `${process.env.NEXT_PUBLIC_TRANSPORT_USER}`,
            pass: `${process.env.NEXT_PUBLIC_TRANSPORT_PASSWORD}`,
        },
    });

    const mailOptions = {
        from: 'p2430705@my365.dmu.ac.uk',
        to: email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: 
        `
            <p> Click <a href="${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}">Here</a>
                to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste
                the link in your browser: ${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}
            </p>
        `
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}