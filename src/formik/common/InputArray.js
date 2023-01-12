import React from 'react'
import { Field, FieldArray } from 'formik'
import { FiMinus, FiPlus } from 'react-icons/fi'

export default function InputArray(props) {
  const { label, name, required } = props
  return (
    <div className="form-control">
      <div className="mt-4 font-medium text-gray-500 select-none">
        List of {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>
      <FieldArray name={name}>
        {(fieldArrayProps) => {
          const { push, remove, form } = fieldArrayProps
          const { values } = form
          const { tags } = values
          //
          //
          return (
            <div>
              {tags.map((tag, index) => (
                <div className="flex items-center" key={index}>
                  <Field name={`tags[${index}]`}>
                    {({ field, form }) => {
                      return (
                        <div>
                          <input
                            type="text"
                            {...field}
                            placeholder={`${label} `}
                            className={` ${
                              form.errors[`${name}[${index}]`] &&
                              form.touched[`${name}[${index}]`]
                                ? 'w-full px-4 py-2 my-2 rounded border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200'
                                : 'w-full px-4 py-2 my-2 border border-gray-200 rounded placeholder focus:outline-none focus:ring-2 focus:ring-gray-100'
                            }`}
                          />
                        </div>
                      )
                    }}
                  </Field>
                  {index > 0 && (
                    <button
                      className="w-10 transition-all duration-200 hover:scale-105 h-10 ml-2 flex items-center justify-center border rounded-md text-red-500"
                      type="button"
                      onClick={() => remove(index)}
                    >
                      <FiMinus />
                    </button>
                  )}
                  <button
                    className="w-10 transition-all duration-200 hover:scale-105 h-10 ml-2 flex items-center justify-center border rounded-md text-green-500"
                    type="button"
                    onClick={() => push('')}
                  >
                    <FiPlus />
                  </button>
                </div>
              ))}
            </div>
          )
        }}
      </FieldArray>
    </div>
  )
}
