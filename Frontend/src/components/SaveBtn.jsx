import { useState, useEffect } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { motion, AnimatePresence } from "framer-motion";

export default function BookmarkButton({ jobId, onToggle }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    // Check if job is already saved
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setBookmarked(savedJobs.includes(jobId));
  }, [jobId]);

  const handleClick = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (savedJobs.includes(jobId)) {
      // Remove job from saved list
      const updatedJobs = savedJobs.filter((id) => id !== jobId);
      localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
      setBookmarked(false);
    } else {
      // Add job to saved list
      savedJobs.push(jobId);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setBookmarked(true);
    }

    onToggle();
  };

  return (
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
  );
}
