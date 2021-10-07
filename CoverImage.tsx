import { FunctionComponent } from 'react'
import styled from 'styled-components'

export interface ImageProps {
  height: string
  src: string
}

const StyledImage = styled.div<ImageProps>`
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: 0px 0px;
  height: ${({ height }) => height};
`

export const CoverImage: FunctionComponent<ImageProps> = (props) => {
  const { height, src } = props
  return <StyledImage className="kernls-image" height={height} src={src} />
}
