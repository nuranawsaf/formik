import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import uuid from 'react-uuid'
function RadioButtons(props) {
  const { label, name, selected, options, ...rest } = props
  return (
    <div className="block">
      <div className="mt-4 font-medium text-gray-500 select-none">
        <span className="mr-1 text-red-400"></span> {label}
      </div>
      <div className="mt-2">
        <Field name={name}>
          {({ field }) => {
            return options.map((option) => {
              console.log('field', field)

              return (
                <div key={uuid()} className="flex">
                  <label className="inline-flex items-center py-1 text-gray-600">
                    <input
                      type="radio"
                      className="text-primary form-radio"
                      name={name}
                      id={option.value}
                      {...field}
                      {...rest}
                      defaultChecked={options[0].value == option.value}
                      value={option.value}
                      checked={field.value == option.value}
                    />
                    <span className="ml-2">{option.key}</span>
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

export default RadioButtons
