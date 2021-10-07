import { pxToRem } from '@/utils/pxToRem'
import { HTMLAttributes } from 'react'
import styled from 'styled-components'

export const baseClass = 'kernls-social-post-create-form'

export const NoPostCreated = styled.div`
  align-items: center;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  min-height: 156px;
  width: 100%;
`

export const Posts = styled.div``

export const PostOptions = styled.div`
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 2rem;

  &&,
  p {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
    color: #000000;
  }
`

export const PostOptionButton = styled.button<
  HTMLAttributes<HTMLDivElement> & { isSelected?: boolean }
>`
  background: #f8f8f8;
  border-radius: 4px;
  border: 1px solid transparent;
  height: 48px;
  width: 100%;
  font-size: ${pxToRem({ px: 14 })};
  font-weight: bold;
  line-height: ${pxToRem({ px: 21 })};
  text-align: center;
  color: #565656;

  ${({ isSelected }) => {
    if (isSelected) {
      return `
        background: #F8F5FF;
        color: #825EFF;
      `
    }
    return ''
  }}
`

export const EmptyView = styled.div`
  align-items: center;
  background-color: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
`

export const Container = styled.div`
  max-width: 783px;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
`

export const Wrapper = styled.div`
  width: 100%;

  &&,
  p {
    font-size: ${pxToRem({ px: 14 })};
    line-height: ${pxToRem({ px: 21 })};
    color: #565656;
  }

  .${baseClass} {
    &__error {
    }
    &__options {
      &__buttons {
        align-items: center;
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;

        button:not(:last-child) {
          margin-right: 1rem;
        }
      }
    }
    &__no-posts {
      margin-top: 2rem;
    }
    &__posts {
      margin-top: 2rem;
    }
  }
`
