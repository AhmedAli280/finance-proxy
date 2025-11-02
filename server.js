import express from "express";
import fetch from "node-fetch";
const app = express();
app.use(express.json());

app.all("*", async (req, res) => {
  try {
    const response = await fetch("https://finance-lganokgllq-uc.a.run.app" + req.path, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined
    });
    const data = await response.text();
    res.status(response.status).send(data);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

app.listen(8080, () => console.log("✅ Proxy running on port 8080"));
export default app;
