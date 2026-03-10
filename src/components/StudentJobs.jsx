import { useEffect, useState } from "react";
import {
  Box, Card, CardContent, Button, Typography
} from "@mui/material";
import axios from "axios";

export default function StudentJobs() {
  const studentId = "STUDENT_ID";
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("/api/jobs").then(res => setJobs(res.data));
  }, []);

  const apply = async jobId => {
    await axios.post("/api/applications", {
      job: jobId,
      student: studentId,
    });
    alert("Applied");
  };

  return (
    <Box p={3}>
      <Typography variant="h5">Available Opportunities</Typography>

      {jobs.map(j => (
        <Card key={j._id} sx={{mt:2}}>
          <CardContent>
            <Typography fontWeight={700}>{j.title}</Typography>
            <Typography>{j.company}</Typography>
            <Button sx={{mt:1}} onClick={()=>apply(j._id)}>
              Apply
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
