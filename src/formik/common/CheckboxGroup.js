import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import uuid from 'react-uuid'
function CheckboxGroup(props) {
  const { label, name, options, ...rest } = props

  return (
    <div className="block">
      <div className="mt-4 font-medium text-gray-500 select-none">
        <span className="mr-1 text-red-400"></span> {label}
      </div>
      <div className="mt-2">
        <Field name={name}>
          {({ field }) => {
            return options.map((option) => {
              return (
                <div key={uuid()} className="flex">
                  <label className="inline-flex items-center py-1 text-primary">
                    <input
                      className="w-4 h-4 form-checkbox"
                      type="checkbox"
                      id={option.value}
                      {...field}
                      {...rest}
                      value={option.value}
                      checked={field.value.includes(option.value)}
                    />
                    <span className="ml-2 text-gray-600">{option.key}</span>
                  </label>
                </div>
              )
            })
          }}
        </Field>
        <ErrorMessage component={TextError} name={name} />
      </div>
    </div>
  )
}

export default CheckboxGroup
