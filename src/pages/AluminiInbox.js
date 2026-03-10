import { useEffect, useState } from "react";
import { Card, Typography, Button, Stack } from "@mui/material";
import { getInbox, updateStatus } from "../../api/mentorship";
import { useAuthStore } from "../../store/authStore";

export default function AlumniInbox() {
  const { user } = useAuthStore();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getInbox(user.id).then((res) => setRequests(res.data));
  }, [user.id]);

  return (
    <Stack spacing={2}>
      {requests.map((req) => (
        <Card key={req._id} sx={{ p: 2 }}>
          <Typography>{req.message}</Typography>

          <Stack direction="row" spacing={2} mt={2}>
            <Button
              color="success"
              onClick={() => updateStatus(req._id, "accepted")}
            >
              Accept
            </Button>
            <Button
              color="error"
              onClick={() => updateStatus(req._id, "rejected")}
            >
              Reject
            </Button>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
