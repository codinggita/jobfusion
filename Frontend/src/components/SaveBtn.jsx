import { useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { motion, AnimatePresence } from "framer-motion";

export default function BookmarkButton() {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <button
      onClick={() => setBookmarked((prev) => !prev)}
      className="p-2 rounded-full bg-transparent border-none cursor-pointer"
    >
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