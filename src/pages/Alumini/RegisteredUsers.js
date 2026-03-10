import { useEffect, useState } from "react";
import { Box, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../api/api.axios";

export default function RegisteredUsers() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    api.get("/events/registrations").then(res => {
      const formatted = res.data.map(reg => ({
        id: reg._id,
        eventTitle: reg.eventId?.title,
        type: reg.eventId?.type,
        date: new Date(reg.eventId?.date).toLocaleDateString(),
        location: reg.eventId?.location,
        name: reg.userId?.name,
        email: reg.userId?.email,
        status: reg.status
      }));

      setRows(formatted);
    });
  }, []);

  const columns = [
    { field: "eventTitle", headerName: "Event", flex: 1.2 },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "location", headerName: "Location", flex: 1.5 },
    { field: "name", headerName: "Student", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "attended"
              ? "success"
              : "warning"
          }
          size="small"
        />
      )
    }
  ];

  return (
    <Box sx={{ height: 550 }}>
   <DataGrid
  rows={rows}
  columns={columns}
  pageSize={10}
  sx={{
    bgcolor: "#0f172a",
    color: "#fff",
    border: "none",

    "& .MuiDataGrid-columnHeaders": {
      bgcolor: "#f1f5f9", // light header background
    },

    "& .MuiDataGrid-columnHeaderTitle": {
      color: "#1f2937", // dark grey text
      fontWeight: 600,
    },

    "& .MuiDataGrid-cell": {
      borderColor: "#1e293b"
    }
  }}
/>

    </Box>
  );
}
