import React, { useCallback, useState } from 'react'
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone'
import { FunctionComponent } from 'react'

import * as sc from './FileUpload.styled'
import { BaseComponentProps } from '@/common/types'
import {
  CsvFrom,
  File,
  useDeleteMyFileMutation,
  useUploadMyFileMutation,
} from '@/generated/graphql'
import { Image } from '@/components/Image'
import { ButtonLink } from '@/common/styled'
import { FieldError } from '../Form/FieldError'

export type IFileUploadOnDropProp = <T extends File>(props: {
  file?: Omit<File, 'profile'>
  acceptedFiles: T[]
  fileRejections: FileRejection[]
  event: DropEvent
}) => void

export interface FileUploadProps extends BaseComponentProps {
  childrenIsDragActive?: React.ReactNode
  fieldName?: string
  file: File
  fileName?: string
  isAvatar?: boolean
  name: string
  onDelete?: () => void
  onDrop?: IFileUploadOnDropProp
  resourceType: 'image' | 'csv' | 'raw' | 'video'
  csvFrom?: CsvFrom
}

// pass in the UploadMutation mutation we created earlier.
export const FileUpload: FunctionComponent<FileUploadProps> = ({
  children,
  childrenIsDragActive,
  classNames,
  csvFrom,
  fieldName,
  file,
  fileName,
  isAvatar,
  name,
  onDelete: onDeleteProps,
  onDrop: onDropProps,
  resourceType,
}) => {
  const [uploadMyFile, { error: errorUpload }] = useUploadMyFileMutation()
  const [deleteMyFile, { error: errorDelete }] = useDeleteMyFileMutation()
  const [errorMessage, setErrorMessage] = useState('')

  const onDelete = useCallback(async () => {
    try {
      await deleteMyFile({
        variables: {
          input: {
            id: file.id,
          },
        },
      })

      if (typeof onDeleteProps === 'function') {
        onDeleteProps()
      }
    } catch (err) {
      setErrorMessage(err.mesasage)
    }
  }, [deleteMyFile, file])

  const onDrop = useCallback(
    async (acceptedFiles, fileRejections, event) => {
      try {
        setErrorMessage('')

        //2 props
        const fileRejected = fileRejections[0]

        // select the first file from the Array of files
        const file = acceptedFiles[0]
        let resourceTypeForUpload = resourceType
        if (resourceType === 'csv') {
          resourceTypeForUpload = 'raw'
        }
        // use the uploadFile variable created earlier
        const res = await uploadMyFile({
          // use the variables option so that you can pass in the file we got above
          variables: {
            file,
            input: {
              csvFrom,
              fieldName,
              resourceType: resourceTypeForUpload,
              name: fileName || file.name,
              isAvatar,
            },
          },
        })

        const fileDb = res.data.uploadMyFile

        if (typeof onDropProps === 'function') {
          onDropProps({
            file: fileDb,
            acceptedFiles,
            fileRejections,
            event,
          })
        }
      } catch (err) {
        setErrorMessage(err.mesasage)
      }
    },
    [uploadMyFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  })

  const className = [
    'dropzone',
    sc.baseClass,
    isDragActive && 'isActive',
    classNames,
  ]
    .filter(Boolean)
    .join(' ')

  if (file) {
    if (resourceType === 'image') {
      return (
        <sc.ImageWrapper>
          <sc.ImageContainer isAvatar>
            <Image src={file.secureUrl} />
          </sc.ImageContainer>
          <sc.ImageActions>
            <ButtonLink onClick={onDelete} type="button">
              Delete
            </ButtonLink>
          </sc.ImageActions>
        </sc.ImageWrapper>
      )
    }
    if (['csv', 'raw'].includes(resourceType)) {
      return (
        <sc.FileDisplayWrapper>
          <sc.FileDisplayContainer>{file.name}</sc.FileDisplayContainer>
          <sc.ImageActions>
            <ButtonLink onClick={onDelete} type="button">
              Delete
            </ButtonLink>
          </sc.ImageActions>
        </sc.FileDisplayWrapper>
      )
    }
  }

  const acceptMap = {
    image: 'image/*',
    csv: '.csv',
  }
  const accept = acceptMap[resourceType] || ''

  const overallErrorMessage =
    errorUpload?.message || errorDelete?.message || errorMessage

  return (
    <sc.Wrapper {...getRootProps()} className={className}>
      <input
        className={`${sc.baseClass}__input`}
        {...getInputProps()}
        name={name}
        id={name}
        accept={accept}
      />
      <div className={`${sc.baseClass}__content`}>
        {isDragActive
          ? childrenIsDragActive || <p>Drop the files here...</p>
          : children || (
              <p>Drag and drop some files here, or click to select files</p>
            )}
      </div>
      {overallErrorMessage ? (
        <FieldError className={`error ${sc.baseClass}__error`}>
          {overallErrorMessage}
        </FieldError>
      ) : null}
    </sc.Wrapper>
  )
}
