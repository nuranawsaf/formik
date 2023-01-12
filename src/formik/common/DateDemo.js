/* eslint-disable @typescript-eslint/no-unused-vars */
// import DatePicker from 'react-datepicker'
// import { forwardRef, useEffect, useState } from 'react'
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
// import { format } from 'date-fns'

export default function DateDemo() {
  const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const MONTH_SHORT_NAMES = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line no-unused-vars
  function app() {
    return {
      showDatepicker: false,
      datepickerValue: '',
      selectedDate: '',
      dateFormat: 'YYYY-MM-DD',
      month: '',
      year: '',
      no_of_days: [],
      blankdays: [],
      initDate(newDate) {
        let today
        if (newDate) {
          this.selectedDate = newDate
        }
        if (this.selectedDate) {
          today = new Date(this.selectedDate.replace(/-/g, '/'))
        } else {
          today = new Date()
        }
        this.month = today.getMonth()
        this.year = today.getFullYear()
        this.datepickerValue = this.formatDateForDisplay(today)
      },
      formatDateForDisplay(date) {
        let formattedDay = DAYS[date.getDay()]
        let formattedDate = ('0' + date.getDate()).slice(-2) // appends 0 (zero) in single digit date
        let formattedMonth = MONTH_NAMES[date.getMonth()]
        let formattedMonthShortName = MONTH_SHORT_NAMES[date.getMonth()]
        let formattedMonthInNumber = (
          '0' +
          (parseInt(date.getMonth()) + 1)
        ).slice(-2)
        let formattedYear = date.getFullYear()
        if (this.dateFormat === 'DD-MM-YYYY') {
          return `${formattedDate}-${formattedMonthInNumber}-${formattedYear}` // 02-04-2021
        }
        if (this.dateFormat === 'YYYY-MM-DD') {
          return `${formattedYear}-${formattedMonthInNumber}-${formattedDate}` // 2021-04-02
        }
        if (this.dateFormat === 'D d M, Y') {
          return `${formattedDay} ${formattedDate} ${formattedMonthShortName} ${formattedYear}` // Tue 02 Mar 2021
        }
        return `${formattedDay} ${formattedDate} ${formattedMonth} ${formattedYear}`
      },
      isSelectedDate(date) {
        const d = new Date(this.year, this.month, date)
        return this.datepickerValue === this.formatDateForDisplay(d)
          ? true
          : false
      },
      isToday(date) {
        const today = new Date()
        const d = new Date(this.year, this.month, date)
        return today.toDateString() === d.toDateString() ? true : false
      },
      getDateValue(date) {
        let selectedDate = new Date(this.year, this.month, date)
        this.datepickerValue = this.formatDateForDisplay(selectedDate)
        // this.$refs.date.value = selectedDate.getFullYear() + "-" + ('0' + formattedMonthInNumber).slice(-2) + "-" + ('0' + selectedDate.getDate()).slice(-2);
        this.isSelectedDate(date)
        this.showDatepicker = false
      },
      getNoOfDays() {
        let daysInMonth = new Date(this.year, this.month + 1, 0).getDate()
        // find where to start calendar day of week
        let dayOfWeek = new Date(this.year, this.month).getDay()
        let blankdaysArray = []
        for (var i = 1; i <= dayOfWeek; i++) {
          blankdaysArray.push(i)
        }
        let daysArray = []
        for (let i = 1; i <= daysInMonth; i++) {
          daysArray.push(i)
        }
        this.blankdays = blankdaysArray
        this.no_of_days = daysArray
      },
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-200 ">
      <div /*  x-data="app()" x-init="[initDate(), getNoOfDays()]" x-cloak */>
        <div className="container mx-auto">
          <div className="mb-5">
            <label
              htmlFor="datepicker"
              className="block mb-1 font-bold text-gray-700"
            >
              Select Date
            </label>
            <div className="relative">
              <input
                type="hidden"
                name="date" /* x-ref="date" :value="datepickerValue" */
              />
              <input
                type="text" /* x-on:click="initDate(datepickerValue), showDatepicker = !showDatepicker" x-model="datepickerValue"
                        x-on:keydown.escape="showDatepicker = false" */
                className="w-full py-3 pl-4 pr-10 font-medium leading-none text-gray-600 rounded-lg shadow-sm focus:outline-none focus:shadow-outline"
                placeholder="Select date"
              />

              <div className="absolute top-0 right-0 px-3 py-2">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>

              {
                <div
                  className="absolute top-0 left-0 p-4 mt-12 bg-white rounded-lg shadow"
                  style={{ width: '17rem' }}
                  /*  x-show.transition="showDatepicker" @click.away="showDatepicker = false" */
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span
                        /*  x-text="MONTH_NAMES[month]" */
                        className="text-lg font-bold text-gray-800"
                      ></span>
                      <span
                        /* x-text="year" */
                        className="ml-1 text-lg font-normal text-gray-600"
                      ></span>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline hover:bg-gray-100"
                        /*  @click="if (month == 0) {
                                                    year--;
                                                    month = 12;
                                                } month--; getNoOfDays()" */
                      >
                        <svg
                          className="inline-flex w-6 h-6 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex p-1 transition duration-100 ease-in-out rounded-full cursor-pointer focus:outline-none focus:shadow-outline hover:bg-gray-100"
                        /*  @click="if (month == 11) {
                                                    month = 0; 
                                                    year++;
                                                } else {
                                                    month++; 
                                                } getNoOfDays()" */
                      >
                        <svg
                          className="inline-flex w-6 h-6 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap mb-3 -mx-1">
                    <template /*  x-for="(day, index) in DAYS" :key="index" */>
                      <div style={{ width: '14.26%' }} className="px-0.5">
                        <div
                          /* x-text="day" */
                          className="text-xs font-medium text-center text-gray-800"
                        ></div>
                      </div>
                    </template>
                  </div>

                  <div className="flex flex-wrap -mx-1">
                    <template /* x-for="blankday in blankdays" */>
                      <div
                        style={{ width: '14.28%' }}
                        className="p-1 text-sm text-center border border-transparent"
                      ></div>
                    </template>
                    <template /* x-for="(date, dateIndex) in no_of_days" :key="dateIndex" */
                    >
                      <div style={{ width: '14.28%' }} className="px-1 mb-1">
                        <div /* @click="getDateValue(date)" x-text="date" */
                          className="text-sm leading-none text-center transition duration-100 ease-in-out rounded-full cursor-pointer leading-loosex"
                          /* :className="{
                            'bg-indigo-200': isToday(date) == true, 
                            'text-gray-600 hover:bg-indigo-200': isToday(date) == false && isSelectedDate(date) == false,
                            'bg-indigo-500 text-white hover:bg-opacity-75': isSelectedDate(date) == true 
                        }" */
                        ></div>
                      </div>
                    </template>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
