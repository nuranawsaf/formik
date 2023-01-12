import React from 'react'
import PickColor from './common/PickColor'
import {
  Input,
  Textarea,
  SelectOption,
  RadioButtons,
  CheckboxGroup,
  SwitchToggle,
  DatePicker,
  SingleFile,
  MultipleFiles,
  Submit,
  InputArray,
  RichEditor,
} from './index'
function FormikControl(props) {
  const { control, ...rest } = props

  switch (control) {
    case 'input':
      return <Input {...rest} />
    case 'textarea':
      return <Textarea {...rest} />
    case 'rich_editor':
      return <RichEditor {...rest} />
    case 'input_array':
      return <InputArray {...rest} />
    case 'select':
      return <SelectOption {...rest} />
    case 'radio':
      return <RadioButtons {...rest} />
    case 'checkbox':
      return <CheckboxGroup {...rest} />
    case 'switch':
      return <SwitchToggle {...rest} />
    case 'date':
      return <DatePicker {...rest} />
    case 'color':
      return <PickColor {...rest} />
    case 'image':
      return <SingleFile {...rest} />
    case 'images':
      return <MultipleFiles {...rest} />
    case 'submit':
      return <Submit {...rest} />
    default:
      return null
  }
}

export default FormikControl
