import Select, { Props } from 'react-select'
import { useField, FieldHookConfig } from 'formik'
import React, { FunctionComponent } from 'react'

import * as sc from './FormikSelectProject.styled'

import { FieldError } from '../FieldError'
import { Disease } from '@/common/styled'
import { Paragraph } from '@/components/Paragraph'

const CustomOption = (props) => {
  const { data, innerProps, isDisabled, isFocused, isSelected } = props
  return (
    <sc.CustomOption
      {...innerProps}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      className={sc.customOptionBaseClass}
    >
      {data.disease ? (
        <Disease className={`${sc.customOptionBaseClass}__disease`}>
          {data.disease}
        </Disease>
      ) : null}
      <Paragraph classNames={`${sc.customOptionBaseClass}__label`}>
        {data.label}
      </Paragraph>
      <Paragraph classNames={`${sc.customOptionBaseClass}__ri`}>
        {data.researcherFullName
          ? `${data.researcherFullName} - ${data.reaseachInstitutionLabel}`
          : data.reaseachInstitutionLabel}
      </Paragraph>
    </sc.CustomOption>
  )
}

export interface SelectOption {
  disease: string
  researcherFullName: string
  reaseachInstitutionLabel: string
  label: string
  value: string
}

export type FormikSelectProjectProps = FieldHookConfig<SelectOption> & Props

export const FormikSelectProject: FunctionComponent<FormikSelectProjectProps> =
  (props) => {
    const { className, onChange, options } = props

    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and also replace ErrorMessage entirely.
    const [field, meta] = useField(props)
    const { name, value } = field

    const classNames = [sc.formikSelectBaseClass, className].join(' ')

    const showError = Boolean(meta.touched && meta.error)

    return (
      <sc.Wrapper className={classNames} showError={showError}>
        <Select
          classNamePrefix={sc.formikSelectBaseClass}
          options={options}
          name={name}
          onChange={onChange}
          value={value}
          components={{ Option: CustomOption }}
        />
        {showError ? (
          <FieldError className={`error ${sc.formikSelectBaseClass}__error`}>
            {meta.error}
          </FieldError>
        ) : null}
      </sc.Wrapper>
    )
  }
