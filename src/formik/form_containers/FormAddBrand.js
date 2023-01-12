/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../FormikControl'
import { gql, useMutation } from '@apollo/client'
// import AddBrandFormContainer from '../../formic/form_containers/FormAddBrand'

const ADD_BRAND = gql`
  mutation AddBrand($name: String!, $image: String, $website: String) {
    insert_Brand_one(
      object: { name: $name, image: $image, website: $website }
    ) {
      name
    }
  }
`

function AddBrandFormContainer() {
  // eslint-disable-next-line no-unused-vars
  const [addBrand, { loading, error }] = useMutation(ADD_BRAND)

  if (loading) return 'Submitting...'
  if (error) return `Submission error! ${error.message}`

  const initialValues = {
    name: '',
    image: '',
    website: '',
  }
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
  })

  const onSubmit = (values, submitProps) => {
    submitProps.setSubmitting(false)
    submitProps.resetForm()
  }

  /*   const onSubmit = (values,) => {
     addBrand({
      variables: values,
    });
    
  }; */

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formic) => (
        <Form>
          <FormikControl
            control="input"
            type="name"
            label="Name"
            name="name"
            required={true}
          />
          {
            <FormikControl
              control="input"
              type="text"
              label="Brand Image"
              name="image"
            />
          }
          <FormikControl
            control="input"
            type="text"
            label="Brand Website"
            name="website"
          />
          <button
            disabled={!formic.isValid || formic.isSubmitting}
            type={formik.values['step'] == 4 ? 'submit' : 'button'}
            className="w-56 py-2 mt-10 font-medium text-white bg-primary rounded px-7"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}
export default AddBrandFormContainer
