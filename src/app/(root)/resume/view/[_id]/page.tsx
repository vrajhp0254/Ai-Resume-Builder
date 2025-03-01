"use client";
import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { themes, ThemeConfig } from '@/app/themes/resumeThemes';

interface Experience {
  title: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate?: string;
  currentlyWorking: boolean;
  description: string;
}

interface Education {
  universityName: string;
  startDate: string;
  endDate: string;
  degree: string;
}

interface Skill {
  name: string;
}

interface ResumeData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  theme?: string;
}

const Page = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const { _id } = useParams(); // Use useParams to get the dynamic ID

  useEffect(() => {
    const fetchResume = async () => {
      if (_id) {
        const response = await fetch(`/api/resumes/${_id}`);
        if (response.ok) {
          const data: ResumeData = await response.json();
          setResumeData(data);
        } else {
          console.error("Failed to fetch resume data");
        }
      }
    };

    fetchResume();
  }, [_id]);

  const generateResumePDF = (resumeData: ResumeData): void => {
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
      theme = 'modern' // default theme
    } = resumeData;

    const themeConfig: ThemeConfig = themes[theme] || themes.modern;
    const doc = new jsPDF();
    const margin = themeConfig.spacing.margin;
    let yPos = margin;

    // Header
    doc.setFont(themeConfig.fonts.title);
    doc.setTextColor(themeConfig.colors.primary);
    doc.setFontSize(24);
    doc.text(`${firstName} ${lastName}`, margin, yPos);
    yPos += 12;

    // Job Title
    doc.setFont(themeConfig.fonts.heading);
    doc.setTextColor(themeConfig.colors.secondary);
    doc.setFontSize(16);
    doc.text(jobTitle, margin, yPos);
    yPos += 15;

    // Contact Info
    doc.setFont(themeConfig.fonts.body);
    doc.setTextColor(themeConfig.colors.text);
    doc.setFontSize(10);
    const contactInfo = [
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Address: ${address}`
    ];
    contactInfo.forEach(info => {
      doc.text(info, margin, yPos);
      yPos += 6;
    });
    yPos += 10;

    // Summary
    doc.setFont(themeConfig.fonts.heading);
    doc.setTextColor(themeConfig.colors.primary);
    doc.setFontSize(14);
    doc.text("Professional Summary", margin, yPos);
    yPos += 8;

    doc.setFont(themeConfig.fonts.body);
    doc.setTextColor(themeConfig.colors.text);
    doc.setFontSize(11);
    const summaryLines = doc.splitTextToSize(summary, 170);
    summaryLines.forEach(line => {
      doc.text(line, margin, yPos);
      yPos += 6;
    });
    yPos += 10;

    // Experience Section
    doc.setFont(themeConfig.fonts.heading);
    doc.setTextColor(themeConfig.colors.primary);
    doc.setFontSize(14);
    doc.text("Professional Experience", margin, yPos);
    yPos += 8;

    experience.forEach(exp => {
      // Job Title and Company
      doc.setFont(themeConfig.fonts.heading);
      doc.setTextColor(themeConfig.colors.secondary);
      doc.setFontSize(12);
      doc.text(`${exp.title} at ${exp.companyName}`, margin, yPos);
      yPos += 6;

      // Location and Dates
      doc.setFont(themeConfig.fonts.body);
      doc.setTextColor(themeConfig.colors.text);
      doc.setFontSize(10);
      const dateRange = `${exp.startDate} - ${exp.currentlyWorking ? 'Present' : exp.endDate}`;
      doc.text(`${exp.city}, ${exp.state} | ${dateRange}`, margin, yPos);
      yPos += 6;

      // Description - Check if exists and handle line breaks
      if (exp.description) {
        const maxWidth = 170; // Maximum width for text
        const descLines = doc.splitTextToSize(exp.description, maxWidth);
        descLines.forEach(line => {
          if (yPos > 270) { // Check if we need a new page
            doc.addPage();
            yPos = margin;
          }
          doc.text(line, margin, yPos);
          yPos += 5;
        });
      }
      yPos += 8;
    });

    // Education Section
    yPos += 5;
    doc.setFont(themeConfig.fonts.heading);
    doc.setTextColor(themeConfig.colors.primary);
    doc.setFontSize(14);
    doc.text("Education", margin, yPos);
    yPos += 8;

    education.forEach(edu => {
      if (yPos > 270) {
        doc.addPage();
        yPos = margin;
      }
      doc.setFont(themeConfig.fonts.body);
      doc.setTextColor(themeConfig.colors.text);
      doc.setFontSize(12);
      doc.text(`${edu.degree} from ${edu.universityName}`, margin, yPos);
      yPos += 5;
      doc.setFontSize(10);
      doc.text(`${edu.startDate} - ${edu.endDate}`, margin, yPos);
      yPos += 8;
    });

    // Skills Section
    yPos += 5;
    doc.setFont(themeConfig.fonts.heading);
    doc.setTextColor(themeConfig.colors.primary);
    doc.setFontSize(14);
    doc.text("Skills", margin, yPos);
    yPos += 8;

    // Format skills in columns
    const skillsPerLine = 3;
    const skillGroups = [];
    for (let i = 0; i < skills.length; i += skillsPerLine) {
      skillGroups.push(skills.slice(i, i + skillsPerLine));
    }

    doc.setFont(themeConfig.fonts.body);
    doc.setTextColor(themeConfig.colors.text);
    doc.setFontSize(11);

    skillGroups.forEach(group => {
      if (yPos > 270) {
        doc.addPage();
        yPos = margin;
      }
      const skillLine = group.map(skill => skill.name).join("  •  ");
      doc.text(skillLine, margin, yPos);
      yPos += 6;
    });

    // Save the PDF
    doc.save(`${firstName}_${lastName}_Resume.pdf`);
  };
  
  return (
    <div>
      {resumeData ? (
        <div className="mt-24 flex items-center justify-center">
          <button className="text-white bg-blue-600 p-2" onClick={() => generateResumePDF(resumeData)}>
            Download Resume
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

};

export default Page;
