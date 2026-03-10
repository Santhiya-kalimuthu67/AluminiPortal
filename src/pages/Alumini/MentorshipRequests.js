import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Chip,
  Button,
  createTheme,
  ThemeProvider,
  Typography
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchIncomingRequests, updateMentorshipStatus } from "../../api/alumini.service";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f172a",
      paper: "#1e293b"
    }
  }
});

export default function MentorshipRequests() {
  const [rows, setRows] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const fetchReq = async () => {
    try {
      const response = await fetchIncomingRequests();

      const formatted = response.map((req) => ({
        id: req._id,
        name: req.studentId?.name,
        email: req.studentId?.email,
        message: req.message,
        status: req.status,
        createdAt: new Date(req.createdAt).toLocaleDateString()
      }));

      setRows(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReq();
  }, []);

const updateStatus = async (id, status) => {
  try {
    const updated = await updateMentorshipStatus(id, status);

    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? { ...row, status: updated.status }
          : row
      )
    );

  } catch (error) {
    console.error(error);
  }
};


  const getStatusChip = (status) => {
    const colorMap = {
      pending: "warning",
      accepted: "success",
      rejected: "error"
    };

    return (
      <Chip
        label={status.toUpperCase()}
        color={colorMap[status] || "default"}
        size="small"
      />
    );
  };

  const columns = useMemo(
    () => [
      { field: "name", headerName: "Student", flex: 1 },
      { field: "email", headerName: "Email", flex: 1.5 },
      {
        field: "message",
        headerName: "Message",
        flex: 2,
        sortable: false
      },
      { field: "createdAt", headerName: "Requested On", flex: 1 },
      {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => getStatusChip(params.value)
      },
      {
        field: "actions",
        headerName: "Actions",
        flex: 1.5,
        sortable: false,
        renderCell: (params) => {
          if (params.row.status !== "pending") return null;

          return (
            <Box display="flex" gap={1}>
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() =>
                  updateStatus(params.row.id, "accepted")
                }
              >
                Accept
              </Button>

              <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() =>
                  updateStatus(params.row.id, "rejected")
                }
              >
                Reject
              </Button>
            </Box>
          );
        }
      }
    ],
    []
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          height: "75vh",
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          mt: 4
        }}
      >
        <Typography variant="h5" mb={3}>
          Incoming Mentorship Requests
        </Typography>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          disableRowSelectionOnClick
          autoHeight={false}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 3,
            border: "1px solid rgba(255,255,255,0.08)",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#1e293b"
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1e293b"
            }
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
