"use client";

import React, { useState, useRef } from "react";
import {
  ArrowUp,
  MapPin,
  Globe,
  OfficeBadge,
  Persons,
  Pencil,
  Check,
  Clock,
  Xmark,
  ChevronDown
} from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Form,
  Fieldset,
  Select,
  ListBox,
  TextArea,
  Chip,

} from "@heroui/react";
import { createCompany } from "@/lib/actions/company";
import { toast } from "react-toastify";

const CompanyProfile = ({recruiter ,recruiterCompany}) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);

  const fileInputRef = useRef(null);

  const [company, setCompany] = useState(recruiterCompany);
  const [loading, setLoading] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  // Still keeping this state for real-time UI updates (controlled inputs) and edits
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    location: "",
    employeeCount: "",
    logo: "",
    description: "",
    status: "Pending",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, key) => {
    const value = Array.from(key)[0];
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingLogo(true);
    const imgData = new FormData();
    imgData.append("image", file);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: imgData,
      });
      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, logo: data.data.url }));
      }
    } catch (error) {
      console.error("Logo upload failed", error);
    } finally {
      setUploadingLogo(false);
    }
  };

  // UPDATED: Native FormData extraction & standard Fetch API format
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Extract all form data natively
    const formElement = e.currentTarget;
    const nativeFormData = new FormData(formElement);
    const extractedData = Object.fromEntries(nativeFormData.entries());

    // 2. Merge with logo URL and status
    const finalPayload = {
      ...extractedData,
      logo: formData.logo,
      status: company ? company.status : "Pending",
      recruiterId:recruiter.id
    };
    // setCompany(finalPayload)

    console.log("company profile create successfully !", finalPayload);




    try {

      const Payload = createCompany(finalPayload)
      if (Payload.insertedId) {
        alert("Company Profile Created Successfully!");
        toast.success("Company Profile Created Successfully!");

      }

      setCompany(finalPayload);
      setIsOpen(false);

    } catch (error) {
      console.error("Submission error:", error);

    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setFormData(company);
    onOpen();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return "success";
      case "rejected": return "danger";
      default: return "warning";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "approved": return <Check className="size-4" />;
      case "rejected": return <Xmark className="size-4" />;
      default: return <Clock className="size-4" />;
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-foreground">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Company Profile</h1>
          <p className="text-sm text-zinc-400 mt-1">Manage your business details and hiring presence.</p>
        </div>

        {!company._id && (
          <Button onPress={onOpen} className="bg-white text-black font-semibold rounded-lg px-6">
            Register Company
          </Button>
        )}
      </div>

      {!company._id ? (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-700 rounded-2xl bg-[#18181b] text-center">
          <OfficeBadge className="size-16 text-zinc-600 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">No Company Registered Yet</h2>
          <p className="text-zinc-400 max-w-md mb-6">
            You need to register your company profile before you can start posting jobs on HireLoop.
          </p>
          <Button onPress={onOpen} className="bg-white text-black font-semibold rounded-lg px-8">
            Register Now
          </Button>
        </div>
      ) : (
        <div className="border border-zinc-800 bg-[#18181b] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-6 right-6">
            <Button onPress={handleEdit} variant="flat" className="bg-zinc-800 text-white hover:bg-zinc-700">
              <Pencil className="size-4 mr-1" /> Edit Profile
            </Button>
          </div>

          <div className="flex items-start gap-6">
            <div className="size-24 rounded-xl border border-zinc-700 bg-zinc-900 overflow-hidden flex items-center justify-center shrink-0">
              {company.logo ? (
                <img src={company.logo} alt="Company Logo" className="w-full h-full object-cover" />
              ) : (
                <OfficeBadge className="size-10 text-zinc-600" />
              )}
            </div>

            <div className="flex-1 pt-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{company.name}</h2>
                <Chip size="sm" variant="flat" color={getStatusColor(company.status)} className="capitalize gap-1 px-2">
                  <div className="flex items-center gap-1.5">
                    {getStatusIcon(company.status)} {company.status}
                  </div>
                </Chip>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5"><OfficeBadge className="size-4" /> {company.industry}</span>
                <span className="flex items-center gap-1.5"><MapPin className="size-4" /> {company.location}</span>
                <span className="flex items-center gap-1.5"><Persons className="size-4" /> {company.employeeCount}</span>
                <span className="flex items-center gap-1.5"><Globe className="size-4" /> <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{company.website}</a></span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-3">About Company</h3>
            <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {company.description || "No description provided."}
            </p>
          </div>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="bg-[#18181b] border border-zinc-800 shadow-2xl sm:max-w-2xl text-foreground">
              <Modal.CloseTrigger className="text-zinc-400 hover:text-white" />

              <Modal.Header className="flex flex-col gap-1 px-6 py-5 border-b border-zinc-800">
                <Modal.Heading className="text-xl font-semibold text-white">
                  {company ? "Edit Company Profile" : "Register New Company"}
                </Modal.Heading>
                <p className="text-sm font-normal text-zinc-400 mt-1">
                  Enter your business details to start hiring on HireLoop.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <Form onSubmit={handleSubmit} validationBehavior="native" className="w-full">
                  <Fieldset className="space-y-6 w-full">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                      <div className="w-full">
                        <Label className="text-xs text-zinc-400 font-medium mb-1.5 block">Company Name</Label>
                        <Input
                          required
                          name="name"
                          placeholder="e.g. Acme Corp"
                          variant="flat"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 h-11 rounded-xl w-full"
                        />
                      </div>

                      <Select
                        className="w-full"
                        name="industry" // UPDATED: Added name attribute
                        placeholder="Select industry"
                        selectedKeys={formData.industry ? new Set([formData.industry]) : undefined}
                        onSelectionChange={(key) => handleSelectChange("industry", key)}
                      >
                        <Label className="text-xs text-zinc-400 font-medium mb-1.5 block">Industry / Category</Label>
                        <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-700 h-11 px-3 rounded-xl flex items-center justify-between text-sm w-full">
                          <Select.Value />
                          <ChevronDown className="text-zinc-500" size={16} />
                        </Select.Trigger>
                        <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-zinc-200 min-w-[250px]">
                          <ListBox className="p-1">
                            <ListBox.Item key="Technology" textValue="Technology" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Technology</ListBox.Item>
                            <ListBox.Item key="Finance" textValue="Finance" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Finance</ListBox.Item>
                            <ListBox.Item key="Healthcare" textValue="Healthcare" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Healthcare</ListBox.Item>
                            <ListBox.Item key="Education" textValue="Education" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">Education</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                      <div className="w-full">
                        <Label className="text-xs text-zinc-400 font-medium mb-1.5 block">Website URL</Label>
                        <div className="flex bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl overflow-hidden h-11 focus-within:border-zinc-500 transition-colors">
                          <div className="px-3 flex items-center justify-center bg-zinc-800 border-r border-zinc-800 text-xs text-zinc-400 font-medium">
                            https://
                          </div>
                          <input
                            required
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="flex-1 bg-transparent px-3 text-sm outline-none text-zinc-200 placeholder:text-zinc-600"
                            placeholder="www.company.com"
                          />
                        </div>
                      </div>

                      <div className="w-full">
                        <Label className="text-xs text-zinc-400 font-medium mb-1.5 block">Location</Label>
                        <div className="relative flex items-center h-11 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl focus-within:border-zinc-500 transition-colors">
                          <div className="absolute left-3 flex items-center justify-center pointer-events-none">
                            <MapPin className="size-4 text-zinc-500" />
                          </div>
                          <input
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full bg-transparent pl-9 pr-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
                            placeholder="City, Country"
                          />
                        </div>
                      </div>  
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full items-start">
                      <Select
                        className="w-full"
                        name="employeeCount" // UPDATED: Added name attribute
                        placeholder="Select range"
                        selectedKeys={formData.employeeCount ? new Set([formData.employeeCount]) : undefined}
                        onSelectionChange={(key) => handleSelectChange("employeeCount", key)}
                      >
                        <Label className="text-xs text-zinc-400 font-medium mb-1.5 block">Employee Count Range</Label>
                        <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-zinc-200 hover:border-zinc-700 h-11 px-3 rounded-xl flex items-center justify-between text-sm w-full">
                          <Select.Value />
                          <ChevronDown className="text-zinc-500" size={16} />
                        </Select.Trigger>
                        <Select.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl text-zinc-200 min-w-[250px]">
                          <ListBox className="p-1">
                            <ListBox.Item key="1-10 employees" textValue="1-10 employees" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">1-10 employees</ListBox.Item>
                            <ListBox.Item key="11-50 employees" textValue="11-50 employees" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">11-50 employees</ListBox.Item>
                            <ListBox.Item key="51-200 employees" textValue="51-200 employees" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">51-200 employees</ListBox.Item>
                            <ListBox.Item key="201+ employees" textValue="201+ employees" className="hover:bg-zinc-800 p-2 rounded-lg cursor-pointer text-sm">201+ employees</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      <div className="w-full">
                        <Label className="text-xs text-zinc-400 font-medium mb-1.5 block">Company Logo</Label>
                        <div className="flex items-center gap-4 mt-1">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex size-12 cursor-pointer items-center justify-center rounded-xl border border-dashed border-zinc-600 bg-zinc-900 transition-colors hover:bg-zinc-800 relative overflow-hidden shrink-0"
                          >
                            {formData.logo ? (
                              <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                              <ArrowUp className="size-5 text-zinc-400" />
                            )}
                          </button>

                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleLogoUpload}
                          />

                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">
                              {uploadingLogo ? "Uploading..." : "Upload image"}
                            </span>
                            <span className="text-xs text-zinc-500 mt-0.5">PNG, JPG up to 5MB</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full">
                      <Label className="text-xs text-zinc-400 font-medium mb-1.5 block">Brief Description</Label>
                      <TextArea
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Tell us about your company's mission and culture..."
                        variant="flat"
                        minRows={4}
                        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl w-full"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                      <Button
                        type="button"
                        onPress={() => setIsOpen(false)}
                        variant="light"
                        className="text-zinc-300 hover:bg-zinc-800 rounded-lg px-6"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        isLoading={loading || uploadingLogo}
                        className="bg-white text-black font-semibold rounded-lg px-6"
                      >
                        {company ? "Save Changes" : "Register Company"}
                      </Button>
                    </div>

                  </Fieldset>
                </Form>
              </Modal.Body>

            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
};

export default CompanyProfile;