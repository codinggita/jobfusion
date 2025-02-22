import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";
import { Phone, Mail, MapPin, Download, Plus, Trash2, Github, Linkedin, Twitter, Globe } from "lucide-react";

// Custom Button Component
const Button = ({ children, onClick, className = "", variant = "primary", size = "md", ...props }) => {
  const baseStyle = "rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    ghost: "text-gray-600 hover:bg-gray-100 focus:ring-gray-500",
  };
  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    icon: "p-2",
  };
  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Custom Input Component
const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

// Custom Textarea Component
const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    objectFit: "cover",
    border: "4px solid rgba(255, 255, 255, 0.3)",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    opacity: 0.9,
    marginTop: 4,
  },
  container: {
    flexDirection: "row",
  },
  leftColumn: {
    width: "35%",
    padding: 20,
  },
  rightColumn: {
    width: "65%",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    paddingBottom: 4,
    borderBottom: "2px solid",
  },
  text: {
    fontSize: 12,
    marginBottom: 6,
  },
  whiteText: {
    fontSize: 12,
    marginBottom: 6,
  },
});

// PDF Document Component
const ResumePDF = ({ resumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={[styles.header, { backgroundColor: resumeData.primaryColor }]}>
        <Image src={resumeData.profileImage || "https://via.placeholder.com/100"} style={styles.profileImage} />
        <View>
          <Text style={[styles.name, { color: resumeData.headerTextColor }]}>{resumeData.name}</Text>
          <Text style={[styles.title, { color: resumeData.headerTextColor }]}>{resumeData.title}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={[styles.leftColumn, { backgroundColor: resumeData.secondaryColor }]}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...styles.sectionTitle,
                color: resumeData.sidebarTextColor,
                borderBottomColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              About Me
            </Text>
            <Text style={[styles.whiteText, { color: resumeData.sidebarTextColor }]}>{resumeData.about}</Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...styles.sectionTitle,
                color: resumeData.sidebarTextColor,
                borderBottomColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              Contact
            </Text>
            <Text style={[styles.whiteText, { color: resumeData.sidebarTextColor }]}>
              <Phone size={14} style={{ display: "inline", marginRight: 8 }} /> {resumeData.phone}
            </Text>
            <Text style={[styles.whiteText, { color: resumeData.sidebarTextColor }]}>
              <Mail size={14} style={{ display: "inline", marginRight: 8 }} /> {resumeData.email}
            </Text>
            <Text style={[styles.whiteText, { color: resumeData.sidebarTextColor }]}>
              <MapPin size={14} style={{ display: "inline", marginRight: 8 }} /> {resumeData.address}
            </Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...styles.sectionTitle,
                color: resumeData.sidebarTextColor,
                borderBottomColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              Social Links
            </Text>
            {resumeData.socialLinks.map((link, index) => (
              <Text key={index} style={[styles.whiteText, { color: resumeData.sidebarTextColor }]}>
                {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}: {link.url}
              </Text>
            ))}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...styles.sectionTitle,
                color: resumeData.sidebarTextColor,
                borderBottomColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              Languages
            </Text>
            {resumeData.languages.map((language, index) => (
              <Text key={index} style={[styles.whiteText, { color: resumeData.sidebarTextColor }]}>
                {language}
              </Text>
            ))}
          </View>

          <View>
            <Text
              style={{
                ...styles.sectionTitle,
                color: resumeData.sidebarTextColor,
                borderBottomColor: "rgba(255, 255, 255, 0.3)",
              }}
            >
              Skills
            </Text>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={[styles.whiteText, { color: resumeData.sidebarTextColor }]}>
                • {skill}
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...styles.sectionTitle,
                color: resumeData.primaryColor,
                borderBottomColor: resumeData.primaryColor,
              }}
            >
              Projects
            </Text>
            {resumeData.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: resumeData.mainTextColor, marginBottom: 4 }}>
                  {project.name}
                </Text>
                <Text style={[styles.text, { color: resumeData.mainTextColor }]}>{project.description}</Text>
                <Text style={[styles.text, { color: resumeData.mainTextColor }]}>
                  Technologies: {project.technologies}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...styles.sectionTitle,
                color: resumeData.primaryColor,
                borderBottomColor: resumeData.primaryColor,
              }}
            >
              Education
            </Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: resumeData.mainTextColor, marginBottom: 2 }}>
                  {edu.university}
                </Text>
                <Text style={[styles.text, { color: resumeData.mainTextColor }]}>{edu.degree}</Text>
                <Text style={[styles.text, { color: resumeData.mainTextColor }]}>{edu.period}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text
              style={{
                ...styles.sectionTitle,
                color: resumeData.primaryColor,
                borderBottomColor: resumeData.primaryColor,
              }}
            >
              Certificates
            </Text>
            {resumeData.certificates.map((cert, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: resumeData.mainTextColor, marginBottom: 2 }}>
                  {cert.name}
                </Text>
                <Text style={[styles.text, { color: resumeData.mainTextColor }]}>{cert.issuer}</Text>
                <Text style={[styles.text, { color: resumeData.mainTextColor }]}>{cert.year}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

function ResumePage() {
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
      { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
      { name: "Google Professional Cloud Developer", issuer: "Google Cloud", year: "2022" },
    ],
    primaryColor: "#003087",
    secondaryColor: "#000000",
    headerTextColor: "#ffffff",
    sidebarTextColor: "#ffffff",
    mainTextColor: "#333333",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setResumeData((prev) => ({ ...prev, profileImage: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const addItem = (section, defaultItem) => {
    setResumeData((prev) => ({ ...prev, [section]: [...prev[section], defaultItem] }));
  };

  const removeItem = (section, index) => {
    if (resumeData[section].length > 1) {
      setResumeData((prev) => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
    }
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResumePDF resumeData={resumeData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const socialIcons = {
    github: <Github className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    website: <Globe className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Controls Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-wrap gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Header Color:</label>
              <Input
                type="color"
                value={resumeData.primaryColor}
                onChange={(e) => setResumeData((prev) => ({ ...prev, primaryColor: e.target.value }))}
                className="w-12 h-10 p-1 rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Header Text:</label>
              <Input
                type="color"
                value={resumeData.headerTextColor}
                onChange={(e) => setResumeData((prev) => ({ ...prev, headerTextColor: e.target.value }))}
                className="w-12 h-10 p-1 rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sidebar Color:</label>
              <Input
                type="color"
                value={resumeData.secondaryColor}
                onChange={(e) => setResumeData((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                className="w-12 h-10 p-1 rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Sidebar Text:</label>
              <Input
                type="color"
                value={resumeData.sidebarTextColor}
                onChange={(e) => setResumeData((prev) => ({ ...prev, sidebarTextColor: e.target.value }))}
                className="w-12 h-10 p-1 rounded"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Main Text:</label>
              <Input
                type="color"
                value={resumeData.mainTextColor}
                onChange={(e) => setResumeData((prev) => ({ ...prev, mainTextColor: e.target.value }))}
                className="w-12 h-10 p-1 rounded"
              />
            </div>
          </div>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>

        {/* Resume Content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex" style={{ minWidth: "100%" }}>
          <div style={{ flex: "0 0 35%", backgroundColor: resumeData.secondaryColor }} className="p-6 text-white">
            <div style={{ backgroundColor: resumeData.primaryColor, margin: "-1.5rem -1.5rem 1.5rem -1.5rem", padding: "1.5rem" }}>
              <div className="flex items-center gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 flex-shrink-0">
                  <label className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity text-white text-sm">
                    Upload Photo
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  <img
                    src={resumeData.profileImage || "https://via.placeholder.com/100"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={resumeData.name}
                    onChange={(e) => setResumeData((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-transparent border-none text-4xl font-bold w-full mb-2"
                    style={{ color: resumeData.headerTextColor }}
                  />
                  <Input
                    value={resumeData.title}
                    onChange={(e) => setResumeData((prev) => ({ ...prev, title: e.target.value }))}
                    className="bg-transparent border-none text-lg w-full"
                    style={{ color: resumeData.headerTextColor }}
                  />
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 border-b-2 border-white/30 pb-2" style={{ color: resumeData.sidebarTextColor }}>
                About Me
              </h2>
              <Textarea
                value={resumeData.about}
                onChange={(e) => setResumeData((prev) => ({ ...prev, about: e.target.value }))}
                className="bg-transparent border-none resize-none w-full"
                style={{ color: resumeData.sidebarTextColor }}
                rows={4}
              />
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-3 border-b-2 border-white/30 pb-2" style={{ color: resumeData.sidebarTextColor }}>
                Contact
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" style={{ color: resumeData.sidebarTextColor }} />
                  <Input
                    value={resumeData.phone}
                    onChange={(e) => setResumeData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="bg-transparent border-none"
                    style={{ color: resumeData.sidebarTextColor }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" style={{ color: resumeData.sidebarTextColor }} />
                  <Input
                    value={resumeData.email}
                    onChange={(e) => setResumeData((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-transparent border-none"
                    style={{ color: resumeData.sidebarTextColor }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" style={{ color: resumeData.sidebarTextColor }} />
                  <Input
                    value={resumeData.address}
                    onChange={(e) => setResumeData((prev) => ({ ...prev, address: e.target.value }))}
                    className="bg-transparent border-none"
                    style={{ color: resumeData.sidebarTextColor }}
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold border-b-2 border-white/30 pb-2" style={{ color: resumeData.sidebarTextColor }}>
                  Social Links
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => addItem("socialLinks", { platform: "github", url: "" })}
                  className="text-white"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {resumeData.socialLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-2 mb-3">
                  {socialIcons[link.platform]}
                  <select
                    value={link.platform}
                    onChange={(e) => {
                      const newLinks = [...resumeData.socialLinks];
                      newLinks[index] = { ...link, platform: e.target.value };
                      setResumeData((prev) => ({ ...prev, socialLinks: newLinks }));
                    }}
                    className="bg-black text-white border border-white/30 rounded px-2 py-1"
                  >
                    <option value="github">GitHub</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="twitter">Twitter</option>
                    <option value="website">Website</option>
                  </select>
                  <Input
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...resumeData.socialLinks];
                      newLinks[index] = { ...link, url: e.target.value };
                      setResumeData((prev) => ({ ...prev, socialLinks: newLinks }));
                    }}
                    className="bg-transparent border-none flex-1"
                    style={{ color: resumeData.sidebarTextColor }}
                    placeholder="URL"
                  />
                  {resumeData.socialLinks.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("socialLinks", index)}
                      className="text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </section>

            <section className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold border-b-2 border-white/30 pb-2" style={{ color: resumeData.sidebarTextColor }}>
                  Languages
                </h2>
                <Button variant="ghost" size="icon" onClick={() => addItem("languages", "")} className="text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {resumeData.languages.map((language, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={language}
                    onChange={(e) => {
                      const newLanguages = [...resumeData.languages];
                      newLanguages[index] = e.target.value;
                      setResumeData((prev) => ({ ...prev, languages: newLanguages }));
                    }}
                    className="bg-transparent border-none flex-1"
                    style={{ color: resumeData.sidebarTextColor }}
                  />
                  {resumeData.languages.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("languages", index)}
                      className="text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </section>

            <section>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold border-b-2 border-white/30 pb-2" style={{ color: resumeData.sidebarTextColor }}>
                  Skills
                </h2>
                <Button variant="ghost" size="icon" onClick={() => addItem("skills", "")} className="text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Input
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...resumeData.skills];
                      newSkills[index] = e.target.value;
                      setResumeData((prev) => ({ ...prev, skills: newSkills }));
                    }}
                    className="bg-transparent border-none flex-1"
                    style={{ color: resumeData.sidebarTextColor }}
                  />
                  {resumeData.skills.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("skills", index)}
                      className="text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </section>
          </div>

          <div style={{ flex: "0 0 65%" }} className="p-6">
            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2
                  style={{ color: resumeData.primaryColor, borderBottomColor: resumeData.primaryColor }}
                  className="text-xl font-semibold border-b-2 pb-2"
                >
                  Projects
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => addItem("projects", { name: "", description: "", technologies: "" })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-6 relative">
                  {resumeData.projects.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("projects", index)}
                      className="absolute right-0 top-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Input
                    value={project.name}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index] = { ...project, name: e.target.value };
                      setResumeData((prev) => ({ ...prev, projects: newProjects }));
                    }}
                    className="font-semibold text-lg mb-2"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="Project Name"
                  />
                  <Textarea
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index] = { ...project, description: e.target.value };
                      setResumeData((prev) => ({ ...prev, projects: newProjects }));
                    }}
                    className="mb-2 resize-none"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="Description"
                    rows={3}
                  />
                  <Input
                    value={project.technologies}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index] = { ...project, technologies: e.target.value };
                      setResumeData((prev) => ({ ...prev, projects: newProjects }));
                    }}
                    className="text-gray-600"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="Technologies (e.g., React, Node.js)"
                  />
                </div>
              ))}
            </section>

            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2
                  style={{ color: resumeData.primaryColor, borderBottomColor: resumeData.primaryColor }}
                  className="text-xl font-semibold border-b-2 pb-2"
                >
                  Education
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => addItem("education", { university: "", degree: "", period: "" })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {resumeData.education.map((edu, index) => (
                <div key={index} className="mb-6 relative">
                  {resumeData.education.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("education", index)}
                      className="absolute right-0 top-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Input
                    value={edu.university}
                    onChange={(e) => {
                      const newEducation = [...resumeData.education];
                      newEducation[index] = { ...edu, university: e.target.value };
                      setResumeData((prev) => ({ ...prev, education: newEducation }));
                    }}
                    className="font-semibold text-lg mb-2"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="University"
                  />
                  <Input
                    value={edu.degree}
                    onChange={(e) => {
                      const newEducation = [...resumeData.education];
                      newEducation[index] = { ...edu, degree: e.target.value };
                      setResumeData((prev) => ({ ...prev, education: newEducation }));
                    }}
                    className="mb-2"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="Degree"
                  />
                  <Input
                    value={edu.period}
                    onChange={(e) => {
                      const newEducation = [...resumeData.education];
                      newEducation[index] = { ...edu, period: e.target.value };
                      setResumeData((prev) => ({ ...prev, education: newEducation }));
                    }}
                    className="text-gray-600"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="Period (e.g., 2014 - 2018)"
                  />
                </div>
              ))}
            </section>

            <section>
              <div className="flex justify-between items-center mb-4">
                <h2
                  style={{ color: resumeData.primaryColor, borderBottomColor: resumeData.primaryColor }}
                  className="text-xl font-semibold border-b-2 pb-2"
                >
                  Certificates
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => addItem("certificates", { name: "", issuer: "", year: "" })}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {resumeData.certificates.map((cert, index) => (
                <div key={index} className="mb-6 relative">
                  {resumeData.certificates.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem("certificates", index)}
                      className="absolute right-0 top-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Input
                    value={cert.name}
                    onChange={(e) => {
                      const newCertificates = [...resumeData.certificates];
                      newCertificates[index] = { ...cert, name: e.target.value };
                      setResumeData((prev) => ({ ...prev, certificates: newCertificates }));
                    }}
                    className="font-semibold text-lg mb-2"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="Certificate Name"
                  />
                  <Input
                    value={cert.issuer}
                    onChange={(e) => {
                      const newCertificates = [...resumeData.certificates];
                      newCertificates[index] = { ...cert, issuer: e.target.value };
                      setResumeData((prev) => ({ ...prev, certificates: newCertificates }));
                    }}
                    className="mb-2"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="Issuer"
                  />
                  <Input
                    value={cert.year}
                    onChange={(e) => {
                      const newCertificates = [...resumeData.certificates];
                      newCertificates[index] = { ...cert, year: e.target.value };
                      setResumeData((prev) => ({ ...prev, certificates: newCertificates }));
                    }}
                    className="text-gray-600"
                    style={{ color: resumeData.mainTextColor }}
                    placeholder="Year"
                  />
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePage;