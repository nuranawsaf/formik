import React from 'react'

export default function Submit({
  formik,
  classes = 'w-56',
  label = 'Submit',
  ...rest
}) {
  return (
    <button
      {...rest}
      disabled={!formik.isValid || formik.isSubmitting}
      className={`py-2 mt-10 font-medium text-white bg-primary rounded px-7 ${classes}`}
    >
      {label}
    </button>
  )
}
