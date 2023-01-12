import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Input(props) {
  const { label, name, required } = props
  //
  return (
    <div className="form-control  text-left">
      <div className="mt-4 font-medium text-gray-500 select-none">
        {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>

      <Field name={name}>
        {({ field, form }) => {
          return (
            <div>
              <input
                type="text"
                {...field}
                placeholder={`${label} `}
                className={` ${
                  form.errors[name] && form.touched[name]
                    ? 'w-full px-4 py-2 my-2 rounded border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
                    : 'w-full px-4 py-2 my-2 border border-gray-200 rounded placeholder focus:outline-none focus:ring-2 focus:ring-gray-100'
                }`}
              />
            </div>
          )
        }}
      </Field>

      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default Input
