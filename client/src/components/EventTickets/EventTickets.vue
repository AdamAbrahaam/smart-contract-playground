<template>
  <div class="flex justify-content-between">
    <span class="p-float-label w-full">
      <InputText id="eventName" type="text" v-model="eventName" class="w-full" />
      <label for="eventName">Event name</label>
    </span>
    <span class="p-float-label w-full">
      <InputText id="dateTime" type="text" v-model="dateTime" class="w-full" />
      <label for="dateTime">Date and time</label>
    </span>
    <span class="p-float-label w-full">
      <InputText id="ticketPrice" type="text" v-model="ticketPrice" class="w-full" />
      <label for="ticketPrice">Ticket price</label>
    </span>
  </div>
  <Button class="p-button-outlined w-full" @click="createEvent(eventName, dateTime, ticketPrice)" label="Create event" />


  <Dropdown v-model="selectedEvent" :options="events" optionLabel="name" placeholder="Available events" class="w-full mt-8" />
  <template v-if="selectedEvent">
    <p>
      Name: {{ selectedEvent.name }}
    </p>
    <p>
      Date and time: {{ selectedEvent.dateTime }}
    </p>
    <p>
      Price: {{ formatEther(selectedEvent.price) }}
    </p>

    <Button class="p-button-outlined w-full" @click="buyTicket(selectedEvent.id, selectedEvent.price)" label="Buy ticket" />
  </template>

  <div v-if="addressTickets.length" class="mt-8">
    <p>
      Your tickets
    </p>
    <img v-for="ticket in addressTickets" :key="ticket.id" :src="ticket.metadata.image" :alt="ticket.title" height="250" class="mx-1">
  </div>
</template>

<script setup lang="ts">
import { useEventTickets } from "@/composables/EventTickets/EventTickets";
import { ref } from "vue";

const { createEvent, buyTicket, events, addressTickets, formatEther } = await useEventTickets()

const eventName = ref<string>('')
const dateTime = ref<string>('')
const ticketPrice = ref<string>('')
const selectedEvent = ref(null)
</script>
