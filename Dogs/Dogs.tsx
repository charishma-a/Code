import { Theme } from '@material-ui/core/styles'
import { gql, useQuery } from '@apollo/client'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

interface SelectProps {
  name: string
  theme: Theme
}
const Select = styled.select`
  background-color: ${({ theme }: SelectProps) => {
    return theme.palette.primary.main
  }};
`

export function DogsPure({ dogs, onDogSelected }) {
  return (
    <Select name="dog" onChange={onDogSelected}>
      {dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </Select>
  )
}
DogsPure.propTypes = {
  dogs: PropTypes.array,
  onDogSelected: PropTypes.func,
}
DogsPure.defaultProps = {
  dogs: [],
  onDogSelected: () => null,
}

export const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`

export function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error! {error.message}</p>

  return <DogsPure onDogSelected={onDogSelected} dogs={data.dogs} />
}
