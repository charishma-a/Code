import { FieldError } from '@/generated/graphql'

export const setStateError = ({
  errors,
  setErrorMessage,
  setFieldError,
}: {
  errors: FieldError[]
  setErrorMessage: (value: React.SetStateAction<string>) => void
  setFieldError: (field: string, message: string) => void
}): void => {
  if (errors && errors.length > 0) {
    let generalErrorMessage = ''
    errors.forEach((error) => {
      if (!error.field && !generalErrorMessage) {
        generalErrorMessage = error.message
      } else if (error.field) {
        setFieldError(error.field, error.message)
      }
    })
    if (generalErrorMessage) {
      setErrorMessage(generalErrorMessage)
    }
  }
}
