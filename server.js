
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/api/status", (req, res) => {
  res.json({
    ok: true,
    service: "JONY Secure System",
    message: "Backend is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({ status: "online" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`JONY server running on port ${PORT}`);
});
