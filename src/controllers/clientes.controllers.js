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

  console.log(Number(cpf))

  if (cpf.length != 11) return res.sendStatus(400)
  if (isNaN(Number(cpf))) return res.sendStatus(400)


/*
  const arrayCpf = cpf.split('')
  console.log(arrayCpf)

  for(let i = 0; arrayCpf.length < i; i++){
    console.log(arrayCpf[i])
    if (arrayCpf[i] != 1 || arrayCpf[i] != "2" || arrayCpf[i] != "3" || arrayCpf[i] != "4" || arrayCpf[i] != "5" || arrayCpf[i] != "6" || arrayCpf[i] != "7" || arrayCpf[i] != "8" || arrayCpf[i] != "9" || arrayCpf[i] != "0"){
      console.log(arrayCpf[i])
      return res.sendStatus(401)
    }
  }
*/
  const namesClientes = await db.query("SELECT cpf FROM customers")
  const arrayNames = namesClientes.rows
  arrayNames.map((c) => {
    if (c.cpf === cpf) return res.sendStatus(409)
  })

  try {   
    await db.query(`
    INSERT INTO customers (name, phone, cpf, birthday)
    VALUES ($1, $2, $3, $4);`
      , [name, phone, cpf, birthday])

    res.sendStatus(201)
  } catch (error) {
    res.send(error.message).status(400)
  }
}

export async function buscarClientePorId(req, res) {
  const { id } = req.params
  try {
    const cliente = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);

    if (cliente) return res.sendStatus(404)

    res.send(cliente.rows[0]);
  } catch (error) {
    res.status(500).send(error.message)
  }
}