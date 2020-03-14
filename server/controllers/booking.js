const moment = require('moment');

const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/user');

exports.createBooking = function(req, res) {
  const { startAt, endAt, totalPrice, guest, days, rental } = req.body;
  const user = res.locals.user;
  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guest,
    days
  });

  Rental.findById(rental._id)
    .populate('bookings')
    .populate('user')
    .exec(function(err, foundRental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      if (foundRental.user.id.toString() === user.id.toString()) {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid User!',
              detail: 'Cannot create booking on your Rental!!'
            }
          ]
        });
      }

      if (isValidBooking(booking, foundRental)) {
        booking.user = user;
        booking.rental = foundRental;
        foundRental.bookings.push(booking);
        booking.save(function(err) {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          }
          foundRental.save(function(err) {
            if (err) {
              return res
                .status(422)
                .send({ errors: normalizeErrors(err.errors) });
            }
          });
          User.update(
            { _id: user.id },
            { $push: { bookings: booking } },
            function() {
              if (err) {
                return res
                  .status(422)
                  .send({ errors: normalizeErrors(err.errors) });
              }
            }
          );
          return res.json({ startAt: booking.startAt, endAt: booking.endAt });
        });
      } else {
        return res.status(422).send({
          errors: [
            {
              title: 'Invalid Booking!',
              detail: 'Chosen dates are already taken'
            }
          ]
        });
      }
    });
};

function isValidBooking(proposedBooking, rental) {
  let isValid = true;
  if (rental.bookings && rental.bookings.length > 0) {
    isValid = rental.bookings.every(function(booking) {
      const proposedStart = moment(proposedBooking.startAt);
      const proposedEnd = moment(proposedBooking.endAt);
      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);

      return (
        (actualStart < proposedStart && actualEnd < proposedStart) ||
        (proposedEnd < actualEnd && proposedEnd < actualStart)
      );
    });
  }

  return isValid;
}
