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
  
  try {
    const jogo = await db.query(`
    INSERT INTO games (name, image, stockTotal, pricePerDay) VALUES ($1, $2, $3, $4);`, [name, image, stockTotal, pricePerDay])

    console.log(jogo)

    res.send(201)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

/*export async function buscarReceitaPorId(req, res) {
  const { id } = req.params
  try {
    // const receita = await db.query(`SELECT * FROM receitas WHERE id = $1;`, [id])
    const receita = await db.query(`SELECT * FROM receitas WHERE id = ${id}`)

    res.send(receita.rows[0])
  } catch (error) {
    res.status(500).send(error.message)
  }
}*/