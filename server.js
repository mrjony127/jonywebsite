const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "JONY server is online"
  });
});

app.post("/api/heartbeat", (req, res) => {
  const { deviceName } = req.body;

  if (!deviceName) {
    return res.status(400).json({
      ok: false,
      message: "Device name is required"
    });
  }

  res.json({
    ok: true,
    deviceName: deviceName,
    status: "online",
    timestamp: Date.now()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
