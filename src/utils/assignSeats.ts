import { IPasagger } from "../interfaces/IPassager";

export const assignSeats = (pasajeros: IPasagger[]) => {
  const firstClass: IPasagger[] = [];
  const secondClass: IPasagger[] = [];
  const economyClass: IPasagger[] = [];

  pasajeros.forEach((pasajero: IPasagger) => {
    if (pasajero.seatTypeId === 1) {
      firstClass.push(pasajero);
    } else if (pasajero.seatTypeId === 2) {
      secondClass.push(pasajero);
    } else {
      economyClass.push(pasajero);
    }
  })
  return {
    businessClass: firstClass.sort((a , b) => a.purchaseId - b.purchaseId),
    premiumCalss: secondClass.sort((a , b) => a.purchaseId - b.purchaseId),
    turistClass: economyClass.sort((a , b) => a.purchaseId - b.purchaseId),
  }
}

const matris = {
  firstClass: {},
  secondClass: {},
  thirdClass: {},
}
seatsOrderDoc.forEach((seat: ISeat) => {
  if (seat.seatTypeId === 1) {
    matris.firstClass[`${seat.seatRow}-${seat.seatColumn}`] = seat.seatId
  } else if (seat.seatTypeId === 2) {
    matris.secondClass[`${seat.seatRow}-${seat.seatColumn}`] = seat.seatId
  } else {
    matris.thirdClass[`${seat.seatRow}-${seat.seatColumn}`] = seat.seatId
  }
});