import { Formik } from 'formik'
import React from 'react'
import { FormikInput } from 'components/Form/Formik/FormikInput'
import { Image } from '@/components/Image'
import * as sc from 'components/Settings/Settings.styled'
import { ButtonLink, FormGroup, FormRow } from '../../common/styled'
import styled from 'styled-components'
import { LayoutAuth } from '@/components/LayoutAuth'
import { FormikTextarea } from '@/components/Form/Formik/FormikTextarea'
import { SubmitButton } from '@/components/Form/SubmitButton'
import Link from 'next/link'
import { trackCategory } from '@/utils/analytics'
const Wrapper = styled.div``

const Page = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  color: #565656;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 100vh;
`

const Body = styled.div`
  position: relative;
  width: 100%;
`

export interface ProfileInitialValues {
  email: string
  firstName: string
  lastName: string
  avatar: string
  avatarFile: string
}
interface ProfileProps {
  email: string
  firstName: string
  lastName: string
  avatar: string
  avatarFile: string
}

export const Profile: React.FC<ProfileProps> = ({
  email = '',
  firstName = '',
  lastName = '',
}) => {
  //initial form values

  const initialValues: ProfileInitialValues = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    avatar: '',
    avatarFile: '',
  }

  return (
    <Wrapper>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          undefined
        }}
      >
        {(formik) => {
          const { isSubmitting, values } = formik
          return (
            <LayoutAuth
              description=""
              image=""
              showSidebar
              title="Champion Login | Kernls"
              twitterImage=""
              url="https://kernls.com/champion/login"
            >
              <sc.Tabs>
                <nav>
                  <sc.LinkData>
                    <Link href="/SettingsPages/Campaign">Campaign</Link>
                  </sc.LinkData>

                  <sc.LinkData>
                    <Link href="/SettingsPages/Profile">Profile</Link>
                  </sc.LinkData>
                </nav>
              </sc.Tabs>
              <sc.AuthPageCard>
                <style>
                  @import
                  url(&apos;https://fonts.googleapis.com/css2?family=Overpass&apos;);
                </style>
                <FormGroup
                  style={{
                    marginTop: '0rem',
                    width: '500px',
                    paddingTop: '0px',
                    color: 'black',
                    fontSize: '14px',
                  }}
                >
                  <FormRow>
                    <FormikInput
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      label="First Name"
                    />
                    <FormikInput
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      label="Last Name"
                    />
                  </FormRow>
                  <FormikInput
                    name="Dedicated to"
                    type="text"
                    placeholder=""
                    label="Dedicated to:"
                  />
                  <br />
                  <FormRow>
                    <FormikTextarea
                      label="Quote"
                      name="body"
                      placeholder="I'm supporting this project because..."
                    />
                  </FormRow>
                  <p>
                    You can add a short quote that explains why you’re
                    supporting a researcher, research institute or illness.
                  </p>
                </FormGroup>

                <FormGroup style={{ marginTop: '2rem' }}>
                  <sc.Profile>Profile picture</sc.Profile>
                  <FormRow>
                    <sc.AvatarImageWrapper>
                      <sc.AvatarImageContainer>
                        <Image src={values.avatar} />
                      </sc.AvatarImageContainer>
                      <sc.AvatarImageActions></sc.AvatarImageActions>
                    </sc.AvatarImageWrapper>
                    <sc.ButtonLink
                      onClick={() => {
                        trackCategory({
                          eventProps: {
                            eventAction: 'Settings Profile  Picture Change',
                            eventCategory: 'Settings Profile Options',
                            clickID:
                              'settings-profile-picture-change-button-click',
                          },
                        })
                      }}
                    >
                      Change
                    </sc.ButtonLink>
                  </FormRow>
                  <SubmitButton
                    onClick={() => {
                      trackCategory({
                        eventProps: {
                          eventAction: 'Settings Profile Save ',
                          eventCategory: 'Settings Profile Options',
                          clickID: 'settings-profile-save-button-click',
                        },
                      })
                    }}
                  >
                    Save settings
                  </SubmitButton>
                  <sc.PurpleText1>
                    Please note that once you change the default, you can’t make
                    changes once you go live.
                  </sc.PurpleText1>
                  <sc.BoxLine />
                  <sc.Text>Campaign profile status</sc.Text>
                  <sc.Sub>
                    Want to change your profile to inactive? Contact us
                  </sc.Sub>
                  <sc.Request
                    onClick={() => {
                      trackCategory({
                        eventProps: {
                          eventAction: 'Settings Profile Change Request',
                          eventCategory: 'Settings Profile Options',
                          clickID:
                            'settings-profile-change-request-button-click',
                        },
                      })
                    }}
                  >
                    Request to change profile status
                  </sc.Request>
                  <sc.Request>Request to change profile status</sc.Request>
                </FormGroup>
              </sc.AuthPageCard>
            </LayoutAuth>
          )
        }}
      </Formik>
    </Wrapper>
  )
}

export default Profile
