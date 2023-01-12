import React from 'react'

function InputField({
  name,
  placeholder = 'Example...',
  type = 'text',
  width = 'max-w-md',
  // required = false,
  onChange,
  value,
}) {
  return (
    <div className={width}>
      <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 capitalize">
        <span className="mr-1 text-red-400"></span> Phone
      </div>
      <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
        <input
          type={type}
          name={`${name}`}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
        />
      </div>
    </div>
  )
}
export default InputField
