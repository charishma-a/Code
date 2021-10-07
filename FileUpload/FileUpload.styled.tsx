import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const baseClass = 'kernls-file-upload'

export const ImageActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;

  button {
    color: #006acb;
  }
`
export const ImageContainer = styled.div<
  HTMLAttributes<HTMLDivElement> & { isAvatar?: boolean }
>`
  align-items: center;
  background: rgba(0, 0, 0, 0.22);
  border: 1px dashed #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  img {
    height: 140px;
    width: 140px;
    border-radius: ${({ isAvatar }) => (isAvatar ? '50%' : '0')};
  }
`
export const ImageWrapper = styled.div``
export const FileDisplayContainer = styled.div`
  background: #ffffff;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  padding: 2rem;
  color: #565656;
`
export const FileDisplayWrapper = styled.div``

export const Wrapper = styled.div`
  background: #ffffff;
  border: 1px dashed #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
  text-align: center;
  font-size: 0.875rem;
  color: #828282;
  cursor: pointer;
`
