import { useState, useEffect } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookmarkButton({ job, onToggle }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setBookmarked(savedJobs.includes(job.id));
  }, [job.id]);

  const handleClick = async () => {
    const email = localStorage.getItem("userEmail");

    if (!email) {
      toast.error("Please log in to save jobs.", { position: "top-center" });
      return;
    }

    // Optimistic UI update
    const newBookmarkedState = !bookmarked;
    setBookmarked(newBookmarkedState);

    try {
      let updatedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

      if (newBookmarkedState) {
        await axios.post("https://jobfusion.onrender.com/api/jobs/save", { email, jobData: job });
        updatedJobs.push(job.id);
        toast.success("Job saved successfully!", { position: "top-center" });
      } else {
        await axios.delete("https://jobfusion.onrender.com/api/jobs/unsave", {
          data: { email, jobId: job.id },
        });
        updatedJobs = updatedJobs.filter((id) => id !== job.id);
        toast.info("Job removed from saved list.", { position: "top-center" });
      }

      localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
      onToggle();
    } catch (error) {
      console.error("Error updating saved jobs:", error);
      toast.error("Failed to update saved jobs.", { position: "top-center" });
      setBookmarked(!newBookmarkedState); // Rollback UI on error
    }
  };

  return (
    <>
      <button onClick={handleClick} className="p-2 rounded-full bg-transparent border-none cursor-pointer">
        <AnimatePresence mode="wait">
          {bookmarked ? (
            <motion.div
              key="added"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BookmarkAddedIcon fontSize="large" style={{ color: "lightblue" }} />
            </motion.div>
          ) : (
            <motion.div
              key="add"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <BookmarkAddIcon fontSize="large" style={{ color: "lightblue" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Toast Container */}
      <ToastContainer autoClose={3000} hideProgressBar={false} />
    </>
  );
}
