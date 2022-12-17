import express from "express"
import capture from "capture-website"
import { KnownDevices } from "puppeteer"
const app = express()
const port = process.env.PORT || 3000

app.get("/imgen", async (req, res) => {
  const mid = req.query.mid
  const cid = req.query.cid
  let device = req.query.device
  if (!(device in KnownDevices)) device = "iPhone X"

  const page = await capture.buffer(`https://ln.hako.vn/truyen/${mid}/${cid}`, {
    fullPage: true,
    type: "jpeg",
    emulateDevice: device
  })
  res.end(page, "binary")
})

app.listen(port, () => console.log(`app listening on port ${port}!`))
