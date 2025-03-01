import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the Resume structure
interface IExperience {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface IEducation {
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
}

interface ISkill {
  name: string;
}

export interface IResume extends Document {
  userId: string; // Reference to User model
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  summary: string;
  experience: IExperience[];
  education: IEducation[];
  skills: ISkill[];
}

// Define the schema
const skillSchema = new Schema({
  name: { type: String, required: true }
});

const resumeSchema: Schema = new Schema(
  {
    userId: { type: String, required: true }, // Reference to the user
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    summary: { type: String, required: true },
    experience: [
      {
        title: { type: String, required: true },
        companyName: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String },
        currentlyWorking: { type: Boolean, required: true },
      },
    ],
    education: [
      {
        universityName: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        degree: { type: String, required: true },
      },
    ],
    skills: [skillSchema],
  },
  { timestamps: true }
);

// Export the model
const Resume = mongoose.models.Resume || mongoose.model<IResume>('Resume', resumeSchema);
export default Resume;
