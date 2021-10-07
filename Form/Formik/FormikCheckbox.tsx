import { useField, FieldHookConfig } from 'formik'
import React, { FunctionComponent } from 'react'

import * as sc from './FormikCheckbox.styled'

import { FieldError } from '../FieldError'

export const formikCheckboxBaseClass = 'kernls-formik-checkbox'

export type FormikCheckboxProps = FieldHookConfig<string> & {
  className?: string
  onChecked?: (value: string) => void
  type?: string
}

export const FormikCheckbox: FunctionComponent<FormikCheckboxProps> = (
  props
) => {
  const { children, className, disabled, onChecked, type = 'checkbox' } = props

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField({ ...props, type: 'checkbox' })

  const classNames = [formikCheckboxBaseClass, className].join(' ')

  const showError = Boolean(meta.touched && meta.error)

  const onChange = (e) => {
    field.onChange(e)
    if (typeof onChecked === 'function') {
      onChecked(field.value)
    }
  }

  return (
    <sc.Wrapper className={classNames} showError={showError}>
      <input
        className={`${formikCheckboxBaseClass}__input`}
        disabled={disabled}
        id={props.name}
        type={type}
        {...field}
        onChange={onChange}
      />
      <label
        className={`${formikCheckboxBaseClass}__label`}
        htmlFor={props.name}
      >
        <span>{children}</span>
      </label>
      {showError ? (
        <FieldError className={`error ${formikCheckboxBaseClass}__error`}>
          {meta.error}
        </FieldError>
      ) : null}
    </sc.Wrapper>
  )
}
