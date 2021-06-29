<template>
  <div class="transform bg-white p-2 w-full border rounded">
    <v-date-picker v-model="selected">
      <template #default="{ inputValue, togglePopover}">
        <div class="flex flex-wrap">
          <button
              v-for="date in dates"
              :key="date.date.getTime()"
              class="color font flex items-center bg-indigo-100 hover:bg-indigo-200 text-sm text-indigo-600 font-semibold h-8 px-2 m-1 rounded-lg border-2 border-transparent focus:border-indigo-600 focus:outline-none"
              @click.stop="dateSelected($event, date, togglePopover)"
              ref="button">
            {{ date.date.getFullYear() }}.{{ date.date.getMonth() + 1 }}
          </button>
        </div>
      </template>
    </v-date-picker>
  </div>
</template>

<script>
import Vue from 'vue';
import VCalendar from 'v-calendar';
// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'v',  // Use <vc-calendar /> instead of <v-calendar />
});
export default {
  data: function () {
    return {
      name: "calendar",
      dates: [
        {
          date: new Date(),
        },
      ],
      selected: undefined
    };
  },
  watch: {
    selected: function () {
      this.$emit("selected:date", this.selected)
    }
  },
  methods: {
    addDate() {
      this.dates.push({
        date: new Date(),
      });
      this.$nextTick(() => {
        const btn = this.$refs.button[this.$refs.button.length - 1];
        btn.click();
      });
    },
    removeDate(date, hide) {
      this.dates = this.dates.filter((d) => d !== date);
      hide();
    },
    dateSelected(e, date, toggle) {
      this.selected = date;
      toggle({ref: e.target});
    },
  },
}
</script>

<style lang="scss" scoped>
.transform {
  transform: scale(2.2);
}

.font {
  font-size: 25px;
  color: #f1f1f1;
  border: none;
  outline: none;
  font-weight: bold;
}

.color {
  background-color: transparent;
  border-style: none;
}
</style>