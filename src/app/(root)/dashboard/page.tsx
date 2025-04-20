"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Resume {
  _id: string; // Change id to _id
  title: string;
  createdAt: string;
}

const Dashboard = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch resumes from backend (replace with your API)
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch('/api/get-resume'); // API endpoint to fetch resumes
        if (!res.ok) {
          throw new Error(`Failed to fetch resumes: ${res.statusText}`);
        }
        const data = await res.json();
        setResumes(data);
      } catch (err) {
        console.error('Error fetching resumes:', err);
        setError('Failed to load resumes. Please try again later.');
      }
    };

    fetchResumes();
  }, []);

  const handleDelete = async (_id: string) => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      try {
        const res = await fetch(`/api/resumes/${_id}`, { method: 'DELETE' });
        if (!res.ok) {
          throw new Error(`Failed to delete resume: ${res.statusText}`);
        }
        setResumes((prevResumes) => prevResumes.filter((resume) => resume._id !== _id));
      } catch (err) {
        console.error('Error deleting resume:', err);
        alert('Failed to delete the resume. Please try again.');
      }
    }
  };

  return (
    <div className="mt-16 py-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 flex justify-between">
          <h2 className="text-3xl font-bold text-center mb-6">Your Resumes</h2>

          {/* Action to create a new resume */}
          <Link href="/resume">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
              Create New Resume
            </div>
          </Link>
        </div>

        {/* Show error message if fetching resumes fails */}
        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : resumes?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {resumes.map((resume, index) => (
              <div key={resume._id} className="bg-white shadow-lg rounded-lg p-6 border-2 border-blue-500">
                <h3 className="text-xl font-semibold mb-4">{resume.title || `Resume ${index + 1}`}</h3>
                <p className="text-gray-600 mb-4">
                  Created on: {new Date(resume.createdAt).toLocaleDateString()}
                </p>
                <div className="flex space-x-4">
                  {/* View Resume */}
                  <Link href={`/resume/view/${resume._id}`}>
                    <div className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">View</div>
                  </Link>
                  {/* Delete Resume */}
                  <button
                    onClick={() => handleDelete(resume._id)} // Pass _id to handleDelete
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You don't have any resumes yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
