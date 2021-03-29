const express = require("express")
const app = express()
const { spawn } = require("child_process")

app.get("/", function (req, res) {
  const ls = spawn("yarn", ["run", "build"], {
    cwd: ".",
  })

  process.stdin.pipe(ls.stdin)

  ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`)
  })

  ls.stderr.on("data", data => {
    console.log(`stderr: ${data}`)
  })

  ls.on("close", code => {
    res.send("done")
  })
})

app.listen(3000)
