import React, { useState } from 'react'
import { classNames } from '../../../utils'
import { useFormikContext } from 'formik'
// import * as Yup from 'yup'
export default function MultipleFiles(props) {
  const { name, ...rest } = props
  const [dragEntered, setdragEntered] = useState(false)
  const [pictures, setPictures] = useState([])
  const {
    errors,
    values,
    // submitForm,
    setFieldValue,
    // validateField,
    // setFieldTouched,
    // setErrors,
  } = useFormikContext()
  const [savedPictures, setSavedPictures] = useState([...values['urls']])
  console.log('values[name]')
  console.log(values[name])
  const handleImageUpload = (files) => {
    const tempArr = []

    ;[...files].forEach((file) => {
      tempArr.push({
        data: file,
        url: URL.createObjectURL(file),
      })
    })

    setFieldValue(name, [...values[name], ...tempArr])
  }
  function humanFileSize(size) {
    const i = Math.floor(Math.log(size) / Math.log(1024))
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      ' ' +
      ['B', 'kB', 'MB', 'GB', 'TB'][i]
    )
  }

  return (
    <div className="bg-white p7 rounded w-full mx-auto">
      <div
        /* x-data="dataFileDnD()" */
        className="relative flex flex-col p-4 text-gray-400  rounded"
      >
        <div
          /*  x-ref="dnd" */
          className={classNames(
            'relative flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer',
            dragEntered ? 'border-blue-400 ring-4 ring-inset' : ''
          )}
        >
          <input
            accept="image/jpeg, image/png,image/svg+xml"
            {...rest}
            multiple
            className="absolute inset-0 z-30 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
            /* @change="addFiles($event)"
            @dragover="$refs.dnd.classList.add('border-blue-400'); $refs.dnd.classList.add('ring-4'); $refs.dnd.classList.add('ring-inset');"
            @dragleave="$refs.dnd.classList.remove('border-blue-400'); $refs.dnd.classList.remove('ring-4'); $refs.dnd.classList.remove('ring-inset');"
            @drop="$refs.dnd.classList.remove('border-blue-400'); $refs.dnd.classList.remove('ring-4'); $refs.dnd.classList.remove('ring-inset');" */
            onChange={(e) => {
              handleImageUpload(e.target.files)
            }}
            onDrop={(e) => {
              e.preventDefault()
              handleImageUpload(e.dataTransfer.files)
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
            <p className="m-0">Drag your files here or click in this area.</p>
          </div>
        </div>
        <div className="mt-4">
          {values[name].length ? (
            <h4 className="">Images to be uploaded</h4>
          ) : (
            <span></span>
          )}
          <div
            className="grid grid-cols-2 gap-4 mt-2 md:grid-cols-6"
            /* @drop.prevent="drop($event)"
            @dragover.prevent="$event.dataTransfer.dropEffect = 'move'" */
          >
            {values[name]?.map((e) => {
              return (
                <div
                  className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none"
                  style={{ 'padding-top': '100%' }}
                  /* @dragstart="dragstart($event)" @dragend="fileDragging = null"
                  :className="{'border-blue-600': fileDragging == index}"  */
                  /* draggable="true" :data-index="index" */
                >
                  <button
                    onClick={() => {
                      values[name].splice(values[name].indexOf(e), 1)
                      setPictures([...pictures])
                    }}
                    className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                    type="button" /* @click="remove(index)" */
                  >
                    <svg
                      className="w-4 h-4 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>

                  <img
                    className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                    src={e.url}
                  />

                  <div className="absolute -bottom-1 -left-1 -right-1 flex flex-col p-2 text-xs bg-white bg-opacity-50">
                    <span className="w-full font-bold text-gray-900 truncate">
                      {e.data.name}
                    </span>
                    <span className="text-xs text-gray-900">
                      {humanFileSize(e.data.size)}
                    </span>
                    {/* <div
                    className="flex items-center justify-center w-full h-3 text-xs text-white bg-gray-500 rounded"
                    style={{ maxWidth: "30%" }}
                  >
                    <span style={{ padding: "0 5px" }}>20%</span>
                  </div> */}
                  </div>

                  <div
                    className="absolute inset-0 z-40 transition-colors duration-300"
                    /* @dragenter="dragenter($event)"
                      @dragleave="fileDropping = null"
                      :className="{'bg-blue-200 bg-opacity-80': fileDropping == index && fileDragging != index}" */
                  ></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'text-sm ',
          errors[name] ? 'text-red-500' : 'text-gray-500'
        )}
      >
        <span className="font-semibold">
          {errors[name] && 'File Error '}NOTE.
        </span>{' '}
        Maximum upload file size:<span className="font-semibold"> 5MB</span>,
        Maximum number of files: <span className="font-semibold"> 10</span>
      </div>
      <div className="mt-4">
        {values['urls'].length ? (
          <h4 className="">Already uploaded images</h4>
        ) : (
          <span></span>
        )}
        <div className="grid grid-cols-2 gap-4 mt-2 md:grid-cols-6">
          {values['urls']?.map((e) => {
            return (
              <div
                className="relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none"
                style={{ 'padding-top': '100%' }}
              >
                <button
                  onClick={() => {
                    values['urls'].splice(values['urls'].indexOf(e), 1)

                    setSavedPictures([...savedPictures])
                  }}
                  className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                  type="button" /* @click="remove(index)" */
                >
                  <svg
                    className="w-4 h-4 text-gray-700"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>

                <img
                  className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                  src={e}
                />

                <div className="absolute inset-0 z-40 transition-colors duration-300"></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
