import { db } from '../database/database.connection.js'

export async function buscarReceitas(req, res) {
  try {
    const receitas = await db.query("SELECT * FROM receitas")

    res.send(receitas.rows)

  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function buscarReceitaPorId(req, res) {
  const { id } = req.params
  try {
    // const receita = await db.query(`SELECT * FROM receitas WHERE id = $1;`, [id])
    const receita = await db.query(`SELECT * FROM receitas WHERE id = ${id}`)

    res.send(receita.rows[0])
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function criarReceita(req, res) { }

export async function apagarUmaReceita(req, res) { }

export async function atualizarUmaReceita(req, res) { }
