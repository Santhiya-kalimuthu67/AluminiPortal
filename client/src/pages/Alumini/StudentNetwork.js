import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Chip,
  createTheme,
  ThemeProvider,
  useMediaQuery
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchAllStudent } from "../../api/alumini.service";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#0f172a",
      paper: "#1e293b"
    }
  }
});

export default function StudentNetwork() {
  const isMobile = useMediaQuery("(max-width:900px)");

  const [rows, setRows] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    skill: "",
    department: "",
    year: ""
  });

  const loadStudents = async () => {
    const res = await fetchAllStudent(filters);

    const formatted = res.data.map((s) => ({
      id: s._id,
      name: s.user.name,
      email: s.user.email,
      department: s.department,
      year: s.year,
      skills: s.skills
    }));

    setRows(formatted);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      hide: isMobile
    },
    { field: "department", headerName: "Department", flex: 1 },
    { field: "year", headerName: "Year", flex: 1 },
    {
      field: "skills",
      headerName: "Skills",
      flex: 2,
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {params.value?.map((skill, i) => (
            <Chip
              key={i}
              label={skill}
              size="small"
              sx={{
                backgroundColor: "#334155",
                color: "#fff"
              }}
            />
          ))}
        </Stack>
      )
    }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          px: { xs: 2, md: 4 },
          py: 4
        }}
      >
        <Typography variant="h5" mb={3}>
          Discover Students
        </Typography>

        {/* Filters */}
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          mb={3}
        >
          <TextField
            label="Name"
            size="small"
            fullWidth
            onChange={(e) =>
              setFilters({ ...filters, name: e.target.value })
            }
          />
          <TextField
            label="Skill"
            size="small"
            fullWidth
            onChange={(e) =>
              setFilters({ ...filters, skill: e.target.value })
            }
          />
          <TextField
            label="Department"
            size="small"
            fullWidth
            onChange={(e) =>
              setFilters({
                ...filters,
                department: e.target.value
              })
            }
          />
          <TextField
            label="Year"
            size="small"
            fullWidth
            onChange={(e) =>
              setFilters({ ...filters, year: e.target.value })
            }
          />
          <Button
            variant="contained"
            onClick={loadStudents}
            sx={{ minWidth: isMobile ? "100%" : "120px" }}
          >
            Filter
          </Button>
        </Stack>

        {/* DataGrid */}
        <Box
          sx={{
            height: isMobile ? "auto" : "70vh",
            width: "100%"
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={isMobile}
            pageSizeOptions={[5, 10]}
            disableRowSelectionOnClick
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.08)",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#1e293b"
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#1e293b"
              },
              "& .MuiDataGrid-cell": {
                borderBottom:
                  "1px solid rgba(255,255,255,0.05)"
              }
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

