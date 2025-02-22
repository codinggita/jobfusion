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
const Input = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

// Custom Textarea Component
const Textarea = ({ className = "", ...props }) => {
  return (
    <textarea
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
};

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    backgroundColor: "#003087",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    objectFit: "cover",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  title: {
    fontSize: 16,
    color: "#ffffff",
    opacity: 0.9,
  },
  container: {
    flexDirection: "row",
    marginTop: 10,
  },
  leftColumn: {
    width: "33%",
    backgroundColor: "#000000",
    padding: 20,
    color: "#ffffff",
  },
  rightColumn: {
    width: "67%",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#003087",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#000000",
  },
  whiteText: {
    fontSize: 12,
    marginBottom: 5,
    color: "#ffffff",
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 8,
    color: "#003087",
  },
  socialLink: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  inputField: {
    border: "1px solid #e5e7eb",
    padding: 5,
    borderRadius: 4,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
});

// PDF Document Component
const ResumePDF = ({ resumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Image
          src={
            resumeData.profileImage ||
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-20%20174833-9PD8ILwmTSyK2pgMCFWBHLG99aYeGf.png"
          }
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>{resumeData.name}</Text>
          <Text style={styles.title}>{resumeData.title}</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.leftColumn}>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#ffffff" }}>About Me</Text>
            <Text style={styles.whiteText}>{resumeData.about}</Text>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#ffffff" }}>Contact</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
              <Phone style={styles.icon} />
              <Text style={styles.whiteText}>{resumeData.phone}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
              <Mail style={styles.icon} />
              <Text style={styles.whiteText}>{resumeData.email}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 5 }}>
              <MapPin style={styles.icon} />
              <Text style={styles.whiteText}>{resumeData.address}</Text>
            </View>
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#ffffff" }}>Social Links</Text>
            {resumeData.socialLinks.map((link, index) => (
              <View key={index} style={styles.socialLink}>
                <Text style={styles.whiteText}>
                  {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}: {link.url}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#ffffff" }}>Languages</Text>
            {resumeData.languages.map((language, index) => (
              <Text key={index} style={styles.whiteText}>{language}</Text>
            ))}
          </View>

          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#ffffff" }}>Skills</Text>
            {resumeData.skills.map((skill, index) => (
              <Text key={index} style={styles.whiteText}>{skill}</Text>
            ))}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {resumeData.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: "#000000" }}>{project.name}</Text>
                <Text style={styles.text}>{project.description}</Text>
                <Text style={styles.text}>Technologies: {project.technologies}</Text>
              </View>
            ))}
          </View>

          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Education</Text>
            {resumeData.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: "#000000" }}>{edu.university}</Text>
                <Text style={styles.text}>{edu.degree}</Text>
                <Text style={styles.text}>{edu.period}</Text>
              </View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionTitle}>Certificates</Text>
            {resumeData.certificates.map((cert, index) => (
              <View key={index} style={{ marginBottom: 15 }}>
                <Text style={{ fontWeight: "bold", fontSize: 14, color: "#000000" }}>{cert.name}</Text>
                <Text style={styles.text}>{cert.issuer}</Text>
                <Text style={styles.text}>{cert.year}</Text>
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
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumeData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
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

  const addSocialLink = () => {
    addItem("socialLinks", { platform: "github", url: "" });
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Controls */}
        <div className="mb-4 p-4 flex justify-end">
          <div className="space-x-4">
            <Input
              type="color"
              value={resumeData.themeColor}
              onChange={(e) => setResumeData((prev) => ({ ...prev, themeColor: e.target.value }))}
              className="w-20 h-10"
            />
            <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Resume Content (Editable on Screen) */}
        <div className="resume-content">
          <div style={{ backgroundColor: resumeData.themeColor, padding: "1rem" }}>
            <div className="flex flex-col md:flex-row items-center gap-4 p-6 text-white">
              <div className="relative w-32 h-32 rounded-full overflow-hidden bg-white/20">
                <label className="cursor-pointer absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <img
                  src={
                    resumeData.profileImage ||
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-20%20174833-9PD8ILwmTSyK2pgMCFWBHLG99aYeGf.png"
                  }
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <Input
                  value={resumeData.name}
                  onChange={(e) => setResumeData((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-transparent border-none text-3xl font-bold text-white text-center md:text-left"
                />
                <Input
                  value={resumeData.title}
                  onChange={(e) => setResumeData((prev) => ({ ...prev, title: e.target.value }))}
                  className="bg-transparent border-none text-lg text-white/90 text-center md:text-left"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="bg-black text-white p-6">
              {/* Left column sections */}
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-white">About Me</h2>
                <Textarea
                  value={resumeData.about}
                  onChange={(e) => setResumeData((prev) => ({ ...prev, about: e.target.value }))}
                  className="bg-transparent border-none text-white/80 resize-none w-full"
                  rows={3}
                />
              </section>

              <section className="space-y-4 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Contact</h2>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <Input
                    value={resumeData.phone}
                    onChange={(e) => setResumeData((prev) => ({ ...prev, phone: e.target.value }))}
                    className="bg-transparent border-none text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <Input
                    value={resumeData.email}
                    onChange={(e) => setResumeData((prev) => ({ ...prev, email: e.target.value }))}
                    className="bg-transparent border-none text-white"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <Input
                    value={resumeData.address}
                    onChange={(e) => setResumeData((prev) => ({ ...prev, address: e.target.value }))}
                    className="bg-transparent border-none text-white"
                  />
                </div>
              </section>

              <section className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Social Links</h2>
                  <Button onClick={addSocialLink} variant="ghost" size="icon" className="text-white hover:text-white/80">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {resumeData.socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <select
                      value={link.platform}
                      onChange={(e) => {
                        const newLinks = [...resumeData.socialLinks];
                        newLinks[index] = { ...link, platform: e.target.value };
                        setResumeData((prev) => ({ ...prev, socialLinks: newLinks }));
                      }}
                      className="bg-transparent text-white border rounded px-2 py-1"
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
                      className="bg-transparent border-none text-white"
                      placeholder="URL"
                    />
                    {resumeData.socialLinks.length > 1 && (
                      <Button
                        onClick={() => removeItem("socialLinks", index)}
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-white/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </section>

              <section className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Languages</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addItem("languages", "")}
                    className="text-white hover:text-white/80"
                  >
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
                      className="bg-transparent border-none text-white"
                    />
                    {resumeData.languages.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("languages", index)}
                        className="text-white hover:text-white/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </section>

              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Skills</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addItem("skills", "")}
                    className="text-white hover:text-white/80"
                  >
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
                      className="bg-transparent border-none text-white"
                    />
                    {resumeData.skills.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("skills", index)}
                        className="text-white hover:text-white/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </section>
            </div>

            <div className="col-span-2 p-6 bg-white">
              {/* Right column sections */}
              <section className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-600">Projects</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      addItem("projects", {
                        name: "",
                        description: "",
                        technologies: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="mb-6 relative">
                    {resumeData.projects.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
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
                      className="font-semibold mb-2"
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
                      placeholder="Project Description"
                    />
                    <Input
                      value={project.technologies}
                      onChange={(e) => {
                        const newProjects = [...resumeData.projects];
                        newProjects[index] = { ...project, technologies: e.target.value };
                        setResumeData((prev) => ({ ...prev, projects: newProjects }));
                      }}
                      className="text-gray-600"
                      placeholder="Technologies Used"
                    />
                  </div>
                ))}
              </section>

              <section className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-600">Education</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      addItem("education", {
                        university: "",
                        degree: "",
                        period: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4 relative">
                    {resumeData.education.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
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
                      className="font-semibold mb-2"
                      placeholder="University Name"
                    />
                    <Input
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education];
                        newEducation[index] = { ...edu, degree: e.target.value };
                        setResumeData((prev) => ({ ...prev, education: newEducation }));
                      }}
                      className="mb-2"
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
                      placeholder="Period"
                    />
                  </div>
                ))}
              </section>

              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-600">Certificates</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      addItem("certificates", {
                        name: "",
                        issuer: "",
                        year: "",
                      })
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {resumeData.certificates.map((cert, index) => (
                  <div key={index} className="mb-4 relative">
                    {resumeData.certificates.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
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
                      className="font-semibold mb-2"
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
                      placeholder="Issuing Organization"
                    />
                    <Input
                      value={cert.year}
                      onChange={(e) => {
                        const newCertificates = [...resumeData.certificates];
                        newCertificates[index] = { ...cert, year: e.target.value };
                        setResumeData((prev) => ({ ...prev, certificates: newCertificates }));
                      }}
                      className="text-gray-600"
                      placeholder="Year"
                    />
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumePage;