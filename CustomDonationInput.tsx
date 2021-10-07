import React, { FunctionComponent } from 'react'

export interface CustomDonationInputProps {
  name: string
  value: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export const CustomDonationInput: FunctionComponent<CustomDonationInputProps> =
  (props) => {
    const { name, value, onChange, className } = props
    return (
      <label>
        <input
          className={className}
          type="number"
          name={name}
          value={value}
          placeholder="0.00"
          step="0.01"
          pattern="^\d*(\.\d{0,2})?$"
          onChange={onChange}
        ></input>
      </label>
    )
  }

export default CustomDonationInput
