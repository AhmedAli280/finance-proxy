import express from "express";
import fetch from "node-fetch";
const app = express();
app.use(express.json());

app.all("*", async (req, res) => {
  try {
    const fullUrl = "https://cfo-api-322380215405.us-central1.run.app/finance";
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ ok: false, message: "Proxy failed: " + error.message });
  }
});

app.listen(8080, () => console.log("🚀 Proxy running on port 8080"));
export default app;
