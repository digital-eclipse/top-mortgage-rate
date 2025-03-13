import { NextResponse } from 'next/server';
import transporter from '@/lib/mailer'; // Import the transporter directly

export async function POST(req: Request) {
  try {
    // Parse the incoming form data
    const formData = await req.formData();

    const token = formData.get('token') as string;
    if (!token) {
      console.error('Missing reCAPTCHA token');
      return NextResponse.json({ error: 'Missing reCAPTCHA token' }, { status: 400 });
    }

    // Verify the reCAPTCHA token
    const verificationResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: 'POST' }
    );
    const verificationResult = await verificationResponse.json();

    if (!verificationResult.success) {
      return NextResponse.json({ error: 'Invalid CAPTCHA' }, { status: 400 });
    }

    const formType = formData.get('formType') as string;
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const mobile = formData.get('mobile') as string;
    const stage = formData.get('stage') as string;
    const services = formData.getAll('service') as string[];
    const mortgageType = formData.get('mortgageType') as string | null;
    const selectedServices = services.length > 0 ? services : [];

    const to = `${process.env.EMAIL_TO_SEND}`;
    let subject, html, attachments: any[] = [];

    if (formType === 'learnMore') {
      subject = `Learn More Request: ${mortgageType || 'Mortgage Inquiry'}`;
      html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Learn More Request</h2>
        <p><strong>Mortgage Type:</strong> ${mortgageType || 'N/A'}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Mobile:</strong> ${mobile}</p>
        <p><strong>Stage in the Process:</strong> ${stage}</p>
        ${
          selectedServices.length > 0
            ? `<p><strong>Selected Services:</strong> ${selectedServices.join(', ')}</p>`
            : ''
        }
      </div>
    `;
    } else if (formType === 'contact') {
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const location = formData.get('location') as string;
      const contactMethod = formData.getAll('contactMethod') as string[];

      subject = 'Lead Alert: New Contact Form Submission';
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Phone:</strong> ${mobile}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Location:</strong> ${location}</p>
          <p><strong>Preferred Contact Method:</strong> ${contactMethod.join(', ')}</p>
        </div>
      `;
    } else if (formType === 'career') {
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const streetAddress = formData.get('streetAddress') as string;
      const addressLine2 = formData.get('addressLine2') as string;
      const city = formData.get('city') as string;
      const stateProvince = formData.get('stateProvince') as string;
      const zip = formData.get('zip') as string;
      const country = formData.get('country') as string;
      const experience = formData.get('experience') as string;
      const files = formData.getAll('cv') as File[];

      subject = 'Hire Alert: New Career Form Submission';
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Career Form Submission</h2>
          <p><strong>First Name:</strong> ${firstName}</p>
          <p><strong>Last Name:</strong> ${lastName}</p>
          <p><strong>Phone:</strong> ${mobile}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Street Address:</strong> ${streetAddress}</p>
          <p><strong>Address Line 2:</strong> ${addressLine2 || 'N/A'}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>State/Province:</strong> ${stateProvince}</p>
          <p><strong>ZIP/Postal Code:</strong> ${zip}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Years of Experience:</strong> ${experience} years</p>
        </div>
      `;

      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        attachments.push({
          filename: file.name,
          content: buffer,
          contentType: file.type,
        });
      }
    } else {
      console.error('Invalid form type:', formType);
      return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
      attachments,
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
