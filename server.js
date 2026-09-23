const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/api/health", (req, res) => {
  res.json({ status: "online" });
});

app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    service: "JONY Secure System"
  });
});

// Secure device pairing endpoint
app.post("/api/pair", (req, res) => {
  const { pairingCode, deviceName } = req.body;

  if (!pairingCode || !deviceName) {
    return res.status(400).json({
      ok: false,
      message: "Pairing code and device name are required"
    });
  }

  if (pairingCode !== process.env.PAIRING_CODE) {
    return res.status(401).json({
      ok: false,
      message: "Invalid pairing code"
    });
  }

  res.json({
    ok: true,
    message: "Device paired successfully",
    deviceName
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`JONY server running on port ${PORT}`);
});
