import React, { useState } from 'react'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'
import { SketchPicker } from 'react-color'
export default function PickColor(props) {
  const { label, name, required } = props
  const [color, setcolor] = useState('#fff')
  const [show, setshow] = useState(false)

  return (
    <div className="form-control">
      <div className="mt-4 font-medium text-gray-500 select-none">
        {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>

      <Field name={name}>
        {({ form }) => {
          setcolor(form.values[name])
          return (
            <>
              <div
                onClick={() => setshow(!show)}
                className="w-20 h-10 p-1 mt-2 border border-gray-200 rounded"
              >
                {' '}
                <div
                  className="w-full rounded-sm h-full"
                  style={{ backgroundColor: color }}
                ></div>
              </div>
              {show && (
                <SketchPicker
                  color={form.values[name]}
                  onChange={(updateColor) => {
                    // form.values[name] = updateColor.hex
                    console.log('updateColor.hex from on change')
                    console.log(updateColor.hex)
                    setcolor(updateColor.hex)
                  }}
                  onChangeComplete={(updateColor) => {
                    console.log('updateColor.hex from on complete')
                    console.log(updateColor.hex)
                    form.values[name] = updateColor.hex
                    delete form.errors['Color']
                    // setshow(false)
                  }}
                  onSwatchHover={() => {
                    return
                  }}
                />
              )}
            </>
          )
        }}
      </Field>

      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}
