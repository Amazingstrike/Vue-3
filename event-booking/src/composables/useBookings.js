import {ref} from 'vue';

const bookings = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchBookings = async() => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('http://localhost:3001/bookings');
      bookings.value = await response.json();
    }
    catch (e) {
      error.value = e;
    }
    finally {
      loading.value = false;
    }
  };

const findBookingById = (id) => {
  bookings.value.findIndex((b) => b.id === id)
};

const handleRegistration = async(event) => {
  if (bookings.value.some((booking) => booking.eventId === event.id && booking.userId === 1)) {
    alert('You already registered for this event!');
    return;
  }

  const newBooking = {
    id: Date.now().toString(),
    userId: 1,
    eventTitle: event.title,
    eventId: event.id,
    status: 'pending'
  };

  bookings.value.push(newBooking); //Add newBooking straight into the list

  try {
    const response = await fetch('http://localhost:3001/bookings', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ...newBooking,
        status: 'confirmed',
      })
    }); //push newBooking to DB

    if (response.ok) {
      const index = findBookingById(newBooking.id);
      bookings.value[index] = await response.json();
    } //check if newBooking has successfully pushed to DB and update the status to confirmed
    else {
      throw new Error('Failed to register booking');
    }
  } 
  catch (error)
  {
    console.error('Failed to register for event: ', error);
    bookings.value = bookings.value.filter((successBookings) => successBookings.id !== newBooking.id)
  }
};

const cancelBooking = async(bookingId) => {
  const index = findBookingById(bookingId);
  const originalBooking = bookings.value[index];
  bookings.value.splice(index, 1);

  try {
    const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Booking could not be cancelled.');
    }
  } 
  catch (error) {
    console.log('Failed to cancel booking.', error);
    bookings.value.splice(index, 0, originalBooking);
  }
};

export default function useBookings() {
    return {
        bookings,
        loading,
        error,
        fetchBookings,
        handleRegistration,
        cancelBooking
    };
}