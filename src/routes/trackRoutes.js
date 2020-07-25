const express = require("express");

const mongoose = require("mongoose");

const requireAuth = require("../middlewares/requireAuth");

const Track = mongoose.model("Track");

const router = express.Router();

router.use(requireAuth); //nos aseguramos de que todos los usuarios esten logueados

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  //si el usuario no tiene nninguna track devuelve un array vacio
  return res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  //puede ocurrer que el usuario no envie el array de locations correcto o el name entonces puede fallar
  //por eso usaremos el try catch
  const { name, locations } = req.body;

  if (!name || !locations) {
    return res
      .status(402)
      .send({ error: "Usted debe proporcionar el nombre y las ubicaciones" });
  }
  try {
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});
module.exports = router;
