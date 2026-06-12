import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Sender credentials, pulled from environment variables or defaults
const SENDER_EMAIL = process.env.NEXT_PUBLIC_SENDER_EMAIL || 'info@oskvid.com';
// NOTE: This must be a Google App Password, not the regular Gmail password.
const SENDER_PASSWORD = process.env.SENDER_PASSWORD || 'Creativemedia2025!';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY || '';

// Gmail SMTP Configuration - Hardcoded since we are specifically using Gmail
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.titan.email'; 
const SMTP_PORT = process.env.SMTP_PORT || 465; 
const SMTP_SECURE = process.env.SMTP_SECURE || true; 
const BRAND_COLOR = '#cc5339';
const ACCENT_COLOR = '#f3f4f6';

type EmailTemplatePayload = {
    name: string;
    surname?: string;
    fromEmail: string;
    preferredDate?: string;
    message: string;
};

type RecaptchaValidationResult = {
    success: boolean;
    score?: number;
    action?: string;
    challenge_ts?: string;
    hostname?: string;
    error?: string;
};

type ContactPayload = {
    toEmail: string;
    subject: string;
    name: string;
    surname?: string;
    fromEmail: string;
    preferredDate?: string;
    message: string;
    honeypot?: string;
    recaptchaToken?: string;
};

const generateEmailTemplate = ({ name, surname, fromEmail, preferredDate, message }: EmailTemplatePayload): string => {
    const safeMessage = message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br>');

    return `
<!DOCTYPE html>
<html lang="lv">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jauns Saziņas Ziņojums</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: ${ACCENT_COLOR}; padding: 20px 0; margin: 0;">

    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="center">
                <table width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);" border="0" cellspacing="0" cellpadding="0">
                    
                    <tr>
                        <td style="background-color: ${BRAND_COLOR}; padding: 30px; border-top-left-radius: 8px; border-top-right-radius: 8px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">JAUNS PROJEKTA PIEPRASĪJUMS</h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 30px 40px;">
                            <h2 style="color: ${BRAND_COLOR}; font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid ${ACCENT_COLOR}; padding-bottom: 10px;">Klienta Informācija</h2>

                            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 14px; line-height: 1.6;">
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; width: 30%; font-weight: bold; color: #555555;">Vārds:</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; width: 70%; color: #333333;">${name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">Uzvārds:</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; color: #333333;">${surname || 'Nav norādīts'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; font-weight: bold; color: #555555;">E-pasts:</td>
                                    <td style="padding: 8px 0; border-bottom: 1px solid #eeeeee; color: ${BRAND_COLOR};">
                                        <a href="mailto:${fromEmail}" style="color: ${BRAND_COLOR}; text-decoration: none;">${fromEmail}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; font-weight: bold; color: #555555;">Vēlamais Datums:</td>
                                    <td style="padding: 8px 0; color: #333333; font-weight: bold;">${preferredDate}</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0px 40px 30px 40px;">
                            <h2 style="color: ${BRAND_COLOR}; font-size: 18px; margin-top: 0; margin-bottom: 20px; border-bottom: 2px solid ${ACCENT_COLOR}; padding-bottom: 10px;">Klienta Ziņojums</h2>
                            
                            <div style="background-color: ${ACCENT_COLOR}; border-radius: 6px; padding: 20px; font-size: 15px; color: #333333; line-height: 1.6; border-left: 5px solid ${BRAND_COLOR};">
                                ${safeMessage}
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="background-color: #e0e0e0; padding: 20px; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #555555;">Šis ziņojums tika automātiski nosūtīts no Oskvid tīmekļa vietnes saziņas veidlapas.</p>
                        </td>
                    </tr>

                </table>
                </td>
        </tr>
    </table>

</body>
</html>
    `;
};


// OPTIONS - Handle preflight requests
// export async function OPTIONS() {
//    return new NextResponse(null, {
//      status: 200,
//      headers: {
//        'Access-Control-Allow-Origin': '*',
//        'Access-Control-Allow-Methods': 'POST, OPTIONS',
//        'Access-Control-Allow-Headers': 'Content-Type',
//      },
//    })
// }

async function validateRecaptcha(token: string | undefined): Promise<RecaptchaValidationResult> {
    if (!RECAPTCHA_SECRET_KEY) {
        return { success: true, score: 1 };
    }

    if (!token) {
        return { success: false, error: "Missing reCAPTCHA token" };
    }

    const params = new URLSearchParams();
    params.append("secret", RECAPTCHA_SECRET_KEY);
    params.append("response", token);

    try {
        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: params.toString(),
        });

        if (!response.ok) {
            return { success: false, error: "Failed to validate reCAPTCHA" };
        }

        return (await response.json()) as RecaptchaValidationResult;
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown reCAPTCHA error";
        return { success: false, error: message };
    }
}

export async function POST(request: Request) {
    // Note: The 'subject' is now required in the destructuring
    const { toEmail, subject, name, surname, fromEmail, preferredDate, message, honeypot, recaptchaToken } = (await request.json()) as ContactPayload;
    
    if (!toEmail || !name || !fromEmail || !message || !subject) {
        return NextResponse.json({ message: 'Missing required form fields (toEmail, subject, name, fromEmail, message)' }, { status: 400 });
    }

    if (honeypot) {
        return NextResponse.json({ message: 'Unable to process submission.' }, { status: 400 });
    }

    const recaptchaResult = await validateRecaptcha(recaptchaToken);
    console.log(recaptchaResult)
    if (!recaptchaResult.success || (typeof recaptchaResult.score === 'number' && recaptchaResult.score < 0.5)) {
        return NextResponse.json({ message: 'Failed spam validation.' }, { status: 400 });
    }
    
    const bodyHtml = generateEmailTemplate({ name, surname, fromEmail, preferredDate, message });

    // --- UPDATED TRANSPORTER SETUP FOR GMAIL ---
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,       // smtp.gmail.com
        port: SMTP_PORT,      // 465 (for secure: true)
        secure: SMTP_SECURE,  // true (SSL/TLS required by Gmail)
        auth: {
            user: SENDER_EMAIL,    // 'oskvidinformation@gmail.com'
            pass: SENDER_PASSWORD, // The Google App Password
        },
    });
    // ---------------------------------------------

    const mailOptions = {
        from: `"Oskvid Vietne 🌐" <${SENDER_EMAIL}>`, // Sender's name and email address
        to: toEmail, // The recipient (e.g., your personal email)
        subject: subject,
        replyTo: fromEmail, // IMPORTANT: Allows you to reply directly to the customer
        html: bodyHtml,
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent successfully! Message ID:", info.messageId);

        return NextResponse.json({ 
            message: "Email sent successfully", 
            messageId: info.messageId 
        }, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        console.error("Error sending email:", message);
        
        // Log the full error to the console for debugging DNS/connection issues
        console.error("Full Nodemailer error:", error);
        
        return NextResponse.json({ 
            message: "Error sending email", 
            error: message 
        }, { status: 500 });
    }
}