import Select, { Props } from 'react-select'
import { useField, FieldHookConfig } from 'formik'
import React, { FunctionComponent } from 'react'

import * as sc from './FormikSelect.styled'

import { FieldError } from '../FieldError'

export const formikSelectBaseClass = 'kernls-formik-select'

export interface SelectOption {
  label: string
  value: string
}

export type FormikSelectProps = FieldHookConfig<SelectOption> & Props

export const FormikSelect: FunctionComponent<FormikSelectProps> = (props) => {
  const { className, onChange, options } = props

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.

  const [field, meta] = useField(props)
  const { name, value } = field

  const classNames = [formikSelectBaseClass, className].join(' ')

  const showError = Boolean(meta.touched && meta.error)

  return (
    <sc.Wrapper className={classNames} showError={showError}>
      <Select
        classNamePrefix={formikSelectBaseClass}
        options={options}
        name={name}
        onChange={onChange}
        value={value}
      />
      {showError ? (
        <FieldError className={`error ${formikSelectBaseClass}__error`}>
          {meta.error}
        </FieldError>
      ) : null}
    </sc.Wrapper>
  )
}
