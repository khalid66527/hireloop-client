'use client';
import { useSession } from '@/lib/auth-client';
import React from 'react';
// বাটনটি Hero UI থেকে নেওয়া হয়েছে সুন্দর অ্যানিমেশনের জন্য
import { Button } from '@heroui/react'; 
import { ArrowShapeUp } from '@gravity-ui/icons';
import { createApplication } from '@/lib/actions/application';

const JobApply = ({ job }) => {

  const { data: session } = useSession();

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    const data = {
      ...formValues,
      userName: session?.user?.name || "Unknown User",
      userEmail: session?.user?.email || "No Email",
      jobTitle: job?.title,
      jobId: job?._id,
      companyName: job?.companyName,
    };

      const applicationData = await createApplication(data);
      
      if (applicationData.insertedId) {
        alert(' Application submitted successfully !');
        
        e.target.reset(); 
      }
   
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-gray-300 font-sans overflow-hidden py-12 px-4 sm:px-6">

      {/* Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Form Container */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">

          {/* Top Gradient Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Apply for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{job?.title || "Job"}</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Join the team at <span className="font-semibold text-gray-300">{job?.companyName || "Company"}</span>
            </p>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Portfolio Input (অরিজিনাল ডিজাইন রিকভার করা হয়েছে) */}
            <InputField
              label="Portfolio URL / LinkedIn"
              name="portfolio"
              type="url"
              placeholder="https://yourportfolio.com"
            />

            {/* Resume Link Area (অরিজিনাল ডিজাইন রিকভার করা হয়েছে) */}
            <InputField
              label="Resume / CV Link (Google Drive, Dropbox, etc.)"
              name="resumeLink"
              type="url"
              placeholder="https://link-to-your-resume.pdf"
              required
            />

            {/* Cover Letter (অরিজিনাল ডিজাইন এবং নো-এরর টেক্সট-এরিয়া) */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-300 ml-1">
                Cover Letter <span className="text-gray-500 font-normal">(Optional)</span>
              </label>
              <textarea
                name="additionalNotes"
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none"
                placeholder="Why are you a great fit for this role?"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-blue-600 hover:from-blue-500 to-purple-600 hover:to-purple-500 text-white text-lg font-bold tracking-wide rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] active:scale-95 flex items-center justify-center gap-2"
              >
                Submit Application <span> <ArrowShapeUp></ArrowShapeUp></span>
              </Button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

// --- আপনার অরিজিনাল Reusable Input Component টি হুবহু এখানে রাখা হলো ---
const InputField = ({ label, name, type, placeholder, required }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-300 ml-1">
      {label} {required && <span className="text-rose-400">*</span>}
    </label>
    <input
      type={type}
      name={name}
      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default JobApply;