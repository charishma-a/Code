import { useField, FieldHookConfig } from 'formik'
import React, { FunctionComponent } from 'react'

import * as sc from './FormikDonationAmountInput.styled'

import { FieldError } from '../FieldError'

export const formikDonationAmountInputBaseClass =
  'kernls-formik-donation-amount-input'

export type FormikDonationAmountInputProps = FieldHookConfig<string> & {
  className?: string
  currency?: string
  type?: string
  placeholder?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormikDonationAmountInput: FunctionComponent<FormikDonationAmountInputProps> =
  (props) => {
    const {
      className,
      currency,
      disabled,
      placeholder,
      onChange,
      type = 'number',
    } = props

    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField({ ...props, type: 'number' })

    const classNames = [
      formikDonationAmountInputBaseClass,
      `${formikDonationAmountInputBaseClass}__input`,
      className,
    ].join(' ')

    const showError = Boolean(meta.touched && meta.error)

    return (
      <sc.Wrapper showError={showError}>
        <label
          className={`${formikDonationAmountInputBaseClass}__label`}
          htmlFor={props.name}
        >
          <span>{currency.toUpperCase()}</span>
          <input
            className={classNames}
            disabled={disabled}
            id={props.name}
            placeholder={placeholder}
            min={5}
            max={5000}
            step="1"
            type="number"
            {...field}
            onChange={onChange}
          />
        </label>
        {showError ? (
          <FieldError
            className={`error ${formikDonationAmountInputBaseClass}__error`}
          >
            {meta.error}
          </FieldError>
        ) : null}
      </sc.Wrapper>
    )
  }
