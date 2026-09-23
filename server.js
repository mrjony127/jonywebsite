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
