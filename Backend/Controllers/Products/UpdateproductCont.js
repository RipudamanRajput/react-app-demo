module.exports = (req, res) => {
    res.status(200).send(req.body?.productinfo);
    console.log(req.body)
    console.log(req.files, "files")
}