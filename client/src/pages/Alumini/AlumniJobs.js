import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

export default function AlumniJobs({ userId, navigate }) {
  // const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   axios.get(`/api/jobs/alumni/${userId}`)
  //     .then(res => {
  //       const formatted = res.data.map(job => ({
  //         id: job._id,
  //         title: job.title,
  //         company: job.company,
  //         type: job.type,
  //         createdAt: new Date(job.createdAt).toLocaleDateString()
  //       }));
  //       setRows(formatted);
  //     });
  // }, [userId]);

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "company", headerName: "Company", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "createdAt", headerName: "Posted On", flex: 1 },
    {
      field: "applicants",
      headerName: "Applicants",
      renderCell: (params) => (
        <Button
          size="small"
          variant="outlined"
          onClick={() =>
            navigate(`/alumni/jobs/${params.row.id}/applicants`)
          }
        >
          View Applicants
        </Button>
      )
    }
  ];

  return (
    <Box p={4}>
      <Typography variant="h5" mb={3}>
        My Posted Opportunities
      </Typography>

      <Box sx={{ height: 500 }}>
        {/* <DataGrid rows={rows} columns={columns} /> */}
      </Box>
    </Box>
  );
}
