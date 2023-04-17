import { ISeat } from "../interfaces/ISeat";
import { pool } from "../sqlConnection"
import { assignSeats } from "../utils/assignSeats";
import { objEntriesToCamelCase } from "../utils/toCamelCase";

const query = (queryData: string): any => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(queryData, (err, results) => {
        connection.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
}

export const checkIn = async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const flightDocQuery = await query(`SELECT * FROM flight f Where f.flight_id = ${id}`); 
    const flightDoc = objEntriesToCamelCase(flightDocQuery[0]);

    // const passagers = []
    const passagersDocQuery = await query(`
    SELECT p.*, b.boarding_pass_id, b.purchase_id, b.seat_type_id, b.seat_id 
    FROM airline.passenger p 
    left join boarding_pass b
    on b.passenger_id = p.passenger_id 
    where b.flight_id = ${id}`
    );
    const passagersDoc = passagersDocQuery.map(doc => objEntriesToCamelCase(doc));
    const sortByClass = assignSeats(passagersDoc);

    const seatsOrderDocQuery = await query(`SELECT * FROM seat where airplane_id = 1 order by seat_type_id desc , seat_column desc, seat_row asc;`);
    const seatsOrderDoc = seatsOrderDocQuery.map(doc => objEntriesToCamelCase(doc));
    
    

    return res.status(200).json({
      code: 200,
      data: {
        flightDoc,
        passegers: sortByClass,
        seats: matris,
      },
    });
  } catch (err: any) {
    return res.status(400).json({
      message: err.message,
    })
  }
};

