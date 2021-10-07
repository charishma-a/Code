import { NextPage } from 'next'
import styled from 'styled-components'

/* common */
import { ContentContainer } from '../common/styled'

/* constants */
import { METATAG_IMAGE, METATAG_TWITTER_IMAGE } from '../constants/config'

/* components */
import Layout from '../components/Layout/Layout'

/* utils */
import { device } from '../utils/device'

const baseClass = 'kernls-privacy-policy-page'

const Section = styled.section``

const Page = styled.div``

const Wrapper = styled.div`
  margin-top: 2rem;
`

const Container = styled.div`
  background: rgba(250, 250, 250, 0.78);
  color: #8d8d8d;
  padding: 2rem 0.5rem;
  @media ${device.tablet} {
    padding: 2rem 7rem;
  }

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 49px;
    text-align: center;
    color: #202020;
  }

  h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 29px;
    color: #000000;
  }

  strong,
  i {
    color: #000000;
  }

  ul {
    padding-left: 1rem;
    li:not(:last-child) {
    }
  }

  ${Section}:not(:last-child) {
    margin-bottom: 1.25rem;
  }
`

export const ProjectPrivacyPolicyPage: NextPage = (): JSX.Element => {
  const className = ['page', baseClass].join(' ')

  return (
    <Page className={className}>
      <Layout
        description=""
        image={METATAG_IMAGE}
        title="Privacy Policy | Kernls"
        twitterImage={METATAG_TWITTER_IMAGE}
        url="https://kernls.com/privacy-policy"
      >
        <Wrapper>
          <ContentContainer>
            <Container>
              <Section>
                <h1>Privacy Policy</h1>
                <p>
                  Kernls understands your concerns about privacy and your
                  interest in knowing how your information is used and shared,
                  and so we have created this Privacy Policy (the “Privacy
                  Policy”) to provide you with more information on these topics.
                  This Privacy Policy describes the practices and policies for
                  the Kernls’ platform located at www.kernls.com (the
                  “Platform”). This Platform is owned and operated by Kernls,
                  Inc. (hereinafter referred to as “Kernls” or “we” or “us”).
                  Please note that this Privacy Policy applies only to Kernls’
                  online information-gathering and sharing practices occurring
                  on the Platform, and does not apply to any of our practices
                  conducted offline. By visiting this Platform, you are
                  accepting the practices and policies described in this Privacy
                  Policy, and you are further indicating that you agree to be
                  bound by the terms of this Privacy Policy. If you do not agree
                  to the terms of this Privacy Policy, please do not visit or
                  use any of the links on this Platform. We may update this
                  Privacy Policy from time to time, so please check this Privacy
                  Policy periodically for changes. The date this Privacy Policy
                  was last updated is stated at the end of this document.
                </p>
              </Section>
              <Section>
                <h2>SUMMARY</h2>
                <p>
                  The notifications provided by this Privacy Policy include:
                </p>
                <ul>
                  <li>
                    What personally identifiable information we collect from you
                    through the Platform.
                  </li>
                  <li>How we use the information we collect.</li>
                  <li> With whom the information may be shared.</li>
                  <li>
                    The kind of procedures we employ in an effort to hinder the
                    unauthorized access, use or disclosure of information you
                    provide to us.
                  </li>
                  <li>Information related to third-party Platform.</li>
                  <li>
                    The laws that apply to those accessing our Platform from
                    outside of the United States.
                  </li>
                  <li>
                    How you can learn about changes to our privacy policies,
                    practices and procedures.
                  </li>
                </ul>
              </Section>
              <Section>
                <h2>THE INFORMATION WE COLLECT</h2>

                <p>
                  <strong>
                    Personal Information You Provide And How It Is Used:
                  </strong>{' '}
                  You may freely visit our Platform anonymously and without
                  being required to provide us with any personal information.
                  However, certain requests and features do require that you
                  provide us with some personally identifying information as
                  more particularly described below. Personal information is
                  data that can be used to identify or contact you. Please do
                  not send confidential information to us directly through this
                  Platform, or by email to any of the contact email addresses
                  listed on this Platform.
                </p>

                <p>
                  <i>Funding of a Project:</i> If you opt to donate to a project
                  through the Platform, you will be asked to provide certain
                  personally identifying information, such as name, home address
                  and email address, as well as your credit card billing
                  information, in order to process the donation. Unless you opt
                  to donate to us on a monthly basis, the credit card
                  information that you provide at the time of donation is used
                  only to process your donation and will not be stored or used
                  for any other purpose. Please note that we work with third
                  parties to process your donations, and any information you
                  share may also be shared with such third parties.
                </p>

                <p>
                  <i>Kernls Registration:</i> You can opt to become a
                  “registered” user of the Kernls’ Platform, and to create an
                  online account. In each instance, you will be asked to provide
                  us with a variety of personal information, including your
                  name, email address, and home address.
                </p>

                <p>
                  <i>Kernls Updates:</i> You will have the option to opt-in to
                  receive updates about Kernls and the work we do. In each case,
                  we will ask you to provide certain personally identifying
                  information, including your email address, and first and last
                  name. You may unsubscribe from these emails at any time by
                  using the link provided in the footer of all such emails.{' '}
                </p>
                <p>
                  <i>Project Updates:</i> You will have the option to opt-in to
                  receive updates about the projects and nonprofits you support.
                  If you make that request, we will ask that you provide us with
                  your email address, first and last name, and home address.
                  Please note that any information we share with a nonprofit
                  will be subject to that nonprofit’s privacy policy.{' '}
                </p>

                <p>
                  <i>Contact Us:</i> The Platform provides “contact us” link for
                  questions visitors may have about the Platform. If you contact
                  us through any of these contact forms, we will collect your
                  email address, and any other personal information that you
                  provide to us. We will use the information you provide to
                  contact you and to respond to any requests and/or questions.
                </p>

                <p>
                  <strong>
                    Non-Personal Information We Collect by Automated Means And
                    How We Use It:
                  </strong>{' '}
                  We also collect certain non-personal information (data in a
                  form that does not support direct association with any
                  specific person or individual) by automated means when you
                  visit the Platform. Much of this information is collected
                  through the use of third-party tracking services, which
                  includes Google Analytics and Hotjar. The information
                  collected may include usage information, such as the numbers
                  and frequency of users to the Platform, pages visited, web
                  browsing histories, online purchases and searches, social
                  networking activities and similar data. When gathered, this
                  data, if used, is used in the aggregate, and not in a manner
                  that is intended to identify you personally. This type of
                  aggregate information may be shared with third parties at any
                  time. In addition to the third-party tracking services
                  mentioned above, we may also collect this information through
                  various other means, including &ldquo;cookies&rdquo; and IP
                  addresses.{' '}
                </p>

                <p>
                  <strong>Do Not Track</strong> - Every time your computer sends
                  or receives information over the Web, the request begins with
                  some short pieces of information called “headers.” These
                  headers include information like what browser you are using,
                  what language your computer is set to, and other details. The
                  Do Not Track technology provides individual users with the
                  ability to include a simple, machine-readable header
                  indicating that they don&apos;t want to be tracked, and sends
                  a signal to Web sites&apos; visited requesting that the
                  website disable either its tracking or cross-site user
                  tracking of an individual user. Currently, various browsers –
                  including Internet Explorer, Google Chrome, Firefox, Opera and
                  Safari – offer a “do not track” option. Presently, there is no
                  consensus on how Do Not Track should be interpreted, and no
                  common or accepted industry standard for implementing.
                  Consequently, please note that Kernls’ Platform does not
                  currently respond to browsers&apos; Do Not Track signals, and
                  as such your activities will be tracked, regardless of whether
                  you have opted to enable the Do Not Track option offered by
                  your browser.
                </p>
              </Section>
              <Section>
                <h2>HOW WE MAY SHARE YOUR INFORMATION</h2>
                <p>
                  We may disclose all of the information (described herein) that
                  we collect, as stated in this Privacy Policy including in
                  accordance with the terms set forth in this section. Kernls
                  works with a variety of third-party partners in order to allow
                  us to make the Platform available to you, to host and store
                  the information we collect from you, to collect and process
                  donations, and to provide certain functionality and features.
                  Additionally, if you request a 501(c)(3) donation tax receipt
                  - or if your donation exceeds $250 - we will share the
                  relevant information related to your donation(s) with the
                  nonprofit(s) you supported. Except as stated in this Privacy
                  Policy, we do not reveal personally identifiable information
                  about you to third parties for their independent use unless:
                  (1) you expressly authorize Kernls to do so, (2) it is
                  necessary to allow Kernls and its service providers or agents
                  to provide services on Kernls’ behalf, (3) it is to provide
                  products or services to you, (4) it is disclosed to entities
                  that perform marketing or data aggregation services for
                  Kernls, (5) it is necessary in connection with a sale of all
                  or substantially all of the assets of Kernls or the merger of
                  Kernls into another entity or any consolidation, share
                  exchange, combination, reorganization, or like transaction in
                  which Kernls is not the survivor, (6) Kernls is required or
                  permitted to do so for any or all of the following reasons:
                  (i) to comply with a subpoena, legal process, government
                  request or any other legal obligation, (ii) to prevent,
                  investigate, detect, or prosecute criminal offenses or attacks
                  on the technical integrity of the Platform or our network,
                  and/or (iii) to protect the rights, privacy, property,
                  business, or safety of Kernls, its partners and employees or
                  the visitors to the Platform.
                </p>
              </Section>

              <Section>
                <h2>CHILDREN’S PRIVACY/NOTE TO PARENTS</h2>
                <p>
                  The Platform does not intentionally or knowingly collect, use,
                  or disclose personally identifiable information about visitors
                  to our Platform that are less than 13 years of age. If a child
                  under the age of 13 submits information to us through any part
                  of the Platform and Kernls becomes aware that the user
                  submitting the information is under the age of 13, the
                  information provided will be deleted as soon as it is
                  discovered and not used for any purpose. If you are the parent
                  or guardian of a child under 13 years of age and believe that
                  they have disclosed personally identifiable information to us,
                  please contact us at the address below and be sure to include
                  in your message the same user name and password and/or email
                  address that you believe your child submitted, if applicable:
                </p>
              </Section>
              <Section>
                <h2>THIRD PARTY WEBSITE/LINKS</h2>
                <p>
                  We may also provide links to a variety of third-party social
                  media sites and/or Platform as a service to you, and in order
                  to provide you i) additional information and/or content
                  related Kernls, or ii) additional venues in which you can
                  learn about and discuss the activities of Kernls. Please note
                  that we have no affiliation with any of these other parties
                  and/or Platform, and cannot control and are not responsible
                  for the information collection, use, and disclosure practices
                  of such third parties; we encourage you to review and
                  understand their privacy practices and policies, if any,
                  before using providing any personally identifying information
                  to them. We are not responsible for the content or information
                  of these Platform, or any other use of the linked website.
                </p>
              </Section>
              <Section>
                <h2>HOW WE ATTEMPT TO SAFEGUARD YOUR INFORMATION</h2>
                <p>
                  We maintain – and request that any third-party partners who
                  may store information on our behalf to maintain –
                  administrative, technical and physical safeguards for the
                  Platform designed to protect your personal information against
                  theft, loss, misuse or unauthorized access, disclosure,
                  alteration or destruction of the personal information that we
                  collect from you. However, no website, application or
                  transmission can guarantee security. Thus, while we have
                  established and maintain what we believe to be reasonable
                  procedures to protect the confidentiality, security, and
                  integrity of personally identifying information obtained
                  through the Platform and we strive to protect your personal
                  information, we cannot ensure or warrant the security of any
                  information you transmit to us. When you link to one of the
                  social media venues provided on the Platform, the personal
                  information you share is visible to other users and can be
                  read, collected, or used by them. You are responsible for the
                  personal information you choose to submit in these instances,
                  and understand, acknowledge, and agree that you transmit
                  certain personal information over this Platform at your own
                  risk.
                </p>
              </Section>
              <Section>
                <h2>USE OF THE WEBSITE FROM OUTSIDE THE UNITED STATES</h2>
                <p>
                  We do not represent or warrant that the Platform, or any part
                  thereof, is appropriate or available for use in any particular
                  geographic location. If you choose to access our Platform, you
                  do so on your own initiative and at your own risk, and are
                  responsible for complying with all local laws, rules, and
                  regulations applicable in your jurisdiction. Please note that
                  the Platform is hosted in the United States and is governed by
                  United States law. If you are visiting the Platform from
                  outside the United States, please be aware that your
                  information will be transferred to, stored and processed in
                  the United States where our servers are located and our
                  central database is operated. The data protection and other
                  laws of the United States and other countries might not be as
                  comprehensive as those in your country. By using the Platform,
                  you consent to your information being transferred to our
                  facilities and to the facilities of those third parties with
                  whom we share it as described in this Privacy Policy.
                </p>
              </Section>
              <Section>
                <h2>CHANGES TO OUR PRIVACY POLICY</h2>
                <p>
                  We reserve the right to revise this Privacy Policy at any
                  time. Please check back regularly to see if there have been
                  any changes to this policy, which you can determine by
                  reviewing the Effective Date listed below. By continuing to
                  use the Platform after those changes become effective, you
                  consent and agree to be bound by the revised Privacy Policy.{' '}
                </p>
              </Section>
              <Section>
                <h2>CONTACTING US</h2>
                <p>
                  If there are any questions regarding this Privacy Policy you
                  may contact us at: <strong>info@kernls.com</strong>
                </p>
              </Section>
              <Section>
                <h2>PRIVACY POLICY EFFECTIVE DATE</h2>

                <p>This Privacy Policy is effective as of October 19, 2020.</p>
              </Section>
            </Container>
          </ContentContainer>
        </Wrapper>
      </Layout>
    </Page>
  )
}

export default ProjectPrivacyPolicyPage
