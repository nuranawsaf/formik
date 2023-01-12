import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import ReactHtmlParser from 'react-html-parser'
import { Field, ErrorMessage } from 'formik'
import TextError from './TextError'

function RichEditor(props) {
  const { label, name, required } = props
  const key = 'jc2bfl0q0cn3usys2htpx3i529mvhi7i8sqlfkp4180tucel'
  const editorRef = useRef(null)
  return (
    <div className="form-control  text-left">
      <div className="mt-4 mb-3 font-medium text-gray-500 select-none">
        {label}
        {required && <span className="mr-1 text-red-400">*</span>}
      </div>

      <Field name={name}>
        {({ field, form }) => {
          console.log(form.values)
          return (
            <div>
              <Editor
                onChange={(state) => {
                  form.setFieldValue(field.name, state.level.content)
                }}
                apiKey={key}
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={form.values[field.name]}
                init={{
                  selector: 'textarea#open-source-plugins',
                  plugins:
                    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
                  imagetools_cors_hosts: ['picsum.photos'],
                  menubar: 'file edit view insert format tools table help',
                  toolbar:
                    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                  toolbar_sticky: true,
                  autosave_ask_before_unload: true,
                  autosave_interval: '30s',
                  autosave_prefix: '{path}{query}-{id}-',
                  autosave_restore_when_empty: false,
                  autosave_retention: '2m',
                  image_advtab: false,
                  link_list: [
                    { title: 'My page 1', value: 'https://www.tiny.cloud' },
                    { title: 'My page 2', value: 'http://www.moxiecode.com' },
                  ],
                  image_list: [
                    { title: 'My page 1', value: 'https://www.tiny.cloud' },
                    { title: 'My page 2', value: 'http://www.moxiecode.com' },
                  ],
                  image_class_list: [
                    { title: 'None', value: '' },
                    { title: 'Some class', value: 'class-name' },
                  ],
                  importcss_append: true,
                  file_picker_callback: function (callback, value, meta) {
                    /* Provide file and text for the link dialog */
                    if (meta.filetype === 'file') {
                      callback('https://www.google.com/logos/google.jpg', {
                        text: 'My text',
                      })
                    }

                    /* Provide image and alt text for the image dialog */
                    if (meta.filetype === 'image') {
                      callback('https://www.google.com/logos/google.jpg', {
                        alt: 'My alt text',
                      })
                    }

                    /* Provide alternative source and posted for the media dialog */
                    if (meta.filetype === 'media') {
                      callback('movie.mp4', {
                        source2: 'alt.ogg',
                        poster: 'https://www.google.com/logos/google.jpg',
                      })
                    }
                  },
                  templates: [
                    {
                      title: 'New list with dates',
                      description: 'New List with dates',
                      content:
                        '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
                    },
                  ],
                  template_cdate_format:
                    '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                  template_mdate_format:
                    '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                  height: 600,
                  image_caption: false,
                  quickbars_selection_toolbar:
                    'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                  noneditable_noneditable_class: 'mceNonEditable',
                  toolbar_mode: 'sliding',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </div>
          )
        }}
      </Field>

      <ErrorMessage component={TextError} name={name} />
    </div>
  )
}

export default RichEditor
