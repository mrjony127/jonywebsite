const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const PAIRING_CODE = process.env.PAIRING_CODE || "CHANGE-ME";

let pairedDevice = null;

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "JONY server is online"
  });
});

// Phone → Server
app.post("/api/heartbeat", (req, res) => {
  const { deviceName, pairingCode } = req.body;

  if (!deviceName || !pairingCode) {
    return res.status(400).json({
      ok: false,
      message: "Device name and pairing code are required"
    });
  }

  if (pairingCode !== PAIRING_CODE) {
    return res.status(401).json({
      ok: false,
      message: "Invalid pairing code"
    });
  }

  pairedDevice = {
    deviceName,
    status: "online",
    lastSeen: Date.now()
  };

  res.json({
    ok: true,
    status: "online"
  });
});

// Dashboard → Server
app.post("/api/pair", (req, res) => {
  const { pairingCode } = req.body;

  if (pairingCode !== PAIRING_CODE) {
    return res.status(401).json({
      ok: false,
      message: "Invalid pairing code"
    });
  }

  if (!pairedDevice) {
    return res.json({
      ok: true,
      paired: false,
      message: "No device connected"
    });
  }

  res.json({
    ok: true,
    paired: true,
    device: pairedDevice
  });
});

app.get("/api/status", (req, res) => {
  if (!pairedDevice) {
    return res.json({
      ok: true,
      paired: false
    });
  }

  const online =
    Date.now() - pairedDevice.lastSeen < 30000;

  res.json({
    ok: true,
    paired: true,
    device: {
      ...pairedDevice,
      status: online ? "online" : "offline"
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
