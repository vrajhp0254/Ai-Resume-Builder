import { NextResponse } from 'next/server';
import { connect } from '../../../../db/resumedb';
import Resume, { IResume } from '../../../../models/resume.model';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    // Connect to the database
    await connect();
    
    // Get the authenticated user's userId
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Extract resume data from the request body
    const {
      firstName,
      lastName,
      jobTitle,
      address,
      phone,
      email,
      summary,
      experience,
      education,
      skills,
      theme,
    }: IResume & { theme: string } = await req.json(); // Use req.json() to parse the request body

    // Create a new resume document with the Clerk userId
    const newResume = new Resume({
      userId,  // Add the authenticated user's userId
      firstName,
      lastName,
      jobTitle,
      address,
      phone,
      email,
      summary,
      experience,
      education,
      skills,
      theme,
    });

    // Save the resume in the database
    const savedResume = await newResume.save();

    return NextResponse.json(savedResume, { status: 201 });
  } catch (error) {
    console.error('Error creating resume:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
