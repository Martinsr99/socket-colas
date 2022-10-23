const { TicketControl } = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("ultimo-ticket", ticketControl.ultimo);

  socket.on("siguiente-ticket", (payload, callback) => {
    const siguiente = ticketControl.siguiente();
    callback(siguiente);

    //TODO Notificar que hay ticket nuevo que asignar
  });

  socket.on("atender-ticket", ({ escritorio }, callback) => {
    if (!escritorio) {
      return callback({
        ok: false,
        msg: "Ek escritorio es obligatorio",
      });
    }

    const ticket = ticketControl.atenderTicket(escritorio);
    if (!ticket) {
      callback({
        ok: false,
        mesg: "Ya no hay tickets pendientes",
      });
    } else {
        callback({
            ok:true,
            ticket
        })
    }
  });
};

module.exports = {
  socketController,
};
