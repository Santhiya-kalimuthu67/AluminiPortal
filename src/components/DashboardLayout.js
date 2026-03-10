import { Box, Typography } from "@mui/material";

export default function DashboardLayout({ title, subtitle, children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f4f6f9, #ffffff)",
        px: { xs: 2, sm: 4 },
        py: { xs: 3, sm: 5 }
      }}
    >
      {/* Header */}
      <Box sx={{ maxWidth: 1200, mx: "auto", mb: 4 }}>
        <Typography variant="h4" fontWeight={700}>
          {title}
        </Typography>
        <Typography color="text.secondary" mt={0.5}>
          {subtitle}
        </Typography>
      </Box>

      {/* Content */}
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
