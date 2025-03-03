<template>
  <template v-if="error">
    <ErrorCard :retry="fetchBookings">Could not load bookings at the moment.</ErrorCard>
  </template>
  <template v-else>
    <section class="grid grid-cols-1 gap-4">
      <template v-if="!loading">
        <BookingItem v-for="booking in bookings" :key="booking.id" :title="booking.eventTitle" :status="booking.status" @cancel="cancelBooking(booking.id)"/>
      </template>
      
      <template v-else>
        <LoadingBookingCard v-for="i in 3" :key="i"/>
      </template>
    </section>
  </template>
</template>

<script setup>
import {onMounted} from 'vue';
import LoadingBookingCard from '@/components/LoadingBookingCard.vue';
import ErrorCard from '@/components/ErrorCard.vue';
import BookingItem from '@/components/BookingItem.vue';
import useBookings from '@/composables/useBookings';

const {bookings, loading, error, fetchBookings, cancelBooking} = useBookings();
onMounted(() => {
  fetchBookings();
});
</script>