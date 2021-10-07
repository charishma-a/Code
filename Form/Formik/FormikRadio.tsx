import { useField, FieldHookConfig } from 'formik'
import React, { FunctionComponent } from 'react'

import * as sc from './FormikRadio.styled'

import { FieldError } from '../FieldError'

export const formikRadioBaseClass = 'kernls-formik-radio'

export type FormikRadioProps = FieldHookConfig<string> & {
  className?: string
  onChecked?: (value: string) => void
  type?: string
  value: string
}

export const FormikRadio: FunctionComponent<FormikRadioProps> = (props) => {
  const {
    children,
    className,
    disabled,
    onChecked,
    type = 'radio',
    value,
  } = props

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField({ ...props, type: 'radio' })

  const classNames = [formikRadioBaseClass, className].join(' ')

  const showError = Boolean(meta.touched && meta.error)

  const onChange = (e) => {
    field.onChange(e)
    if (typeof onChecked === 'function') {
      onChecked(field.value)
    }
  }

  return (
    <sc.Wrapper showError={showError} className={classNames}>
      <div
        key={props.name}
        className={`${formikRadioBaseClass}__input-wrapper`}
      >
        <input
          className={`${formikRadioBaseClass}__input`}
          disabled={disabled}
          id={`${props.name}-${value}`}
          type={type}
          {...field}
          onChange={onChange}
        />
        <label
          className={`${formikRadioBaseClass}__label`}
          htmlFor={`${props.name}-${value}`}
        >
          {children}
        </label>
      </div>
      {showError ? (
        <FieldError className={`error ${formikRadioBaseClass}__error`}>
          {meta.error}
        </FieldError>
      ) : null}
    </sc.Wrapper>
  )
}
