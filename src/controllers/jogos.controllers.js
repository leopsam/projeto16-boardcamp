import { db } from '../database/database.connection.js'

export async function buscarJogos(req, res) {
  try {
    const jogos = await db.query("SELECT * FROM games")

    res.send(jogos.rows)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function criarJogo(req, res) {
  console.log("criar jogo")
  const { name, image, stockTotal, pricePerDay } = req.body

  console.log(name, image, stockTotal, pricePerDay)  

  try {
    const jogo = await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay])
    
    res.sendStatus(201)
  } catch (error) {
    res.status(400).send(error.message)
  }
}