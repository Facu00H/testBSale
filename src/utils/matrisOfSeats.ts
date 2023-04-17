import { ISeat } from "../interfaces/ISeat";

const matris = {
  firstClass: {},
  secondClass: {},
  thirdClass: {},
}

export const generateMatris = (seats: ISeat[], matris: Record<string, ISeat[]>): void => {
  seats.forEach((seat: ISeat) => {
    if (seat.seatTypeId === 1) {
      matris.firstClass[`${seat.seatRow}-${seat.seatColumn}`] = seat.seatId
    } else if (seat.seatTypeId === 2) {
      matris.secondClass[`${seat.seatRow}-${seat.seatColumn}`] = seat.seatId
    } else {
      matris.thirdClass[`${seat.seatRow}-${seat.seatColumn}`] = seat.seatId
    }
  });
}

// TODO RECORRER EL ARRAY Y VERIFICAR LOS ASIENTOS QUE YA ESTAN OCUPADOS. EN BASE A ESO ASIGNARLOS A LOS ASIENTOS VACIOS A LOS QUE NO TIENEN
