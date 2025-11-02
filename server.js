import express from "express";
import fetch from "node-fetch";
const app = express();
app.use(express.json());

app.all("*", async (req, res) => {
  try {
    const target = "https://us-central1-cfo-system.cloudfunctions.net/finance" + req.path;
    console.log("🔁 Forwarding to:", target);
    const response = await fetch(target, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
      timeout: 10000
    });

    const text = await response.text();
    console.log("✅ Response:", text);
    res.status(response.status).send(text);
  } catch (error) {
    console.error("❌ Proxy error:", error.message);
    res.status(500).json({ ok: false, message: "Proxy failed: " + error.message });
  }
});

app.listen(8080, () => console.log("🚀 Proxy running on port 8080"));
export default app;
