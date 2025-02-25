import React, { useState } from "react";
import { Document, Page, Text, View, StyleSheet, Image, pdf } from "@react-pdf/renderer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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
  page: { flexDirection: "column", backgroundColor: "#ffffff", padding: 20 },
  header: { padding: 25, flexDirection: "row", alignItems: "center", gap: 20, backgroundColor: "#003087" },
  profileImage: { width: 110, height: 110, borderRadius: 55, objectFit: "cover", border: "5px solid rgba(255, 255, 255, 0.4)" },
  name: { fontSize: 32, fontWeight: "bold", color: "#ffffff", flexWrap: "wrap", maxWidth: "70%" },
  title: { fontSize: 18, color: "#ffffff", opacity: 0.9, marginTop: 6, flexWrap: "wrap", maxWidth: "70%" },
  container: { flexDirection: "row" },
  leftColumn: { width: "35%", padding: 20 },
  rightColumn: { width: "65%", padding: 20, backgroundColor: "#ffffff" },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, paddingBottom: 4, borderBottom: "2px solid" },
  text: { fontSize: 12, marginBottom: 6 },
  whiteText: { fontSize: 12, marginBottom: 6 },
});

// PDF Document Component
const TemplatePDF = ({ resumeData }) => (
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
          {resumeData.sectionOrder.map((section) => {
            if (["profile", "contact", "languages", "skills"].includes(section) && resumeData.sectionVisibility[section]) {
              return (
                <View
                  key={section}
                  style={{
                    marginBottom: 20,
                    backgroundColor: resumeData.sectionStyles[section].bgColor,
                    color: resumeData.sectionStyles[section].textColor,
                  }}
                >
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      color: resumeData.sectionStyles[section].textColor,
                      borderBottomColor: "rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    {section === "profile" && "Profile Summary"}
                    {section === "contact" && "Contact"}
                    {section === "languages" && "Languages"}
                    {section === "skills" && "Skills"}
                  </Text>
                  {section === "profile" && (
                    <Text style={[styles.whiteText, { color: resumeData.sectionStyles[section].textColor }]}>
                      {resumeData.profile}
                    </Text>
                  )}
                  {section === "contact" && (
                    <>
                      <Text style={[styles.whiteText, { color: resumeData.sectionStyles[section].textColor }]}>
                        <Phone size={14} style={{ display: "inline", marginRight: 8 }} /> {resumeData.phone}
                      </Text>
                      <Text style={[styles.whiteText, { color: resumeData.sectionStyles[section].textColor }]}>
                        <Mail size={14} style={{ display: "inline", marginRight: 8 }} /> {resumeData.email}
                      </Text>
                      <Text style={[styles.whiteText, { color: resumeData.sectionStyles[section].textColor }]}>
                        <MapPin size={14} style={{ display: "inline", marginRight: 8 }} /> {resumeData.address}
                      </Text>
                      <Text style={[styles.whiteText, { color: resumeData.sectionStyles[section].textColor }]}>
                        <Globe size={14} style={{ display: "inline", marginRight: 8 }} /> {resumeData.website}
                      </Text>
                    </>
                  )}
                  {section === "languages" && resumeData.languages.map((language, index) => (
                    <Text key={index} style={[styles.whiteText, { color: resumeData.sectionStyles[section].textColor }]}>
                      {language}
                    </Text>
                  ))}
                  {section === "skills" && resumeData.skills.map((skill, index) => (
                    <Text key={index} style={[styles.whiteText, { color: resumeData.sectionStyles[section].textColor }]}>
                      • {skill}
                    </Text>
                  ))}
                </View>
              );
            }
            return null;
          })}
        </View>

        <View style={styles.rightColumn}>
          {resumeData.sectionOrder.map((section) => {
            if (["workExperience", "education"].includes(section) && resumeData.sectionVisibility[section]) {
              return (
                <View
                  key={section}
                  style={{
                    marginBottom: 20,
                    backgroundColor: resumeData.sectionStyles[section].bgColor,
                    color: resumeData.sectionStyles[section].textColor,
                  }}
                >
                  <Text
                    style={{
                      ...styles.sectionTitle,
                      color: resumeData.primaryColor,
                      borderBottomColor: resumeData.primaryColor,
                    }}
                  >
                    {section === "workExperience" && "Work Experience"}
                    {section === "education" && "Education"}
                  </Text>
                  {section === "workExperience" && resumeData.workExperience.map((exp, index) => (
                    <View key={index} style={{ marginBottom: 15 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 14, color: resumeData.sectionStyles[section].textColor, marginBottom: 4 }}>
                        {exp.company} - {exp.role}
                      </Text>
                      <Text style={[styles.text, { color: resumeData.sectionStyles[section].textColor }]}>{exp.period}</Text>
                      {exp.achievements.map((achievement, i) => (
                        <Text key={i} style={[styles.text, { color: resumeData.sectionStyles[section].textColor }]}>
                          • {achievement}
                        </Text>
                      ))}
                    </View>
                  ))}
                  {section === "education" && resumeData.education.map((edu, index) => (
                    <View key={index} style={{ marginBottom: 15 }}>
                      <Text style={{ fontWeight: "bold", fontSize: 14, color: resumeData.sectionStyles[section].textColor, marginBottom: 2 }}>
                        {edu.university}
                      </Text>
                      <Text style={[styles.text, { color: resumeData.sectionStyles[section].textColor }]}>{edu.degree}</Text>
                      <Text style={[styles.text, { color: resumeData.sectionStyles[section].textColor }]}>{edu.period}</Text>
                      {edu.gpa && (
                        <Text style={[styles.text, { color: resumeData.sectionStyles[section].textColor }]}>GPA: {edu.gpa}</Text>
                      )}
                    </View>
                  ))}
                </View>
              );
            }
            return null;
          })}
        </View>
      </View>
    </Page>
  </Document>
);

