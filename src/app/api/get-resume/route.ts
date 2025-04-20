import {  NextResponse } from 'next/server';
import { connect } from '../../../../db/resumedb';
import Resume from '../../../../models/resume.model';
import { auth } from '@clerk/nextjs/server';

// GET method
export async function GET() {
  await connect(); // Connect to the MongoDB database

  try {
    const { userId } = auth();
    const resumes = await Resume.find({ userId: userId }); // Find all resumes for the authenticated user
    return NextResponse.json(resumes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}
