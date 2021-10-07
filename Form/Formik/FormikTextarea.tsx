import { useField, FieldHookConfig } from 'formik'
import React, { ChangeEvent, FunctionComponent } from 'react'

import * as sc from './FormikTextarea.styled'

import { FieldError } from '../FieldError'

export const formikInputBaseClass = 'kernls-formik-text-area'

export type FormikTextareaProps = FieldHookConfig<string> & {
  className?: string
  label?: string
  labelNode?: React.ReactNode
  max?: number
  maxLength?: number
  min?: number
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  showCharacterCount?: boolean
  showFeedbackMessage?: boolean
  step?: string
}

export const FormikTextarea: FunctionComponent<FormikTextareaProps> = (
  props
) => {
  const {
    className,
    disabled,
    label,
    maxLength,
    onChange,
    placeholder,
    showCharacterCount = false,
    showFeedbackMessage = true,
  } = props

  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)

  const classNames = [
    formikInputBaseClass,
    `${formikInputBaseClass}__textarea`,
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
      <sc.TextareaWrapper>
        <textarea
          className={classNames}
          disabled={disabled}
          id={props.name}
          placeholder={placeholder}
          {...field}
          maxLength={maxLength}
          onChange={onChange || field.onChange}
        />
      </sc.TextareaWrapper>
      {showFeedbackMessage && showError ? (
        <FieldError className={`error ${formikInputBaseClass}__error`}>
          {meta.error}
        </FieldError>
      ) : null}
    </sc.Wrapper>
  )
}
