const express = require("express")
const {generate} = require("text-to-image")
const dataUriToBuffer = require("data-uri-to-buffer")
const app = express()
const port = process.env.PORT || 3000

app.get("/imgen", async (req, res) => {
  const text = req.query.text
  if (!text) return res.status(400).send("No text provided")
  console.log("requesting " + text)
  const dataUri = await generate(text, {
    // fontFamily: "Times New Roman,Georgia,serif",
    fontPath: "./assets/fonts/Merriweather.ttf",
    fontFamily: "Merriweather,Noto Sans JP, sans-serif",
    fontSize: 18,
    margin: 15,
    maxWidth: 414,
    lineHeight: 28,
    textColor: "#ffffffbf",
    bgColor: "#222222"
  })
  const image = dataUriToBuffer(dataUri)
  res.end(image, "binary")
})

app.listen(port, () => console.log(`app listening on port ${port}!`))
