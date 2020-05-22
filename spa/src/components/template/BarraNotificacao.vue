<template>
  <v-snackbar :value="snackbar" top :color="snackbarError ? 'red' : 'success'" :timeout="timeout">
    {{snackbarText}}
    <v-btn text @click="snackbar = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: false,
      snackbarText: "",
      snackbarError: false,
      timeout: 2000
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "showMessage") {
        this.snackbarText = state.notificationContent;
        this.snackbarError = state.noticicationError;
        this.snackbar = true;
        setTimeout(() => {
          this.snackbar = false;
        }, this.timeout);
      }
    });
  }
};
</script>

<style>
</style>