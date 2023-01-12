import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function Textarea(props) {
  const { label, name, required, ...rest } = props
  return (
    <div className="form-control">
      <div className="mt-4 font-medium text-gray-500 select-none">
        {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>
      <Field name={name}>
        {({ field, form }) => {
          return (
            <div>
              <textarea
                type="textarea"
                {...rest}
                {...field}
                rows="4"
                placeholder={`${label} `}
                className={` ${
                  form.errors[name] && form.touched[name]
                    ? 'w-full px-4 py-2 my-2 rounded border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
                    : 'w-full px-4 py-2 my-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-100'
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

export default Textarea
