import { db } from '../database/database.connection.js'

export async function buscarJogos(req, res) {
  try {
    const jogos = await db.query("SELECT * FROM games")

    res.send(jogos.rows)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function criarCliente(req, res) {
  console.log("criar cliente")
  const { name, phone, cpf, birthday } = req.body


  console.log(name, phone, cpf, birthday)

  

  try {
    console.log("criar cliente 2")
    //const cliente = await db.query(`INSERT INTO customers (name, phone, cpf, birthday)) VALUES (name, phone, cpf, birthday);`)

    const cliente = await db.query(`
    INSERT INTO customers (name, phone, cpf, birthday)
    VALUES ($1, $2, $3, $4);`
      , [name, phone, cpf, birthday])


    console.log(cliente)
    
    res.send(cliente).status(201)
  } catch (error) {
    res.status(400).send(error.message)
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