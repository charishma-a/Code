import { Form, Formik } from 'formik'
import React from 'react'
import { useRouter } from 'next/router'
import * as yup from 'yup'

import * as sc from './CreateContactsByFileForm.styled'

import { BaseComponentProps } from '@/common/types'
import { CsvFrom, File } from '@/generated/graphql'
import {
  ERROR_MESSAGE_FIELD_REQUIRED,
  ROUTE_SECURE_CHAMPION_CONTACTS,
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE_REVIEW,
  URL_LEARN_FORMAT_CSV,
} from '@/constants/config'
import {
  Fieldset,
  FormGroup,
  FormRow,
  PageBreadcrumbs,
  PageBreadcumbsActionItems,
} from '@/common/styled'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  contactsBreadcrumb,
  contactsBreadcrumbFile,
} from '@/constants/breadcrumbs/contactsBreadcrumbs'
import { CancelButton, SubmitButton } from '../SubmitButton'
import { IFileUploadOnDropProp, FileUpload } from '@/components/FileUpload'
import { Paragraph } from '@/components/Paragraph'
import { FormikSelect, SelectOption } from '../Formik/FormikSelect'
import { trackCategory } from '@/utils/analytics'
const validationSchema = yup.object().shape({
  csvFromOption: yup
    .object()
    .shape({ label: yup.string().required(), value: yup.string().required() })
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
  contactsFile: yup
    .object()
    .shape({
      secureUrl: yup.string().required(ERROR_MESSAGE_FIELD_REQUIRED),
    })
    .required(ERROR_MESSAGE_FIELD_REQUIRED),
})

export const CreateContactsByFileForm: React.FC<BaseComponentProps> = ({
  classNames,
  ...restProps
}) => {
  const className = [sc.baseClass, classNames].join(' ')

  const router = useRouter()

  // inital form values
  const initialValues: { contactsFile: File; csvFromOption: SelectOption } = {
    contactsFile: null,
    csvFromOption: null,
  }
  return (
    <sc.Wrapper className={className} {...restProps}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values) => {
          trackCategory({
            eventProps: {
              eventAction: 'Review Contacts Save',
              eventCategory: 'Review Contacts Actions',
              clickID: 'contacts-review-save-button-click',
            },
          })
          router.push(
            ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE_REVIEW.replace(
              '[id]',
              values.contactsFile.id
            )
          )
        }}
        validationSchema={validationSchema}
      >
        {(formik) => {
          const { errors, values } = formik

          const submitDisabled = Object.keys(errors).length > 0

          const onDrop: IFileUploadOnDropProp = ({ file }) => {
            formik.setFieldValue('contactsFile', file)
            // Success
            trackCategory({
              eventProps: {
                eventAction: 'Add Contacts',
                eventCategory: 'File Upload Contacts Success',
                clickID: 'contacts-add-file-upload-success',
              },
            })
          }

          const onDeleteFile = async () => {
            formik.setFieldValue('contactsFile', null)
            trackCategory({
              eventProps: {
                eventAction: 'Add Contacts',
                eventCategory: 'File Upload Contacts Delete',
                clickID: 'contacts-add-file-upload-delete-button-click',
              },
            })
          }

          const onClickCancel = () => {
            trackCategory({
              eventProps: {
                eventAction: 'Add Contacts',
                eventCategory: 'File Upload Contacts Cancel',
                clickID: 'contacts-add-file-upload-cancel',
              },
            })
            router.push(ROUTE_SECURE_CHAMPION_CONTACTS)
          }

          const csvFromOptions = Object.keys(CsvFrom).map((key) => {
            const value = CsvFrom[key] as CsvFrom
            return {
              id: key,
              label: `${value.charAt(0).toUpperCase()}${value.slice(1)}`
                .replace(/([A-Z])/g, ' $1')
                .trim(),
              value,
            }
          })

          return (
            <>
              <Form>
                <PageBreadcrumbs>
                  <Breadcrumb
                    items={[contactsBreadcrumb, contactsBreadcrumbFile]}
                    currentItemName={contactsBreadcrumbFile.name}
                    style={{ justifyContent: 'flex-start' }}
                  />
                  <PageBreadcumbsActionItems>
                    <CancelButton onClick={onClickCancel} type="button">
                      Cancel
                    </CancelButton>
                    <SubmitButton
                      disabled={submitDisabled}
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction:
                              'File Upload Contacts Review and Organize',
                            eventCategory: 'Add Contacts',
                            clickID:
                              'contacts-add-file-upload-review-and-organize',
                          },
                        })
                      }}
                      type="submit"
                    >
                      Review and organize
                    </SubmitButton>
                  </PageBreadcumbsActionItems>
                </PageBreadcrumbs>
                <sc.Container>
                  <Fieldset>
                    <>
                      <div>
                        <h3>Upload multiple contacts by file import</h3>
                      </div>
                      <FormGroup style={{ marginTop: '2rem' }}>
                        <label htmlFor="csvFromOption">
                          Choose csv which format option you are importing
                        </label>
                        <FormRow>
                          <FormikSelect
                            name="csvFromOption"
                            options={csvFromOptions}
                            onChange={(selectedOption) => {
                              formik.setFieldValue(
                                'csvFromOption',
                                selectedOption
                              )
                            }}
                          />
                        </FormRow>
                      </FormGroup>
                      {values.csvFromOption ? (
                        <FormGroup style={{ marginTop: '2rem' }}>
                          <sc.UploadLabelWrapper>
                            <label htmlFor="contactsFile">Upload</label>
                            <Paragraph>
                              Not sure how to format your file?{' '}
                              <a
                                href={URL_LEARN_FORMAT_CSV}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => {
                                  trackCategory({
                                    eventProps: {
                                      eventAction:
                                        'File Upload Contacts Learn How',
                                      eventCategory: 'Add Contacts',
                                      clickID:
                                        'contacts-add-file-upload-link-click-learn-how',
                                    },
                                  })
                                }}
                              >
                                Learn how
                              </a>
                            </Paragraph>
                          </sc.UploadLabelWrapper>
                          <FormRow>
                            <FileUpload
                              name="contactsFile"
                              file={values.contactsFile}
                              resourceType="csv"
                              onDelete={onDeleteFile}
                              onDrop={onDrop}
                              csvFrom={
                                csvFromOptions.find(
                                  ({ value }) =>
                                    value === values.csvFromOption.value
                                )?.value
                              }
                            >
                              <p>
                                + Add contacts from an exported{' '}
                                {values.csvFromOption.label} .csv file
                              </p>
                            </FileUpload>
                          </FormRow>
                        </FormGroup>
                      ) : null}
                    </>
                  </Fieldset>
                </sc.Container>
              </Form>
            </>
          )
        }}
      </Formik>
    </sc.Wrapper>
  )
}
