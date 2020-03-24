import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../actions/index';
import { BookingCard } from './BookingCard';

export class BookingManage extends Component {
  componentWillMount() {
    this.props.dispatch(actions.fetchUserBookings());
  }

  renderBookingCards(bookings) {
    return bookings.map((booking, index) => {
      return <BookingCard booking={booking} key={index} />;
    });
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;

    return (
      <section id='userBookings'>
        <h1 className='page-title'>My Bookings</h1>
        <div className='row'>{this.renderBookingCards(bookings)}</div>
        {!isFetching && bookings.length === 0 && (
          <div className='alert alert-warning'>
            You have no bookings created go to rentals section and book your
            place today.
            <Link
              style={{ marginLeft: '10px' }}
              className='btn btn-bwm'
              to='/rentals'
            >
              Available Rental
            </Link>
          </div>
        )}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  };
}

export default connect(mapStateToProps)(BookingManage);
