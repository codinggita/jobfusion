import * as React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

const LoaderContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  width: "100vw",
  background: "linear-gradient(to bottom, #F7F9FC, #E3ECFA)", // Smooth blue tint
  position: "relative",
});

const StyledCircularProgress = styled(CircularProgress)({
  color: "#688BC5", // JobFusion blue shade
  filter: "drop-shadow(0px 0px 10px rgba(104, 139, 197, 0.5))", // Soft blue glow
});

const LoadingText = styled(Typography)({
  marginTop: 20,
  fontSize: "1.2rem",
  fontWeight: "bold",
  color: "#6b7280", // Grey for contrast
  textAlign: "center",
  "@media (max-width: 600px)": {
    fontSize: "1rem", // Mobile-friendly
  },
});

export default function ModernLoader() {
  return (
    <LoaderContainer>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <StyledCircularProgress size={60} thickness={4} />
      </motion.div>
      <LoadingText>Loading, please wait...</LoadingText>
    </LoaderContainer>
  );
}
