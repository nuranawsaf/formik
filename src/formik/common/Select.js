import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Select(props) {
  const { label, name, required, options, ...rest } = props
  const newOptions = [{ key: 'Select an option', value: '' }, ...options]
  // const items = newOptions.map((option) => {
  //   return (
  //     <option key={option.value} value={option.value}>
  //       {option.key}
  //     </option>
  //   )
  // })

  return (
    <div className="form-control">
      <div className="mt-4 font-medium text-gray-500 select-none">
        {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>
      <Field
        as="select"
        id={name}
        name={name}
        /* onChange={(e) => {
          
        }} */
        {...rest}
        className="w-full px-4 py-2 my-2 border border-gray-200 rounded form-select focus:outline-none focus:ring-2 focus:ring-gray-100"
      >
        {newOptions.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          )
        })}
      </Field>
      {/* <Field
        as="select"
        id={name}
        name={name}
        {...rest}
        className="w-full px-4 py-2 my-2 border border-gray-200 rounded form-select focus:outline-none focus:ring-2 focus:ring-gray-100"
      >
        {async ({ field, form, meta }) => {
          

          return <div>{{items}}</div>;
        }}
      </Field> */}
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Select
