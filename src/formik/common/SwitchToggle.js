import React from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function SwitchToggle(props) {
  const { label, name } = props
  return (
    <div className="mt-4 form-control">
      <div className="relative inline-block w-10 mr-2 align-middle transition duration-200 ease-in select-none ">
        <Field name={name}>
          {({ form, field }) => {
            return (
              <input
                type="checkbox"
                name={name}
                id="toggle"
                checked={form.values[name]}
                onChange={() => {
                  form.setFieldValue(name, !form.values[name])
                }}
                className="absolute block w-6 h-6 bg-white border-4 rounded-full appearance-none cursor-pointer toggle-checkbox"
              />
            )
          }}
        </Field>

        <label
          htmlFor="toggle"
          className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer toggle-label"
        ></label>
      </div>
      <label htmlFor="toggle" className="font-medium text-gray-500 select-none">
        {label}
      </label>
      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default SwitchToggle

/* 
<div className="mt-4 font-medium text-gray-500 select-none">
        {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>

*/