function Template03() {
  const [resumeData, setResumeData] = useState({
    name: "RICHARD SANCHEZ",
    title: "Marketing Manager",
    profile: "Experienced and results-driven Marketing Manager with a proven track record in developing and executing successful marketing strategies. I am seeking a challenging role where I can contribute my skills in strategic planning, team leadership, and creative problem-solving to achieve business objectives.",
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    address: "123 Anywhere St., Any City",
    website: "www.reallygreatsite.com",
    profileImage: "https://via.placeholder.com/100",
    languages: ["English: Fluent", "French: Fluent", "German: Basics", "Spanish: Intermediate"],
    skills: ["Project Management", "Public Relations", "Teamwork", "Time Management", "Leadership", "Effective Communication", "Critical Thinking"],
    workExperience: [
      {
        company: "Borcelle Studio",
        role: "Marketing Manager & Specialist",
        period: "2030 - Present",
        achievements: [
          "Led the development and implementation of comprehensive marketing strategies that resulted in a 20% increase in brand visibility and a 15% growth in sales within the first year.",
          "Successfully launched and managed multiple cross-channel campaigns, including digital marketing, social media, and traditional advertising, resulting in improved customer acquisition and retention rates.",
        ],
      },
      {
        company: "Fauget Studio",
        role: "Marketing Manager & Specialist",
        period: "2025 - 2029",
        achievements: [
          "Conducted market research to identify emerging trends and consumer preferences, providing valuable insights for product development and positioning.",
          "Oversaw the creation of engaging content for various platforms, collaborating with internal teams and external agencies to ensure brand consistency and relevance.",
        ],
      },
      {
        company: "Studio Shodwe",
        role: "Marketing Manager & Specialist",
        period: "2024 - 2025",
        achievements: [
          "Developed and executed targeted marketing campaigns, resulting in a 25% increase in lead generation.",
          "Implemented SEO strategies that improved website traffic by 30%, enhancing online visibility and positioning the company.",
          "Collaborated with sales teams to create effective sales collateral, presentations, and promotional materials.",
        ],
      },
    ],
    education: [
      {
        university: "Borcelie University",
        degree: "Master of Business Management",
        period: "2029 - 2030",
      },
      {
        university: "Borcelie University",
        degree: "Bachelor of Business Management",
        period: "2025 - 2029",
        gpa: "3.8/4.0",
      },
    ],
    primaryColor: "#003087",
    secondaryColor: "#f5f5f5",
    headerTextColor: "#ffffff",
    sidebarTextColor: "#333333",
    mainTextColor: "#333333",
    sectionOrder: ["profile", "contact", "languages", "skills", "workExperience", "education"],
    sectionVisibility: {
      profile: true,
      contact: true,
      languages: true,
      skills: true,
      workExperience: true,
      education: true,
    },
    sectionStyles: {
      profile: { bgColor: "#f5f5f5", textColor: "#333333" },
      contact: { bgColor: "#f5f5f5", textColor: "#333333" },
      languages: { bgColor: "#f5f5f5", textColor: "#333333" },
      skills: { bgColor: "#f5f5f5", textColor: "#333333" },
      workExperience: { bgColor: "#ffffff", textColor: "#333333" },
      education: { bgColor: "#ffffff", textColor: "#333333" },
    },
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
    setResumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], defaultItem],
    }));
  };

  const removeItem = (section, index) => {
    if (resumeData[section].length > 1) {
      setResumeData((prev) => ({
        ...prev,
        [section]: prev[section].filter((_, i) => i !== index),
      }));
    }
  };

  const handleDownloadPDF = async () => {
    const blob = await pdf(<TemplatePDF resumeData={resumeData} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "resume_template03.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceDroppableId = source.droppableId;
    const destDroppableId = destination.droppableId;

    const sidebarSections = resumeData.sectionOrder.filter((section) =>
      ["profile", "contact", "languages", "skills"].includes(section) && resumeData.sectionVisibility[section]
    );
    const contentSections = resumeData.sectionOrder.filter((section) =>
      ["workExperience", "education"].includes(section) && resumeData.sectionVisibility[section]
    );

    let sourceSections = sourceDroppableId === "sidebar" ? sidebarSections : contentSections;
    let destSections = destDroppableId === "sidebar" ? sidebarSections : contentSections;

    if (sourceDroppableId !== destDroppableId) return;

    const newSections = Array.from(sourceSections);
    const [reorderedItem] = newSections.splice(source.index, 1);
    newSections.splice(destination.index, 0, reorderedItem);

    const updatedSectionOrder = resumeData.sectionOrder.map((section) => {
      if (sourceDroppableId === "sidebar" && ["profile", "contact", "languages", "skills"].includes(section)) {
        return newSections.shift() || section;
      } else if (sourceDroppableId === "content" && ["workExperience", "education"].includes(section)) {
        return newSections.shift() || section;
      }
      return section;
    });

    setResumeData((prev) => ({ ...prev, sectionOrder: updatedSectionOrder }));
  };

  const sidebarSections = resumeData.sectionOrder.filter((section) =>
    ["profile", "contact", "languages", "skills"].includes(section) && resumeData.sectionVisibility[section]
  );
  const contentSections = resumeData.sectionOrder.filter((section) =>
    ["workExperience", "education"].includes(section) && resumeData.sectionVisibility[section]
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Controls Section */}
        <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
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
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show Profile:</label>
              <input
                type="checkbox"
                checked={resumeData.sectionVisibility.profile}
                onChange={(e) => setResumeData((prev) => ({
                  ...prev,
                  sectionVisibility: { ...prev.sectionVisibility, profile: e.target.checked },
                }))}
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show Contact:</label>
              <input
                type="checkbox"
                checked={resumeData.sectionVisibility.contact}
                onChange={(e) => setResumeData((prev) => ({
                  ...prev,
                  sectionVisibility: { ...prev.sectionVisibility, contact: e.target.checked },
                }))}
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show Languages:</label>
              <input
                type="checkbox"
                checked={resumeData.sectionVisibility.languages}
                onChange={(e) => setResumeData((prev) => ({
                  ...prev,
                  sectionVisibility: { ...prev.sectionVisibility, languages: e.target.checked },
                }))}
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show Skills:</label>
              <input
                type="checkbox"
                checked={resumeData.sectionVisibility.skills}
                onChange={(e) => setResumeData((prev) => ({
                  ...prev,
                  sectionVisibility: { ...prev.sectionVisibility, skills: e.target.checked },
                }))}
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show Work Experience:</label>
              <input
                type="checkbox"
                checked={resumeData.sectionVisibility.workExperience}
                onChange={(e) => setResumeData((prev) => ({
                  ...prev,
                  sectionVisibility: { ...prev.sectionVisibility, workExperience: e.target.checked },
                }))}
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Show Education:</label>
              <input
                type="checkbox"
                checked={resumeData.sectionVisibility.education}
                onChange={(e) => setResumeData((prev) => ({
                  ...prev,
                  sectionVisibility: { ...prev.sectionVisibility, education: e.target.checked },
                }))}
                className="h-4 w-4 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
          </div>
          <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
            <Download className="h-4 w-4" /> Download PDF
          </Button>
        </div>

        {/* Resume Content with Drag-and-Drop */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{ minWidth: "100%" }}>
            {/* Header Section */}
            <div
              style={{
                backgroundColor: resumeData.primaryColor,
                padding: "25px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                margin: 0,
              }}
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/40 flex-shrink-0">
                <label className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity text-white text-sm">
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <img src={resumeData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <Input
                  value={resumeData.name}
                  onChange={(e) => setResumeData((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-transparent border-none text-4xl font-bold w-full mb-2"
                  style={{ color: resumeData.headerTextColor, wordBreak: "break-word", maxWidth: "100%" }}
                  placeholder="Your Name"
                />
                <Input
                  value={resumeData.title}
                  onChange={(e) => setResumeData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-transparent border-none text-xl w-full"
                  style={{ color: resumeData.headerTextColor, wordBreak: "break-word", maxWidth: "100%" }}
                  placeholder="Your Role"
                />
              </div>
            </div>

            {/* Two-Column Layout */}
            <div className="flex" style={{ minHeight: "calc(100vh - 200px)" }}>
              {/* Sidebar (Left Column, 35%) */}
              <Droppable droppableId="sidebar" direction="vertical">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-6"
                    style={{
                      flex: "0 0 35%",
                      backgroundColor: resumeData.secondaryColor,
                      color: resumeData.sidebarTextColor,
                    }}
                  >
                    {sidebarSections.map((section, index) => (
                      <Draggable key={section} draggableId={section} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-8 cursor-move p-4 rounded-lg shadow-sm"
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: resumeData.sectionStyles[section].bgColor,
                              color: resumeData.sectionStyles[section].textColor,
                            }}
                          >
                            {section === "profile" && (
                              <>
                                <h2 className="text-xl font-semibold mb-3 border-b-2 pb-2">Profile Summary</h2>
                                <Textarea
                                  value={resumeData.profile}
                                  onChange={(e) => setResumeData((prev) => ({ ...prev, profile: e.target.value }))}
                                  className="bg-transparent border-none resize-none w-full"
                                  style={{ color: resumeData.sectionStyles[section].textColor }}
                                  rows={4}
                                />
                              </>
                            )}
                            {section === "contact" && (
                              <>
                                <h2 className="text-xl font-semibold mb-3 border-b-2 pb-2">Contact</h2>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <Phone className="h-5 w-5" style={{ color: resumeData.sectionStyles[section].textColor }} />
                                    <Input
                                      value={resumeData.phone}
                                      onChange={(e) => setResumeData((prev) => ({ ...prev, phone: e.target.value }))}
                                      className="bg-transparent border-none"
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                    />
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Mail className="h-5 w-5" style={{ color: resumeData.sectionStyles[section].textColor }} />
                                    <Input
                                      value={resumeData.email}
                                      onChange={(e) => setResumeData((prev) => ({ ...prev, email: e.target.value }))}
                                      className="bg-transparent border-none"
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                    />
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <MapPin className="h-5 w-5" style={{ color: resumeData.sectionStyles[section].textColor }} />
                                    <Input
                                      value={resumeData.address}
                                      onChange={(e) => setResumeData((prev) => ({ ...prev, address: e.target.value }))}
                                      className="bg-transparent border-none"
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                    />
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Globe className="h-5 w-5" style={{ color: resumeData.sectionStyles[section].textColor }} />
                                    <Input
                                      value={resumeData.website}
                                      onChange={(e) => setResumeData((prev) => ({ ...prev, website: e.target.value }))}
                                      className="bg-transparent border-none"
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                            {section === "languages" && (
                              <>
                                <div className="flex justify-between items-center mb-3">
                                  <h2 className="text-xl font-semibold border-b-2 pb-2">Languages</h2>
                                  <Button variant="ghost" size="icon" onClick={() => addItem("languages", "")} className="text-gray-600">
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
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                    />
                                    {resumeData.languages.length > 1 && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem("languages", index)}
                                        className="text-gray-600"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </>
                            )}
                            {section === "skills" && (
                              <>
                                <div className="flex justify-between items-center mb-3">
                                  <h2 className="text-xl font-semibold border-b-2 pb-2">Skills</h2>
                                  <Button variant="ghost" size="icon" onClick={() => addItem("skills", "")} className="text-gray-600">
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
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                    />
                                    {resumeData.skills.length > 1 && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem("skills", index)}
                                        className="text-gray-600"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              {/* Content (Right Column, 65%) */}
              <Droppable droppableId="content" direction="vertical">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="p-6"
                    style={{
                      flex: "0 0 65%",
                      backgroundColor: "#ffffff",
                      color: resumeData.mainTextColor,
                    }}
                  >
                    {contentSections.map((section, index) => (
                      <Draggable key={section} draggableId={section} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-8 cursor-move p-4 rounded-lg shadow-sm"
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: resumeData.sectionStyles[section].bgColor,
                              color: resumeData.sectionStyles[section].textColor,
                            }}
                          >
                            {section === "workExperience" && (
                              <>
                                <div className="flex justify-between items-center mb-4">
                                  <h2
                                    style={{ color: resumeData.primaryColor, borderBottomColor: resumeData.primaryColor }}
                                    className="text-xl font-semibold border-b-2 pb-2"
                                  >
                                    Work Experience
                                  </h2>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => addItem("workExperience", { company: "", role: "", period: "", achievements: [""] })}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>
                                {resumeData.workExperience.map((exp, expIndex) => (
                                  <div key={expIndex} className="mb-6 relative">
                                    {resumeData.workExperience.length > 1 && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem("workExperience", expIndex)}
                                        className="absolute right-0 top-0"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    )}
                                    <Input
                                      value={`${exp.company} - ${exp.role}`}
                                      onChange={(e) => {
                                        const [company, ...roleParts] = e.target.value.split(" - ");
                                        const newWorkExperience = [...resumeData.workExperience];
                                        newWorkExperience[expIndex] = {
                                          ...exp,
                                          company,
                                          role: roleParts.join(" - "),
                                        };
                                        setResumeData((prev) => ({ ...prev, workExperience: newWorkExperience }));
                                      }}
                                      className="font-semibold text-lg mb-2"
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                      placeholder="Company - Role"
                                    />
                                    <Input
                                      value={exp.period}
                                      onChange={(e) => {
                                        const newWorkExperience = [...resumeData.workExperience];
                                        newWorkExperience[expIndex] = { ...exp, period: e.target.value };
                                        setResumeData((prev) => ({ ...prev, workExperience: newWorkExperience }));
                                      }}
                                      className="mb-2"
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                      placeholder="Period (e.g., 2020 - Present)"
                                    />
                                    {exp.achievements.map((achievement, achIndex) => (
                                      <div key={achIndex} className="flex items-center gap-2 mb-2">
                                        <Input
                                          value={achievement}
                                          onChange={(e) => {
                                            const newWorkExperience = [...resumeData.workExperience];
                                            newWorkExperience[expIndex].achievements[achIndex] = e.target.value;
                                            setResumeData((prev) => ({ ...prev, workExperience: newWorkExperience }));
                                          }}
                                          className="bg-transparent border-none flex-1"
                                          style={{ color: resumeData.sectionStyles[section].textColor }}
                                          placeholder="Achievement"
                                        />
                                        {exp.achievements.length > 1 && (
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                              const newWorkExperience = [...resumeData.workExperience];
                                              newWorkExperience[expIndex].achievements.splice(achIndex, 1);
                                              setResumeData((prev) => ({ ...prev, workExperience: newWorkExperience }));
                                            }}
                                            className="text-gray-600"
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        )}
                                      </div>
                                    ))}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        const newWorkExperience = [...resumeData.workExperience];
                                        newWorkExperience[expIndex].achievements.push("");
                                        setResumeData((prev) => ({ ...prev, workExperience: newWorkExperience }));
                                      }}
                                      className="mt-2"
                                    >
                                      <Plus className="h-4 w-4 mr-2" /> Add Achievement
                                    </Button>
                                  </div>
                                ))}
                              </>
                            )}
                            {section === "education" && (
                              <>
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
                                    onClick={() => addItem("education", { university: "", degree: "", period: "", gpa: "" })}
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
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
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
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                      placeholder="Degree"
                                    />
                                    <Input
                                      value={edu.period}
                                      onChange={(e) => {
                                        const newEducation = [...resumeData.education];
                                        newEducation[index] = { ...edu, period: e.target.value };
                                        setResumeData((prev) => ({ ...prev, education: newEducation }));
                                      }}
                                      className="mb-2"
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                      placeholder="Period (e.g., 2014 - 2018)"
                                    />
                                    <Input
                                      value={edu.gpa || ""}
                                      onChange={(e) => {
                                        const newEducation = [...resumeData.education];
                                        newEducation[index] = { ...edu, gpa: e.target.value };
                                        setResumeData((prev) => ({ ...prev, education: newEducation }));
                                      }}
                                      className="text-gray-600"
                                      style={{ color: resumeData.sectionStyles[section].textColor }}
                                      placeholder="GPA (optional)"
                                    />
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default Template03;