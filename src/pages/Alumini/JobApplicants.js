import { useEffect, useState } from "react";
import { Box, Typography, Chip, Button, Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../api/api.axios";

export default function JobApplicants() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/alumni/applicants").then(res => {
      const formatted = res.data.map(app => ({
        id: app._id,
        jobTitle: app.job?.title,
        company: app.job?.company,
        name: app.student?.name,
        email: app.student?.email,
        status: app.status,
        resume: app.resume,
        coverLetter: app.coverLetter,
        appliedOn: new Date(app.createdAt).toLocaleDateString()
      }));

      setRows(formatted);
    });
  }, []);

  const columns = [
    { field: "jobTitle", headerName: "Job", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "name", headerName: "Student", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },

    {
      field: "resume",
      headerName: "Resume",
      flex: 1,
      renderCell: (params) => (
        <Link
          href={`http://localhost:5000/${params.value}`}
          target="_blank"
          underline="hover"
        >
          View Resume
        </Link>
      )
    },

    {
      field: "coverLetter",
      headerName: "Cover Letter",
      flex: 1.5,
      renderCell: (params) =>
        params.value ? params.value : "—"
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "Hired"
              ? "success"
              : params.value === "Rejected"
              ? "error"
              : params.value === "Shortlisted"
              ? "warning"
              : "default"
          }
        />
      )
    },

    { field: "appliedOn", headerName: "Applied On", flex: 1 }
  ];

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>
        Job Applicants
      </Typography>

      <Box sx={{ height: 550 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
    </Box>
  );
}
