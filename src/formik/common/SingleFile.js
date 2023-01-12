import React, { useState } from 'react'
// import { RiImageAddLine } from 'react-icons/ri'

// import axios from "axios";
import { classNames } from '../../../utils'
import { ErrorMessage, useFormikContext } from 'formik'
import { TextError } from '..'

export default function SingleFile(props) {
  const { label, name, notes = '', required, ...rest } = props
  const [dragEntered, setdragEntered] = useState(false)
  const [dragEnteredIntoImage, setdragEnteredIntoImage] = useState(false)
  // const [picture, setPicture] = useState(null)
  const {
    errors,
    values,
    // submitForm,
    setFieldValue,
    // validateField,
    // setFieldTouched,
    // setErrors,
  } = useFormikContext()
  const handleImageUpload = (file) => {
    console.log(file)
    setFieldValue(name, file)
    // setPicture(file)
    /* if (values[name].size > 1024 * 1024 * 5) {
      errors[name] = "File size rich over";
      setFieldTouched(name, true);
    } else {
      // errors[name] = null;
    } */
  }
  function humanFileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      ' ' +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
    )
  }
  // const handleSubmit = async () => {
  //
  //   var data = new FormData();
  //   data.append("file", picture);

  //   try {
  //     const config = {
  //       onUploadProgress: (progressEvent) => ,
  //     };
  //     let response = axios
  //       .post("http://localhost:5400/api/v1/media", data)
  //       .then(function (response) {
  //
  //
  //
  //
  //
  //       });
  //
  //     // return response;
  //   } catch (err) {
  //
  //   }
  // };

  return (
    <div>
      <div
        // onClick={() => handleSubmit()}
        className="mt-4 mb-2 font-medium text-gray-500 select-none"
      >
        {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>
      <div className="flex space-x-2">
        {values['url'] && !values[name] && (
          <img
            onLoad={(img) => {
              console.log({ img })
            }}
            className="object-cover w-40 min-h-full rounded-sm h-full"
            src={values['url']}
          />
        )}

        {values[name] && (
          <div
            className={classNames(
              'object-cover relative flex-shrink-0 p-1 w-32 h-32 rounded border border-dashed border-gray-200',
              dragEnteredIntoImage
                ? 'opacity-60 border-indigo-400 ring-4 ring-inset'
                : '',
              values[name].size > 1024 * 1024 * 5
                ? 'border-red-500 ring-4 ring-red-200 ring-inset'
                : ''
            )}
          >
            <img
              onLoad={async (img) => {
                const fileImg = await fetch(
                  'https://res.cloudinary.com/alasim/image/upload/v1573565593/samples/animals/three-dogs.jpg'
                ).then((r) => r.blob())
                console.log(humanFileSize(fileImg.size))
                console.log({
                  height: img.target.naturalHeight,
                  width: img.target.naturalWidth,
                })
              }}
              className="object-cover min-w-full min-h-full rounded-sm h-full"
              src={URL.createObjectURL(values[name])}
            />
            <div className="absolute bottom-0 left-0 right-0 flex flex-col p-2 text-xs bg-white bg-opacity-50">
              <span className="w-full font-bold text-gray-900 truncate">
                {values[name].name}
              </span>
              <span
                className={classNames(
                  'text-xs ',
                  values[name].size > 1024 * 1024 * 5
                    ? 'text-red-500 '
                    : 'text-gray-900'
                )}
              >
                {humanFileSize(values[name].size)}
              </span>
              {/* <div
                className="flex items-center justify-center w-full h-3 -mx-0 text-xs text-white bg-gray-500 rounded"
                style={{ maxWidth: "30%" }}
              >
                <span style={{ padding: "0 5px" }}>20%</span>
              </div> */}
            </div>
            <input
              accept="image/jpeg, image/png,image/svg+xml"
              {...rest}
              className="absolute  inset-0 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
              onChange={(e) => {
                handleImageUpload(e.target.files[0])
              }}
              onDrop={(e) => {
                e.preventDefault()
                handleImageUpload(e.dataTransfer.files[0])
                setdragEnteredIntoImage(false)
              }}
              onDragOver={(e) => {
                e.preventDefault()
                setdragEnteredIntoImage(true)
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                setdragEnteredIntoImage(false)
              }}
              title=""
            />
          </div>
        )}
        <div
          className={classNames(
            'relative flex w-full justify-center flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer',
            dragEntered ? 'opacity-70 border-indigo-400 ring-4 ring-inset' : ''
          )}
        >
          <input
            accept="image/jpeg, image/png,image/svg+xml"
            {...rest}
            className="absolute inset-0 z-0 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
            onChange={(e) => {
              handleImageUpload(e.target.files[0])
            }}
            onDrop={(e) => {
              e.preventDefault()
              handleImageUpload(e.dataTransfer.files[0])
              setdragEntered(false)
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setdragEntered(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              setdragEntered(false)
            }}
            title=""
          />

          <div className="flex flex-col items-center justify-center py-10 text-center">
            <svg
              className="w-6 h-6 mr-1 text-current-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {
              <p className={classNames(values[name] ? 'text-sm' : '')}>
                {values[name]
                  ? 'Drag an image or click here to replace.'
                  : 'Drag a file here or click in this area.'}
              </p>
            }
          </div>
        </div>
        {/*  {errors[name] && <div className="text-success">{errors[name]}</div>} */}
        <ErrorMessage component={TextError} name={name} />
      </div>
      {values['url'] || values[name] ? (
        <div className={classNames('mt-1 text-sm ', 'text-gray-500')}>
          <span className="font-semibold">{errors[name] && ''}NOTE.</span> Drag
          a new image to replace courrent image.
        </div>
      ) : (
        <div className={classNames('mt-1 text-sm ', 'text-gray-500')}>
          <span className="font-semibold">{errors[name] && ''}NOTE.</span> Drag
          a new image to add.
        </div>
      )}
    </div>
  )
}

/* 

          
          
          
          

*/
