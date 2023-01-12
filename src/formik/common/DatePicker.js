import React from 'react'
import DateView from 'react-datepicker'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import 'react-datepicker/dist/react-datepicker.css'
function DatePicker(props) {
  const { label, name, timeSelect, required, ...rest } = props
  return (
    <div className="form-control relative z-10">
      <div className="mt-4 font-medium text-gray-500 select-none">
        {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form
          const { value } = field
          if (timeSelect)
            return (
              <DateView
                className={` ${
                  form.errors[name] && form.touched[name]
                    ? 'w-full px-4 py-2 my-2 rounded border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
                    : 'w-full px-4 py-2 my-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-100'
                }`}
                id={name}
                {...field}
                {...rest}
                showTimeSelect
                selected={value}
                placeholderText="Select a date"
                dateFormat="MMMM d, yyyy h:mm aa"
                onChange={(val) => {
                  setFieldValue(name, val)
                }}
              />
            )

          return (
            <DateView
              className="w-full px-4 py-2 my-2 border border-gray-200 rounded placeholder focus:outline-none focus:ring-2 focus:ring-gray-100"
              id={name}
              {...field}
              {...rest}
              selected={value}
              placeholderText="Select a date"
              dateFormat="MMMM d, yyyy"
              onChange={(val) => setFieldValue(name, val)}
            />
          )
        }}
      </Field>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default DatePicker
