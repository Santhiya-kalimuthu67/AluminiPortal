import { useEffect, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Button,
  TextField,
  Chip,
  ThemeProvider,
  createTheme
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { fetchUserDetails, approveUser } from "../../api/user.service";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e"
    }
  }
});

export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUserDetails();
      setUsers(data);
      setRows(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const applyFilter = () => {
    let filtered = [...users];

    if (role) {
      filtered = filtered.filter((u) => u.role === role);
    }

    if (search) {
      filtered = filtered.filter(
        (u) =>
          u.name?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setRows(filtered);
  };

  const handleApprove = async (id) => {
    await approveUser(id);
    loadUsers();
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={params.row.status === "pending" ? "warning" : "success"}
          size="small"
        />
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) =>
        params.row.status === "pending" &&
        (params.row.role === "admin" ||
          params.row.role === "alumni") ? (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleApprove(params.row._id)}
          >
            Approve
          </Button>
        ) : null
    }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box p={3} sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        {/* Filters */}
        <Box display="flex" gap={2} mb={2}>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Roles</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="alumni">Alumni</MenuItem>
            <MenuItem value="student">Student</MenuItem>
          </Select>

          <TextField
            placeholder="Search name/email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button variant="contained" onClick={applyFilter}>
            Filter
          </Button>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          autoHeight
        />
      </Box>
    </ThemeProvider>
  );
}