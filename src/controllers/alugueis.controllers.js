import { db } from '../database/database.connection.js'
import dayjs from 'dayjs'

let data = dayjs().format("YYYY-M-DD")

export async function criarAluguel(req, res) {
  const games = await db.query("SELECT * FROM games")
  const alugueis = await db.query("SELECT * FROM rentals")

  const { customerId, gameId, daysRented } = req.body
  const rentDate = data
  const originalPrice = daysRented * games.rows[gameId-1].pricePerDay
  const returnDate = null
  const delayFee = null

  let somaStock = 0

  alugueis.rows.map((a)=>{
    if(a.gameId === gameId){
      somaStock++
    }
  })
  
  if(somaStock >= games.rows[gameId-1].stockTotal) return res.sendStatus(400)  
  if(!games.rows[gameId-1]) return res.sendStatus(400)
  if(games.rows[gameId-1].stockTotal < 0) return res.sendStatus(400)

  try {   
    await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee])
    res.sendStatus(201)
  } catch (error) {
    res.send(error.message).status(400)
  }
}

export async function buscarAlugueis(req, res) {
  try {
    const games = await db.query("SELECT * FROM games")
    const customers = await db.query("SELECT * FROM customers")
    const alugueis = await db.query("SELECT * FROM rentals")

    const finalResult = alugueis.rows.map(a => ({      
      id: a.id, 
      customerId: a.customerId,
      gameId: a.gameId,
      rentDate: (a.rentDate.getFullYear() + "-" + ((a.rentDate.getMonth() + 1)) + "-" + (a.rentDate.getDate() )),
      daysRented: a.daysRented,
      returnDate: a.returnDate,
      originalPrice: a.originalPrice,
      delayFee: a.delayFee,
      customer: {
        id: customers.rows.find(c => c.id === a.customerId).id,
        name: customers.rows.find(c => c.id === a.customerId).name
      },      
      game: {
        id: customers.rows.find(g => g.id === a.gameId).id,
        name: games.rows.find(g => g.id === a.gameId).name,
      } 
    }))

    res.send(finalResult)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function finalizarAluguelPorId(req, res) {
  const { id } = req.params

  try {
    const aluguel = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id])
    if (aluguel.rows.length === 0) return res.sendStatus(404) 
    if (aluguel.rows[0].returnDate != null) return res.sendStatus(400)

    const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [aluguel.rows[0].gameId])
    const diaAludado = (aluguel.rows[0].rentDate.getFullYear() + "-" + ((aluguel.rows[0].rentDate.getMonth() + 1)) + "-" + (aluguel.rows[0].rentDate.getDate()))  
    const diffInMs   = new Date(data) - new Date(diaAludado)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);   
    let delayFee = game.rows[0].pricePerDay * diffInDays
    const diasPassados = diffInDays - aluguel.rows[0].daysRented     
    let time = new Date(diaAludado)
    let entraga = new Date()
    entraga.setDate(time.getDate() + diffInDays)
    let timeCerto = new Date(diaAludado)
    let entragaCerto = new Date()
    entragaCerto.setDate(timeCerto.getDate() + aluguel.rows[0].daysRented)
    const diaCerto = (entragaCerto.getFullYear() + "-" + ((entragaCerto.getMonth() + 1)) + "-" + (entragaCerto.getDate()))
    const diaEntraga = (entraga.getFullYear() + "-" + ((entraga.getMonth() + 1)) + "-" + (entraga.getDate()))
    
    if(diaCerto < diaEntraga){
      delayFee = game.rows[0].pricePerDay * diasPassados
    }

    if(diasPassados <= 0){
      delayFee = 0
    }
    const aluguelReturno = await db.query(`UPDATE rentals SET "returnDate" = '${data}', "delayFee" = '${delayFee}' WHERE id = $1;`, [id])

    if (aluguel.rows.length === 0) return res.sendStatus(404) 
    if (!aluguelReturno) return res.sendStatus(404)

    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(error.message)
  }
}

export async function deletarAluguelPorId(req, res) {
  const { id } = req.params

  try {
    const aluguel = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id])
    if (aluguel.rows.length === 0) return res.sendStatus(404) 
    if (aluguel.rows[0].returnDate === null) return res.sendStatus(400)

    await db.query(`DELETE FROM rentals WHERE id = $1;`, [id])

    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(error.message)
  }
}