"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  Input,
  TextArea,
  Button,
  Switch,
  Label,
  ListBox,
  Select,
  toast
} from "@heroui/react";

// Gravity UI Icons Integration
import { ArrowRight, ChevronDown, Suitcase } from "@gravity-ui/icons";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobForm({ company }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    type: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    isRemote: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: ""
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isRemote, setIsRemote] = useState(false);

  // যদি ডাটাবেজে isApproved ফিল্ড না থাকে, তবে বাই-ডিফল্ট true ধরে নিবে (ফলস না হলে পোস্ট করতে দিবে)
  const canPost = company?.isApproved !== false;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, key) => {
    setFormData((prev) => ({ ...prev, [name]: key }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) return;

    setLoading(true);
    let isSuccess = false;

    const payload = {
      ...formData,
      companyId: company?.id || company?._id, // ডাটাবেজ অনুযায়ী id বা _id নিবে
      companyName: company?.name, // 👈 'neme' টাইপো ঠিক করা হয়েছে
      companyLogo: company?.logo,
      status: "active",
      createdAt: new Date().toISOString()
    };

    try {
      // action.js এ কল করে ডেটা পাঠানো হচ্ছে
      const res = await createJob(payload);
    
      if (res?.insertedId || res?.success) {
        isSuccess = true;
        toast.success("Job Posted Successfully");
        setSuccessMessage("Job has been successfully created and is now publicly active!");
        
        e.target.reset();
        setFormData({
          title: "", category: "", type: "", minSalary: "", maxSalary: "",
          currency: "USD", location: "", isRemote: false, deadline: "",
          responsibilities: "", requirements: "", benefits: ""
        });
        setIsRemote(false);
      }
    } catch (error) {
      error("Error creating job:", error);
      toast.error("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }

    // Redirect সবসময় try-catch ব্লকের বাইরে রাখতে হয় Next.js এ
    if (isSuccess) {
      redirect("/dashboard/recruiter/jobs");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-[#18181b] rounded-xl border border-zinc-800 p-8 shadow-2xl">

        {/* Header Block */}
        <div className="mb-8 border-b border-zinc-800 pb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <Suitcase className="text-zinc-400" size={22} /> Post a New Job
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Fill out the details below to publish a position on HireLoop.
          </p>
        </div>

        {/* Company Status Guardrail */}
        <div className="mb-6 p-4 rounded-lg flex items-center justify-between text-sm border bg-zinc-900/50 border-zinc-800 text-zinc-300">
          <div>
            <p className="font-semibold">
              Posting as: <span className="text-white">{company?.name || "Your Company"}</span>
            </p>
          </div>
          <div>
            {company?.isApproved === false ? (
              <span className="bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded text-xs border border-amber-500/30">Pending Approval</span>
            ) : (
              <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded text-xs border border-emerald-500/30">Active Status</span>
            )}
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-800 text-emerald-200 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        <Form onSubmit={handleSubmit} className="space-y-8" validationBehavior="native">

          {/* SECTION 1: JOB INFO */}
          <Fieldset className="space-y-5">
            <legend className="text-lg font-semibold text-white mb-2">Job Details</legend>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <Input
                required
                label="Job Title"
                name="title"
                placeholder="e.g. Senior Software Engineer"
                variant="flat"
                value={formData.title}
                onChange={handleInputChange}
                className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 h-11 rounded-xl"
              />

              {/* Composable Select: Job Category */}
              <Select
                className="w-full"
                placeholder="Select a category"
                selectedKey={formData.category}
                onSelectionChange={(key) => handleSelectChange("category", key)}
              >
                <Label className="text-xs text-zinc-400 font-medium mb-1 block">Job Category</Label>
                <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-700 h-11 px-3 rounded-xl flex items-center justify-between text-sm">
                  <Select.Value />
                  <ChevronDown className="text-zinc-500" size={16} />
                </Select.Trigger>
                <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-zinc-200 min-w-[250px]">
                  <ListBox className="p-1">
                    <ListBox.Item id="technology" textValue="Technology" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Technology</ListBox.Item>
                    <ListBox.Item id="design" textValue="Design" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Design & Creative</ListBox.Item>
                    <ListBox.Item id="marketing" textValue="Marketing" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Digital Marketing</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Composable Select: Job Type */}
              <Select
                className="w-full"
                placeholder="Select type"
                selectedKey={formData.type}
                onSelectionChange={(key) => handleSelectChange("type", key)}
              >
                <Label className="text-xs text-zinc-400 font-medium mb-1 block">Job Type</Label>
                <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-700 h-11 px-3 rounded-xl flex items-center justify-between text-sm">
                  <Select.Value />
                  <ChevronDown className="text-zinc-500" size={16} />
                </Select.Trigger>
                <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-zinc-200 min-w-[250px]">
                  <ListBox className="p-1">
                    <ListBox.Item id="full-time" textValue="Full-time" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Full-time</ListBox.Item>
                    <ListBox.Item id="remote" textValue="Remote" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Remote</ListBox.Item>
                    <ListBox.Item id="contract" textValue="Contract" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Contract</ListBox.Item>
                    <ListBox.Item id="internship" textValue="Internship" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Internship</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

              <Input
                required
                type="date"
                label="Application Deadline"
                name="deadline"
                placeholder=" "
                variant="flat"
                value={formData.deadline}
                onChange={handleInputChange}
                className="bg-zinc-900 border border-zinc-800 h-11 rounded-xl"
              />
            </div>

            {/* Salary Setup */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-end">
              <div>
                <Label className="text-xs text-zinc-400 font-medium mb-1 block">Minimum Salary</Label>
                <Input
                  required
                  type="number"
                  label="Min Salary"
                  name="minSalary"
                  placeholder="0"
                  variant="flat"
                  value={formData.minSalary}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border border-zinc-800 h-11 rounded-xl"
                />
              </div>

              <div>
                <Label className="text-xs text-zinc-400 font-medium mb-1 block">Maximum Salary</Label>
                <Input
                  required
                  type="number"
                  label="Max Salary"
                  name="maxSalary"
                  placeholder="0"
                  variant="flat"
                  value={formData.maxSalary}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border border-zinc-800 h-11 rounded-xl"
                />
              </div>

              {/* Composable Select: Currency */}
              <Select
                className="w-full"
                selectedKey={formData.currency}
                onSelectionChange={(key) => handleSelectChange("currency", key)}
              >
                <Label className="text-xs text-zinc-400 font-medium mb-1 block">Currency</Label>
                <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-700 h-11 px-3 rounded-xl flex items-center justify-between text-sm">
                  <Select.Value />
                  <ChevronDown className="text-zinc-500" size={16} />
                </Select.Trigger>
                <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-zinc-200 min-w-[150px]">
                  <ListBox className="p-1">
                    <ListBox.Item id="USD" textValue="USD ($)" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">USD ($)</ListBox.Item>
                    <ListBox.Item id="EUR" textValue="EUR (€)" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">EUR (€)</ListBox.Item>
                    <ListBox.Item id="BDT" textValue="BDT (৳)" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">BDT (৳)</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Location & Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-center pt-2">
              <div className="md:col-span-2">
                <Label className="text-xs text-zinc-400 font-medium mb-1 block">Location</Label>
                <Input
                  required={!formData.isRemote}
                  isDisabled={formData.isRemote} 
                  label="Location"
                  name="location"
                  placeholder={formData.isRemote ? "Everywhere (Remote)" : "e.g. New York, USA"}
                  variant="flat"
                  value={formData.isRemote ? "" : (formData.location || "")}
                  onChange={handleInputChange}
                  className="bg-zinc-900 border border-zinc-800 h-11 rounded-xl"
                />
              </div>

              {/* HeroUI Switch State Integration */}
              <div className="flex items-center justify-start md:justify-end h-full pt-4 md:pt-0">
                <Switch
                  isSelected={formData.isRemote}
                  onChange={(isSelected) => {
                    setFormData((prev) => ({
                      ...prev,
                      isRemote: isSelected,
                      location: isSelected ? "" : prev.location
                    }));
                  }}
                >
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Content>
                    <Label className="text-sm">Remote</Label>
                  </Switch.Content>
                </Switch>
              </div>
            </div>

          </Fieldset>

          {/* SECTION 2: JOB DESCRIPTION (Updated with proper labels) */}
          <Fieldset className="space-y-6 pt-6 border-t border-zinc-800">
            <legend className="text-lg font-semibold text-white mb-2">Job Context</legend>

            <div className="w-full">
              <Label className="text-sm text-zinc-300 font-medium mb-1.5 block">
                Responsibilities <span className="text-red-500">*</span>
              </Label>
              <TextArea
                required
                name="responsibilities"
                placeholder="Detail day-to-day core duties..."
                variant="flat"
                rows={4}
                value={formData.responsibilities}
                onChange={handleInputChange}
                className="bg-zinc-900 border border-zinc-800 rounded-xl w-full"
              />
            </div>

            <div className="w-full">
              <Label className="text-sm text-zinc-300 font-medium mb-1.5 block">
                Requirements <span className="text-red-500">*</span>
              </Label>
              <TextArea
                required
                name="requirements"
                placeholder="What experience or tech stacks are needed?"
                variant="flat"
                rows={4}
                value={formData.requirements}
                onChange={handleInputChange}
                className="bg-zinc-900 border border-zinc-800 rounded-xl w-full"
              />
            </div>

            <div className="w-full">
              <Label className="text-sm text-zinc-300 font-medium mb-1.5 block">
                Benefits (Optional)
              </Label>
              <TextArea
                name="benefits"
                placeholder="Healthcare, equity, or remote stipends..."
                variant="flat"
                rows={3}
                value={formData.benefits}
                onChange={handleInputChange}
                className="bg-zinc-900 border border-zinc-800 rounded-xl w-full"
              />
            </div>
          </Fieldset>

          {/* Footer Navigation Action Group */}
          <div className="flex items-center justify-end gap-4 border-t border-zinc-800 pt-6">
            <Button
              type="button"
              variant="bordered"
              className="border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-900 font-medium rounded-lg px-6"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={loading}
              isDisabled={!canPost} // 👈 HeroUI এর সঠিক প্রপস ব্যবহার করা হয়েছে
              className={`font-bold rounded-lg px-8 flex items-center gap-2 ${
                canPost
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
            >
              Publish Listing <ArrowRight size={16} />
            </Button>
          </div>

        </Form>
      </div>
    </div>
  );
}