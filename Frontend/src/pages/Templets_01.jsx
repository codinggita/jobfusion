"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Download, Plus, Trash2, Github, Linkedin, Twitter, Globe } from "lucide-react"

// Custom Button Component
const Button = ({ children, onClick, className = "", variant = "primary", size = "md", ...props }) => {
  const baseStyle = "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
  }
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    icon: "p-2",
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

// Custom Input Component
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  )
}

// Custom Textarea Component
const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  )
}

export default function ResumePage() {
  const [resumeData, setResumeData] = useState({
    name: "RICHARD SANCHEZ",
    title: "Product Designer",
    about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St., Any City",
    profileImage: null,
    socialLinks: [
      { platform: "github", url: "https://github.com/username" },
      { platform: "linkedin", url: "https://linkedin.com/in/username" },
    ],
    languages: ["English", "Germany (basic)"],
    skills: ["Management Skills", "Creativity", "Digital Marketing"],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce platform using React and Node.js",
        technologies: "React, Node.js, MongoDB",
      },
    ],
    education: [
      {
        university: "Borcelle University",
        degree: "Bachelor of Business Management",
        period: "2014 - 2025",
      },
    ],
    certificates: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2023",
      },
      {
        name: "Google Professional Cloud Developer",
        issuer: "Google Cloud",
        year: "2022",
      },
    ],
    themeColor: "#003087",
  })

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setResumeData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const addItem = (section, defaultItem) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultItem],
    }))
  }

  const removeItem = (section, index) => {
    if (resumeData[section].length > 1) {
      setResumeData((prev) => ({
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index),
      }))
    }
  }

  const addSocialLink = () => {
    addItem("socialLinks", { platform: "github", url: "" })
  }

  const handleDownload = () => {
    window.print()
  }

  const socialIcons = {
    github: <Github className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    website: <Globe className="h-5 w-5" />,
  }

