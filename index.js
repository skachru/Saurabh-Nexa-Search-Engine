const express = require("express");
const app = express();
app.use(express.json());

app.post("/search", async (req, res) => {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });
    res.status(r.status).json(await r.json());
  } catch (e) {
    res.status(500).json({ error: "proxy failed" });
  }
});

app.listen(process.env.PORT || 3001, () => console.log("proxy running"));