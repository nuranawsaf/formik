import React, { useState } from 'react'
import { Formik } from 'formik'
// import { useMutation } from '@apollo/client'
import { useToast } from '../features/toast/Components/Toast/ToastProvider'
import { RiRefreshLine } from 'react-icons/ri'
import { classNames } from '../../utils'
import { gql, useMutation } from '@apollo/client'
import { useSelector } from 'react-redux'
import {
  convertLocalDateToUTCIgnoringTimezone,
  convertUTCToLocalDateIgnoringTimezone,
} from '../../utils/util'
const ADD_ACTIVITY = gql`
  mutation add_activites(
    $detail: String = ""
    $userId: Int = 10
    $type: String = ""
  ) {
    insert_activites_one(
      object: { detail: $detail, userId: $userId, type: $type }
    ) {
      id
    }
  }
`
function FormicContainer({
  title,
  children,
  QUREY,
  initialValues,
  validationSchema,
  // checking = false,
  // getFormik = () => Formik,
  stateLoading,
  handleReload,
}) {
  const [uploadData] = useMutation(QUREY)
  const [add_activity] = useMutation(ADD_ACTIVITY)
  const user = useSelector((state) => state.user.value)
  const [fakeStateLoading, setFakeStateLoading] = useState(false)
  const toast = useToast()
  const onSubmit = async (values, submitProps) => {
    submitProps.setSubmitting(true)
    let dataCopy = { ...values }
    // eslint-disable-next-line no-prototype-builtins
    if (dataCopy.hasOwnProperty('image') && dataCopy.image.name) {
      const body = new FormData()
      body.append('file', dataCopy.image)
      body.append('upload_preset', 'ndb-uploads')
      const data = await fetch(
        'https://api.cloudinary.com/v1_1/klwebco/image/upload',
        {
          method: 'POST',
          body,
        }
      ).then((r) => r.json())

      delete dataCopy['image']
      dataCopy['image'] = data.url
    } else if (dataCopy.url) {
      dataCopy['image'] = dataCopy.url
    }
    console.log(dataCopy.date)
    if (dataCopy.date) {
      dataCopy.data = convertUTCToLocalDateIgnoringTimezone(dataCopy.date)
    }

    try {
      // eslint-disable-next-line no-undef
      if (!user) {
        toast?.pushError(
          `user not found, login please!`,
          10000,
          'truncate-3-lines'
        )
        return
      }
      dataCopy['userId'] = user.id
      console.log('dataCopy....')
      console.log(dataCopy)
      // if (user) return
      await uploadData({
        variables: dataCopy,
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      await add_activity({
        variables: dataCopy.activity,
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      const audio = new Audio('/assets/audios/notification 2.mp3')
      if (audio) {
        audio.play()
      }
      toast?.pushSuccess(`${title} success!`, 5000)
      if (!dataCopy.edit) submitProps.resetForm()
    } catch (error) {
      alert('catched error')
      toast?.pushError(`${error.message}`, 10000, 'truncate-3-lines')
    } finally {
      submitProps.setSubmitting(false)
    }
  }

  return (
    <div className="justify-between w-full p-5 mt-8 bg-white rounded shadow ">
      <div className="flex items-center justify-between">
        <div className="mt-1 text-lg font-medium text-gray-700 select-none">
          {title}
        </div>
        {handleReload && (
          <RiRefreshLine
            onClick={() => {
              handleReload()
              setFakeStateLoading(true)
              setTimeout(() => {
                setFakeStateLoading(false)
              }, 500)
            }}
            className={classNames(
              'text-gray-400 cursor-pointer ',
              stateLoading || fakeStateLoading ? 'animate-spin' : ''
            )}
          />
        )}
      </div>
      <div className="my-2 border_v"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {children}
      </Formik>
    </div>
  )
}
export default FormicContainer

{
  /* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form>
              {children}
              <button
                disabled={!formik.isValid || formik.isSubmitting}
                type="submit"
                className="w-56 py-2 mt-10 font-medium text-white bg-primary rounded px-7"
              >
                Submit
              </button>
            </Form>
          );
        }}
      </Formik> */
}
