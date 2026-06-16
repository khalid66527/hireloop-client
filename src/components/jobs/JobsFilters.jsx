"use client";

import React, { useState, useEffect } from "react";
import { 
  Dropdown, 
  Button, 
  Label, 
  TextField, 
  InputGroup 
} from "@heroui/react";
import { Magnifier, Briefcase, MapPin, Funnel } from "@gravity-ui/icons";

export default function JobFilters({ onFilterChange }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    type: "",
    location: ""
  });

  // ফিল্টার আপডেট হলে প্যারেন্টকে ডেটা পাঠানো
  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleUpdate = (key, value) => {
    setFilters((prev) => ({ 
      ...prev, 
      [key]: value === "all" ? "" : value 
    }));
  };

  return (
    <div className="w-full bg-[#18181b] p-4 rounded-xl border border-zinc-800 shadow-lg flex flex-col lg:flex-row gap-4 items-center justify-between mb-8 z-10 relative">
      
      {/* Search Bar */}
      <div className="w-full lg:flex-1">
        <TextField aria-label="Search Jobs">
          <InputGroup className="bg-zinc-900 border border-zinc-800 rounded-lg h-11 focus-within:border-zinc-600 transition-colors">
            <InputGroup.Prefix className="pl-3 text-zinc-500">
              <Magnifier size={18} />
            </InputGroup.Prefix>
            <InputGroup.Input 
              value={filters.search}
              onChange={(e) => handleUpdate("search", e.target.value)}
              placeholder="Search by job title or company..." 
              className="bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 w-full px-2 outline-none"
            />
          </InputGroup>
        </TextField>
      </div>

      {/* Filters Container */}
      <div className="w-full lg:w-auto flex flex-wrap md:flex-nowrap items-center gap-3">
        
        {/* Category Dropdown */}
        <Dropdown>
          <Dropdown.Trigger>
            <Button className="h-11 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 rounded-lg px-4 flex items-center gap-2 text-sm w-full md:w-auto justify-start">
              <Funnel size={16} className="text-zinc-500" />
              {filters.category ? filters.category : "Category"}
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl min-w-[200px]">
            <Dropdown.Menu 
              onAction={(key) => handleUpdate("category", key)}
              className="p-1"
            >
              <Dropdown.Item id="all" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">All Categories</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Security" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Security</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Web Development" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Web Development</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Information Technology" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">IT</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Design" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Design</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Job Type Dropdown */}
        <Dropdown>
          <Dropdown.Trigger>
            <Button className="h-11 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 rounded-lg px-4 flex items-center gap-2 text-sm w-full md:w-auto justify-start">
              <Briefcase size={16} className="text-zinc-500" />
              {filters.type ? filters.type : "Job Type"}
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl min-w-[180px]">
            <Dropdown.Menu 
              onAction={(key) => handleUpdate("type", key)}
              className="p-1"
            >
              <Dropdown.Item id="all" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">All Types</Label>
              </Dropdown.Item>
              <Dropdown.Item id="full-time" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Full-time</Label>
              </Dropdown.Item>
              <Dropdown.Item id="part-time" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Part-time</Label>
              </Dropdown.Item>
              <Dropdown.Item id="contract" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Contract</Label>
              </Dropdown.Item>
              <Dropdown.Item id="freelance" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Freelance</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Location Dropdown */}
        <Dropdown>
          <Dropdown.Trigger>
            <Button className="h-11 bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 rounded-lg px-4 flex items-center gap-2 text-sm w-full md:w-auto justify-start">
              <MapPin size={16} className="text-zinc-500" />
              {filters.location ? filters.location : "Location"}
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Popover className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl min-w-[180px]">
            <Dropdown.Menu 
              onAction={(key) => handleUpdate("location", key)}
              className="p-1"
            >
              <Dropdown.Item id="all" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Anywhere</Label>
              </Dropdown.Item>
              <Dropdown.Item id="Remote" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Remote Only</Label>
              </Dropdown.Item>
              <Dropdown.Item id="DHAKA" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Dhaka</Label>
              </Dropdown.Item>
              <Dropdown.Item id="SYLHET" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Sylhet</Label>
              </Dropdown.Item>
              <Dropdown.Item id="CHITTAGONG" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Chittagong</Label>
              </Dropdown.Item>
              <Dropdown.Item id="RAJSHAHI" className="hover:bg-zinc-800 rounded-lg p-2 cursor-pointer">
                <Label className="text-sm text-zinc-300">Rajshahi</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>

        {/* Clear Filters Button */}
        {(filters.search || filters.category || filters.type || filters.location) && (
          <Button 
            onPress={() => setFilters({ search: "", category: "", type: "", location: "" })}
            className="h-11 bg-transparent text-[#fca5a5] hover:bg-red-500/10 px-4 text-sm rounded-lg transition-colors font-medium ml-auto md:ml-0"
          >
            Clear
          </Button>
        )}

      </div>
    </div>
  );
}