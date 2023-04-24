var express = require("express")
var cors = require("cors")
const multer = require("multer")
const bodyParser = require("body-parser") // Add this line
require("dotenv").config()

var app = express()

const upload = multer({ dest: "uploads/" })

app.use(cors())
app.use("/public", express.static(process.cwd() + "/public"))

app.use(bodyParser.urlencoded({ extended: true })) // Add this line

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/views/index.html")
})

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
	const fileType = req.file.mimetype
	const fileSize = req.file.size
	const fileName = req.file.originalname
	res.send({ name: fileName, type: fileType, size: fileSize })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
	console.log("Your app is listening on port " + port)
})
