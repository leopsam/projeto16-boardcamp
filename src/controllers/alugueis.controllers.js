import { db } from '../database/database.connection.js'
import dayjs from 'dayjs'

let data = dayjs().format("YYYY-M-DD")

export async function criarAluguel(req, res) {
  console.log(data)
  const games = await db.query("SELECT * FROM games")

  const { customerId, gameId, daysRented } = req.body
  const rentDate = data
  const originalPrice = daysRented * games.rows[gameId-1].pricePerDay
  const returnDate = null
  const delayFee = null


  //if (cpf.length != 11) return res.sendStatus(400)
  //if (isNaN(Number(cpf))) return res.sendStatus(400)

  
  
  console.log(games.rows[gameId-1].stockTotal)
  
  if(!games.rows[gameId-1]) return res.sendStatus(400)
  if(games.rows[gameId-1].stockTotal < 0) return res.sendStatus(400)

/*
  const arrayCpfs = cpfsClientes.rows
  arrayCpfs.map((c) => {
    if (c.cpf === cpf) return res.sendStatus(409)
  })
*/

  try {   
    await db.query(`INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") 
    VALUES ($1, $2, $3, $4, $5, $6, $7);`, [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee])
    res.sendStatus(201)
  } catch (error) {
    res.send(error.message).status(400)
  }
}

export async function buscarAlugueis(req, res) {

  console.log("rodou get aluguis")

  //const games = await db.query("SELECT * FROM games")
  //const customers = await db.query("SELECT * FROM customers")
  

  try {
    /*
    
    const resultGuests = await db.query('SELECT * FROM guests');
    const resultRooms = await db.query('SELECT * FROM rooms');
    const resultAllocations = await db.query('SELECT * FROM allocations');

    const finalResult = resultAllocations.rows.map(allocation => ({
      ...allocation,
      guestName: resultGuests.rows.find(guest => guest.id === allocation.guestId).name,
      roomName: resultRooms.rows.find(room => room.id === allocation.roomId).name,
    }))

    */

    const games = await db.query("SELECT * FROM games")
    const customers = await db.query("SELECT * FROM customers")
    const alugueis = await db.query("SELECT * FROM rentals")

    //let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() )) ;  

    //console.log(customers.rows.find(c => c.id === alugueis.rows[0].customerId).name)

    const finalResult = alugueis.rows.map(a => ({

      
          id: a.id, 
          customerId: a.customerId,
          gameId: a.gameId,
          rentDate: (a.rentDate.getFullYear() + "-" + ((a.rentDate.getMonth() + 1)) + "-" + (a.rentDate.getDate() )),
          daysRented: a.daysRented,
          returnDate: a.returnDate,
          originalPrice: a.originalPrice,
          delayFee: a.delayFee,
          /*phone: cliente.rows[0].phone, 
          cpf: cliente.rows[0].cpf, 
          birthday: dataFormatada,
       

        ...a,*/

        customer: {
          id: customers.rows.find(c => c.id === a.customerId).id,
          name: customers.rows.find(c => c.id === a.customerId).name
        },
        
        game: {
          id: customers.rows.find(g => g.id === a.gameId).id,
          name: games.rows.find(g => g.id === a.gameId).name,
        }      

    }))

console.log(finalResult)


    /*const alugueis = await db.query("SELECT * FROM rentals")

    let arrayAlugalis =[]
    alugueis.rows.map((a)=>{
      arrayAlugalis.push(a)

      let game = {} 
      arrayAlugalis = [...game: {
        name: a
      }

      }])
      
      //console.log(games.rows[a.gameId])
      
    })
    console.log(games.rows[7-1])
    //console.log(arrayAlugalis)
    */
    res.send(finalResult)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

export async function finalizarAluguelPorId(req, res) {
  console.log('finalizarAluguelPorId')

  const { id } = req.params
  
    const aluguel = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id]);
    const game = await db.query(`SELECT * FROM games WHERE id = $1;`, [aluguel.rows[0].gameId]);
    
    //console.log(data)
    let dataFormatada = (aluguel.rows[0].rentDate.getFullYear() + "-" + ((aluguel.rows[0].rentDate.getMonth() + 1)) + "-" + (aluguel.rows[0].rentDate.getDate() ))  
    //console.log(game.rows[0].pricePerDay)

    const diffInMs   = new Date(dataFormatada) - new Date(data)
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    //console.log(diffInDays)
    const delayFee = diffInDays * game.rows[0].pricePerDay

    console.log(delayFee)
    if (aluguel.rows.length === 0){
      return res.sendStatus(404)
    } 
    
    const aluguelReturno = await db.query(`UPDATE rentals SET "returnDate" = '${data}', "delayFee" = '${delayFee}' WHERE id = $1;`, [id]);
    if (!aluguelReturno) return res.sendStatus(404)

  try {
    res.sendStatus(200);
  } catch (error) {
    res.status(404).send(error.message)
  }
}
/*



export async function atualizarCliente(req, res) {
  const { id } = req.params
  const { name, phone, cpf, birthday } = req.body

  console.log(Number(cpf))

  if (cpf.length != 11) return res.sendStatus(400)
  if (isNaN(Number(cpf))) return res.sendStatus(400)

  const clienteCpf = await db.query(`SELECT * FROM customers WHERE id = $1;`, [id]);
  console.log(clienteCpf.rows[0].cpf)

  const cpfsClientes = await db.query("SELECT cpf FROM customers")
  const arrayCpfs = cpfsClientes.rows
  arrayCpfs.map((c) => {
    if (c.cpf === cpf && cpf != clienteCpf.rows[0].cpf) return res.sendStatus(409)
   })  

  try {
    const cliente = await db.query(`UPDATE Customers SET name = '${name}', phone = '${phone}', cpf = '${cpf}', birthday = '${birthday}' WHERE id = $1;`, [id]);
    if (!cliente) return res.sendStatus(404)

    res.status(200).send(cliente.rows[0]);
  } catch (error) {
    res.status(500).send(error.message)
  }
}
*/