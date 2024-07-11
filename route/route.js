import express from "express";

import { nanoid } from "nanoid";
import urldata from "../models/url.js";
import { URL } from "node:url";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { LongUrl } = req.body;
  try {
    new URL(LongUrl);

    const shorty = nanoid(8);
    urldata.create({
      shortId: shorty,
      redirecturl: LongUrl,
    });

    res.json({
      redirection: `${req.protocol}://${req.get("host")}/${shorty}`,
    });
  } catch (error) {
    console.error("Error shortening URL:", error);
    return res
      .status(400)
      .json({ message: "Invalid URL. Please enter a valid URL." });
  }
});

router.get("/:shortId", async (req, res) => {
  const id = req.params.shortId;

  try {
    const urlLink = await urldata.findOne({ shortId: id });

    if (urlLink) {
      console.log(urlLink.redirecturl, "hi");
      res.redirect(urlLink.redirecturl);
    } else {
      res.status(404).json({ message: "URL not found" });
    }
  } catch (error) {
    console.error("Error finding short URL:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
