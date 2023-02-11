import { db } from '../database/database.connection.js'

export async function buscarCliente(req, res) {
  try {
    const cliente = await db.query("SELECT * FROM customers")

    res.send(cliente.rows)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function criarCliente(req, res) {
  console.log("criar cliente") //tirar depois
  const { name, phone, cpf, birthday } = req.body

  console.log(name, phone, cpf, birthday) //tirar depois

  try {   
    const cliente = await db.query(`
    INSERT INTO customers (name, phone, cpf, birthday)
    VALUES ($1, $2, $3, $4);`
      , [name, phone, cpf, birthday])

    console.log(cliente) //tirar depois
    
    res.sendStatus(201)
  } catch (error) {
    res.send(error.message).status(400)
  }
}