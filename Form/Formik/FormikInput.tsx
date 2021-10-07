import { useField, FieldHookConfig } from 'formik'
import React, { ChangeEvent, FunctionComponent, useState } from 'react'

import * as sc from './FormikInput.styled'

import { FieldError } from '../FieldError'

import SvgPasswordReveal from '@/generated/svgs/PasswordReveal'

export const formikInputBaseClass = 'kernls-formik-input'

export type FormikInputProps = FieldHookConfig<string> & {
  className?: string
  label?: string
  labelNode?: React.ReactNode
  type?: string
  max?: number
  maxLength?: number
  min?: number
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  showCharacterCount?: boolean
  showFeedbackMessage?: boolean
  step?: string
}

export const FormikInput: FunctionComponent<FormikInputProps> = (props) => {
  const {
    className,
    disabled,
    label,
    max,
    maxLength,
    min,
    onChange,
    placeholder,
    showCharacterCount = false,
    showFeedbackMessage = true,
    step,
  } = props
  const initialType = props.type || 'text'
  const isInitialTypePassword = initialType === 'password'
  const [type, setType] = useState(initialType)
  const onClickShowPassword = () => {
    setType((prev) => {
      if (prev === 'text') {
        return 'password'
      }
      return 'text'
    })
  }

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)

  const classNames = [
    formikInputBaseClass,
    `${formikInputBaseClass}__input`,
    className,
  ].join(' ')

  const showError = Boolean(meta.touched && meta.error)

  const renderLabel = () => {
    if (label) {
      if (showCharacterCount) {
        const typeCount = field.value.length || 0
        const charCountText = maxLength
          ? `${typeCount}/${maxLength}`
          : typeCount
        return (
          <sc.LabelWrapper className={`${formikInputBaseClass}__label-wrapper`}>
            <sc.Label
              className={`${formikInputBaseClass}__label`}
              htmlFor={props.name}
            >
              {label}
            </sc.Label>
            <span className={`${formikInputBaseClass}__char-count`}>
              {charCountText}
            </span>
          </sc.LabelWrapper>
        )
      }

      return (
        <sc.Label
          className={`${formikInputBaseClass}__label`}
          htmlFor={props.name}
        >
          {label}
        </sc.Label>
      )
    }
    return null
  }

  return (
    <sc.Wrapper showError={showError}>
      {renderLabel()}
      <sc.InputWrapper isInitialTypePassword={isInitialTypePassword}>
        <input
          className={classNames}
          disabled={disabled}
          id={props.name}
          placeholder={placeholder}
          type={type}
          {...field}
          max={max}
          maxLength={maxLength}
          min={min}
          onChange={onChange || field.onChange}
          step={step}
        />
        {isInitialTypePassword ? (
          <sc.ShowPasswordButton onClick={onClickShowPassword} type="button">
            <SvgPasswordReveal color="#C4C4C4" width="22" height="15" />
          </sc.ShowPasswordButton>
        ) : null}
      </sc.InputWrapper>
      {showFeedbackMessage && showError ? (
        <FieldError className={`error ${formikInputBaseClass}__error`}>
          {meta.error}
        </FieldError>
      ) : null}
    </sc.Wrapper>
  )
}
