<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="createModal"
      tabindex="-1"
      aria-labelledby="createModal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Event erstellen</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <EventForm :localXRef=localXRef :localYRef=localYRef ></EventForm> />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventForm from '../EventForm.vue'

defineProps<{
  localXRef: number;
  localYRef: number;
}>();
</script>
