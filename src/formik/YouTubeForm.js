/* eslint-disable no-useless-escape */
import React from 'react'
// import { gql, useMutation } from '@apollo/client'
// import InputField from './common/inputField'
import { useFormik } from 'formik'

const initialValues = {
  name: '',
  email: '',
  phone: '',
}
const onSubmit = () => {
  return
}
const validate = (values) => {
  let errors = {}
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!re.test(values.email)) {
    errors.email = 'Invalid email format'
  }
  return errors
}

function YouTubeForm() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  })

  return (
    <div className="justify-between max-w-full p-5 bg-white rounded shadow mt-7 ">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-between max-w-full">
          <div className="max-w-md">
            <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 capitalize">
              <span className="mr-1 text-red-400">*</span>Brand Name
            </div>
            <div
              className={`flex p-1 my-2 bg-white border  rounded ${
                formik.errors.name ? 'border-red-200' : 'border-gray-200'
              }`}
            >
              {' '}
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                placeholder="Nokia..."
                className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
              />{' '}
            </div>
            {formik.errors.name && (
              <div className="-mt-1 text-sm text-red-500">
                {formik.errors.name}
              </div>
            )}
          </div>
          {/* input filed start */}
          <div className="max-w-md">
            <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 capitalize">
              <span className="mr-1 text-red-400"></span> Email
            </div>
            <div
              className={`flex p-1 my-2 bg-white border  rounded ${
                formik.errors.email ? 'border-red-200' : 'border-gray-200'
              }`}
            >
              {' '}
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder="name@gmail.com"
                className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
              />{' '}
            </div>
            {formik.errors.email && (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            )}
          </div>
          {/* input filed start */}
          <div className="max-w-md">
            <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 capitalize">
              <span className="mr-1 text-red-400"></span> Phone
            </div>
            <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
              {' '}
              <input
                type="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                placeholder="01700 25 65 80"
                className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
              />{' '}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-56 py-2 mt-10 font-medium text-white bg-primary rounded px-7"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
export default YouTubeForm
