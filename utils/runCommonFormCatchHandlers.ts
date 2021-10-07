import { toast } from 'react-toastify'

export const runCommonFormCatchHandlers = ({
  err,
  getArrayFieldNamePrefix,
  setErrorMessage,
  setFieldError,
  setSubmitting,
  useToast,
}: {
  err: any
  getArrayFieldNamePrefix?: (field: string) => string
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>
  setFieldError?: (field: string, message: string) => void
  setSubmitting?: (v: boolean) => void
  useToast?: boolean
}): void => {
  let toastMessage = err.message || ''
  if (err.graphQLErrors && err.graphQLErrors.length > 0) {
    const graphQLError = err.graphQLErrors[0]
    if (
      typeof setFieldError === 'function' &&
      graphQLError &&
      graphQLError.extensions &&
      graphQLError.extensions.fieldErrors &&
      graphQLError.extensions.fieldErrors.length > 0
    ) {
      graphQLError.extensions.fieldErrors.forEach(
        ({ field, message, value }) => {
          let targetField = field
          if (typeof getArrayFieldNamePrefix !== 'undefined' && value) {
            targetField = `${getArrayFieldNamePrefix(value)}.${field}`
          }
          setFieldError(targetField, message)
          toastMessage = `${field}: ${message}`
        }
      )
    }
  }
  if (useToast && toastMessage) {
    toast.error(toastMessage)
  }
  setErrorMessage(err.message)
  if (typeof setSubmitting === 'function') {
    setSubmitting(false)
  }
}
