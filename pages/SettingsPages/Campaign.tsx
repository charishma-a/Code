import React from 'react'
import { Formik, Form } from 'formik'
import { LayoutAuth } from '@/components/LayoutAuth'
import { FormikCheckbox } from 'components/Form/Formik/FormikCheckbox'
import * as sc from 'components/Settings/Settings.styled'
import styled from 'styled-components'
import { SubmitButton } from '@/components/Form/SubmitButton'
import { FormikSelect } from 'components/Form/Formik/FormikSelect'
import { FREQUENCY } from '@/data/Frequency'
import { LENGTH } from '@/data/length'
import Link from 'next/link'
import { trackCategory } from '@/utils/analytics'
const Container = styled.div`
  display: flex;
  flex-direction: column;
`
export interface SelectOption {
  label: string
  value: string
}
export interface CampaignInitialValues {
  notificationFrequency: SelectOption
  campaignLength: SelectOption
}

const frequencyOptions = FREQUENCY.map((province) => {
  return {
    label: province.name,
    value: province.code,
  }
})

const lengthOptions = LENGTH.map((province) => {
  return {
    label: province.name,
    value: province.code,
  }
})

export const Campaign = () => {
  return (
    <Formik
      initialValues={{ notificationFrequency: 'At the end of everyday' }}
      onSubmit={() => {
        undefined
      }}
    >
      {(formik) => {
        return (
          <LayoutAuth
            description=""
            image=""
            nonAuthHeaderRightCTA="signup"
            title="Champion Login | Kernls"
            twitterImage=""
            url="https://kernls.com/champion/login"
            showSidebar
          >
            <sc.Tabs>
              <nav>
                <sc.LinkData>
                  <Link href="">Campaign</Link>
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

              <sc.Text>Donation notifications</sc.Text>
              <FormikCheckbox
                name="receiveUpdatesFromFoundation"
                onChecked={() => {
                  trackCategory({
                    eventProps: {
                      eventAction: 'Settings Campaign Donation Notifications',
                      eventCategory: 'Settings Campaign Options',
                      clickID:
                        'settings-campaign-donation-notifications-checked',
                    },
                  })
                }}
              >
                <sc.Sub>
                  I&apos;d like to receive an email when a donation comes in{' '}
                </sc.Sub>
              </FormikCheckbox>

              <sc.Text>Campaign reports</sc.Text>
              <FormikCheckbox
                name="receiveUpdatesFromFoundation1"
                onChecked={() => {
                  trackCategory({
                    eventProps: {
                      eventAction: 'Settings Campaign Generate Reports',
                      eventCategory: 'Settings Campaign Options',
                      clickID: 'settings-campaign-generate-reports-checked',
                    },
                  })
                }}
              >
                <sc.Sub>I&apos;d like to receive campaign reports</sc.Sub>
              </FormikCheckbox>
              <sc.Text>Notification frequency</sc.Text>

              <FormikSelect
                name="notificationFrequency"
                options={frequencyOptions}
                onChange={(selectedOption) => {
                  formik.setFieldValue('notificationFrequency', selectedOption)
                  trackCategory({
                    eventProps: {
                      eventAction: 'Settings Campaign Notification Frequency',
                      eventCategory: 'Settings Campaign Options',
                      clickID:
                        'settings-campaign-notification-frequency-options-selected',
                    },
                  })
                }}
              />

              <br />
              <sc.Text>Campaign length</sc.Text>
              <sc.PurpleText1>
                Please note that once you change the default campaign length,
                you can&apos;t make additional changes. You can extend your
                campaign below.
              </sc.PurpleText1>
              <FormikSelect
                name="campaignLength"
                options={lengthOptions}
                onChange={(selectedOption) => {
                  formik.setFieldValue('campaignLength', selectedOption)
                  trackCategory({
                    eventProps: {
                      eventAction: 'Settings Campaign Length',
                      eventCategory: 'Settings Campaign Options',
                      clickID: 'settings-campaign-length-option-selected',
                    },
                  })
                }}
              />

              <br />
              <SubmitButton
                onClick={() => {
                  trackCategory({
                    eventProps: {
                      eventAction: 'Settings Campaign Save',
                      eventCategory: 'Settings Campaign Options',
                      clickID: 'settings-campaign-save-settings-button-click',
                    },
                  })
                }}
              >
                Save settings
              </SubmitButton>
              <sc.BoxLine />
              <sc.Text>Campaign extension request</sc.Text>

              <sc.Sub>
                Reach out if you want to extend your campaign or end it early.{' '}
              </sc.Sub>
              <sc.Request>Request to extend campaign</sc.Request>
            </sc.AuthPageCard>
          </LayoutAuth>
        )
      }}
    </Formik>
  )
}
export default Campaign
