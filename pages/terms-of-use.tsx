import { NextPage } from 'next'
import Link from 'next/link'
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

const SubSection = styled.div``
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
    font-weight: 600;
    font-size: 32px;
    line-height: 49px;
    text-align: center;
    color: #202020;
  }

  h3 {
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 29px;
    color: #000000;
  }

  h4 {
    color: #000000;
    font-size: 1rem;
    margin-bottom: 0;
  }

  strong,
  i {
    color: #000000;
  }

  ul {
    padding-left: 1rem;

    &.no-item-indicator {
      list-style: none;
      padding-left: 0;
    }
    &.list-item-flex {
      li {
        display: flex;
        > *:first-child {
          margin-right: 1rem;
        }
      }
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
        title="Terms of Use | Kernls"
        twitterImage={METATAG_TWITTER_IMAGE}
        url="https://kernls.com/terms-of-use"
      >
        <Wrapper>
          <ContentContainer>
            <Container>
              <Section>
                <h1>Terms of Service</h1>
                <p>
                  IMPORTANT – THIS IS A LEGAL AGREEMENT BETWEEN YOU AND KERNLS,
                  INC., (HEREINAFTER, “KERNLS” OR “WE” OR “OUR” OR “US”), THE
                  OWNER OF THE HOSTED PLATFORM LOCATED AT WWW.KERNLS.COM.
                  (HEREINAFTER, THE “PLATFORM”). BEFORE ACCESSING OR USING ANY
                  PART OF THE PLATFORM, YOU SHOULD READ CAREFULLY THE FOLLOWING
                  TERMS AND CONDITIONS CONTAINED IN THIS TERMS OF SERVICE
                  AGREEMENT (THE “TERMS OF SERVICE”), BECAUSE YOUR ACCESS TO AND
                  USE OF THE PLATFORM ARE SUBJECT TO THESE TERMS OF SERVICE, AS
                  WELL AS TO ALL APPLICABLE LAWS AND REGULATIONS. KERNLS IS
                  WILLING TO LICENSE AND ALLOW YOUR USE OF THE PLATFORM ONLY ON
                  THE CONDITION THAT YOU ACCEPT AND AGREE TO ALL OF THE TERMS
                  AND CONDITIONS CONTAINED IN THESE TERMS OF SERVICE. IF YOU DO
                  NOT AGREE WITH THESE TERMS OF SERVICE, YOU ARE NOT GRANTED
                  PERMISSION TO ACCESS OR OTHERWISE USE THE PLATFORM. THESE
                  TERMS OF SERVICE MAY BE CHANGED OR UPDATED BY KERNLS FROM TIME
                  TO TIME WITHOUT ADVANCE NOTICE BY POSTING HERE AND YOU WILL BE
                  BOUND BY ANY SUCH CHANGED OR UPDATED TERMS OF SERVICE IF YOU
                  CONTINUE TO USE THE PLATFORM AFTER SUCH CHANGES ARE POSTED.
                  THE DATE THESE TERMS OF SERVICE WERE LAST UPDATED IS STATED AT
                  THE END OF THIS DOCUMENT. YOU ARE ENCOURAGED TO REVIEW THESE
                  TERMS OF SERVICE PERIODICALLY FOR UPDATES AND CHANGES.
                </p>
              </Section>
              <Section>
                <h2>Terms and Conditions</h2>
                <SubSection>
                  <h3>Description of the Service</h3>
                  <p>
                    Kernls has created a technology platform that allows
                    nonprofit organizations - and their programs, projects and
                    initiatives (the “Project(s))” - to connect with individuals
                    who want to support such Projects. The Platform provides all
                    of the tools and technology necessary for charitable
                    organizations to present their Projects, and for users of
                    the Platform to make donations.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Registration & Restrictions; Eligibility</h3>
                  <p>
                    You can visit the Platform and access some of the features
                    and functionality without having to register. However,
                    registration is required if you want to access some
                    additional functionality and features. If you choose to
                    register and create an account, you will be asked to provide
                    some personally identifiable information, including your
                    name and email address. You will also be asked to create a
                    username and password. The username and password that you
                    provide are your credentials (&ldquo;Credentials&rdquo;),
                    and you will use these Credentials in order for the Platform
                    to authenticate you as a registered user of Kernls. You may
                    not have more than one active set of Credentials.
                    Additionally, you are prohibited from selling, sharing or
                    otherwise transferring your Credentials to another party.
                    You also agree to provide true, accurate, current and
                    complete information about yourself as prompted during the
                    registration process. If you provide any information that is
                    untrue, inaccurate, not current or incomplete (or becomes
                    untrue, inaccurate, not current or incomplete), or Kernls
                    has reasonable grounds to suspect that such information is
                    untrue, inaccurate, not current or incomplete, we reserve
                    the right to suspend or terminate your account and refuse
                    any and all current or future use of the Platform (or any
                    portion thereof). If you use the Platform, you are
                    responsible for maintaining the confidentiality of your
                    Credentials. You agree to accept responsibility for all
                    activities that occur under your account. You agree to
                    notify us immediately - by emailing us at infro@kernls.com -
                    of any unauthorized use of your account or any other breach
                    of security. Kernls reserves the right to block, suspend or
                    revoke your username and account at any time, in our sole
                    discretion.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Age Requirements</h3>
                  <p>
                    The Kernls Platform is intended solely for users who are 18
                    years of age or older, and any registration by, use of or
                    access to the Platform by anyone under 18 is unauthorized.
                    Additionally, you have to be 18 years of age or older to bid
                    on an Item.{' '}
                  </p>
                  <p>
                    If you are 13 or older but under the age of 18, you can only
                    access this Platform and make a donation with your parent or
                    guardians permission and active supervision. If you are a
                    parent or guardian of a child between the ages of 13 and 18,
                    before giving your permission for them to access this
                    Platform you should review these Terms of Service, and by
                    allowing your child to access this Platform you hereby agree
                    that both you and your child shall be bound by them.{' '}
                  </p>
                  <p>
                    Finally, if you reside in a jurisdiction that would restrict
                    the use of our Platform - or any of the functionalities or
                    features offered via the Platform - because of age, or
                    restricts the ability to enter into contracts such as this
                    one due to age, you must abide by such age limits and you
                    must not use the Platform if you are not permitted to do so
                    by such local jurisdiction and by these Terms of Service.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Donation Transactions; Rules for Donations; Fees</h3>
                  <p>
                    Kernls engaged the services of Stripe, Inc. to process all
                    donations, including managing the routing of applicable
                    customer information through the credit card networks. We
                    are not affiliated with Stripe, and we are not responsible
                    in any way for the actions or performance (or lack thereof)
                    of any of these providers. Accordingly, Kernls expressly
                    disclaims responsibility and liability for all services
                    provided by Stripe, including those related to
                    donation/payment transactions, and you hereby agree that
                    Kernls shall not be responsible for any loss or damage of
                    any sort incurred as a result of such services. Please also
                    note that Stipe will have access to the information you
                    provide to them when making a payment transaction, and the
                    use of such information will be governed by the privacy
                    practices and policies of such providers. You hereby
                    acknowledge and agree that, for all donations, (1) you will
                    not use an invalid or unauthorized credit or debit card or
                    other payment method; (2) all donations are final and
                    non-refundable. If you have any questions regarding any
                    payment transaction, please contact us at info@kernls.com.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Donation Transactions; Rules for Donations; Fees</h3>
                  <p>
                    Please note that there are fees associated with your
                    donation. As our fee structure is still in consideration,
                    you may be presented with one of the following fee options
                    on any given Project:
                  </p>
                  <ul className="no-item-indicator">
                    <li>
                      a. Stripe’s payment processing fee (roughly 2.5%) + Kernls
                      Fee (5%), totaling 7.5%, or
                    </li>
                    <li>
                      b. Stripe processing fee (roughly 2.5%) + the option of
                      adding a non-tax deductible tip for Kernls (amount
                      determined by donor)
                    </li>
                  </ul>
                  <p>
                    Please note that in regard to disbursing donations pledged
                    and processed via our Platform, Stripe will disburse your
                    donation approximately 1-3 business days following Stripe’s
                    processing of donations/payment transactions, and so long as
                    the designated Project you are supporting continues to
                    qualify as an eligible recipient of donations. Stripe will
                    send to your Project(s) an amount equal to the total
                    donation(s) received for the designated Project(s) less the
                    Kernls Fee and third-party payment processing fees
                    delineated above. The charge to your credit/debit card
                    statement will show the vendor descriptor as Kernls, and
                    your donation receipt will show that your donation was made
                    to the applicable foundation.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Privacy Policy</h3>
                  <p>
                    Please note that we also have a Privacy Policy – which can
                    be found{' '}
                    <Link href="/privacy-policy">
                      <a>HERE</a>
                    </Link>{' '}
                    - that applies to your use of our Platform, and how we may
                    use your personally identifying information. You should
                    review the Privacy Policy in order to understand how we use
                    information we collect from you when you visit or use our
                    Platform. As noted in that Privacy Policy, if you request a
                    501(c)(3) donation tax receipt - or if your donation exceeds
                    $250 - we will share the relevant information related to
                    your donation(s) with the nonprofit(s) you supported; they
                    may also receive your personal information as required for
                    compliance and transactional purposes. In addition to the
                    terms of these Terms of Service, you agree to be bound by
                    the terms of the Privacy Policy.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Intellectual Property Rights</h3>
                  <h4>Trademarks and Service Marks</h4>
                  <p>
                    Certain trademarks are the service marks and trademarks of
                    Kernls or one of its affiliates/partners, including the
                    nonprofits utilizing our Platform. All page headers, custom
                    graphics, and button icons are service marks, trademarks,
                    logos, and/or trade dress of Kernls or one of its
                    affiliates/partners. All other trademarks, service marks,
                    trade dress, product names, company names or logos, whether
                    registered or not, on the Platform are the property of their
                    respective owners. In addition to complying with all
                    applicable laws, you agree that you will not use any such
                    trademarks, service marks, trade dress, or other logos from
                    this Platform without the prior written authorization of
                    Kernls or their respective owners.
                  </p>

                  <h4>Copyright</h4>
                  <p>
                    Except as otherwise expressly stated, all content appearing
                    on this Platform is the copyrighted work of either Kernls or
                    its third party content suppliers or authorized users, and
                    is protected by U.S. and international copyright laws. The
                    compilation (meaning the collection, arrangement and
                    assembly) of all content is also the exclusive property of
                    Kernls, and is protected by U.S., and international
                    copyright laws. Except as otherwise expressly stated herein
                    or as expressly permitted, you may not alter, modify, copy,
                    distribute (for compensation or otherwise), transmit,
                    display, perform, reproduce, reuse, post, publish, license,
                    frame, download, store for subsequent use, create derivative
                    works from, transfer, or sell any information or content
                    obtained from this Platform, in whole or in part, including
                    any text, images, audio, and video in any manner, without
                    the prior written authorization of Kernls, or any applicable
                    third-party suppliers or authorized users. The use of
                    content, including images, by you, or anyone else authorized
                    by you, is prohibited unless specifically permitted by
                    Kernls. Any unauthorized use of text or images may violate
                    copyright laws, trademark laws, the laws of privacy and
                    publicity, and applicable regulations and statutes. Kernls
                    does not warrant nor represent that your use of any content
                    or materials displayed on the Platform will not infringe
                    rights of third parties.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Kernls License Grant</h3>
                  <p>
                    The Kernls Platform is provided by Kernls, and these Terms
                    of Service provides to you a personal, revocable, limited,
                    non-exclusive, royalty-free, non-transferable license to
                    access the Platform solely for your own personal use. Your
                    use the Platform and any services, materials or information
                    made available through the Platform is conditioned on your
                    continued compliance with the terms and conditions of these
                    Terms of Service. Accordingly, you expressly acknowledge and
                    agree that Kernls transfers no ownership or intellectual
                    property interest or title in and to the Kernls Platform.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>
                    No Solicitation or Endorsement; No Guarantee as to Use of
                    Donations
                  </h3>
                  <p>
                    The Platform provides you with the ability to support
                    various nonprofit Projects. Be advised that the provision of
                    our technology Platform to allow nonprofit organizations to
                    connect with you and other end users who want to support
                    their Projects does not constitute a solicitation of
                    donations by Kernls; Kernls does not engage in any
                    solicitation activities on behalf of any of the charitable
                    organizations benefiting from donations occurring on the
                    Platform. Additionally, in regard to any nonprofit
                    organizations that may be a beneficiary of transactions
                    occurring on the Platform, please note that Kernls makes no
                    warranty or guarantee about any of the nonprofit
                    organizations, or the accuracy, completeness, or adequacy of
                    the information provided by the organizations to display on
                    the Platform, or the use of any of the funds distributed to
                    any of the organizations. You understand and acknowledge
                    that while we ask that the nonprofit organizations who
                    utilize our Platform allocate the donations as indicated by
                    our users, the use of your donation(s) for any particular
                    Project is ultimately at the sole discretion of the
                    nonprofit organization who manages the Project, and in some
                    cases your donation(s) may be redirected to another Project
                    or cause. Any display, utilization or promotion of a Project
                    is not, and should not be seen, as an endorsement or
                    qualification. The sole and complete responsibility to
                    assess, review, and verify the suitability of any charitable
                    organization receiving payment from a transaction with which
                    you will be involved rests entirely with you.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Additional Acknowledgments</h3>
                  <p>
                    You hereby agree to abide by all applicable local, state,
                    national, and international laws and regulations with
                    respect to your use of the Kernls Platform. In addition, you
                    also acknowledge and agree that use of the Internet and
                    access to or transmissions or communications with the Kernls
                    Platform is solely at your own risk. While Kernls has
                    endeavored to create a secure and reliable Platform, you
                    should understand that the confidentiality of any
                    communication or material transmitted to/from the Kernls
                    Platform over the Internet or other form of global
                    communication network cannot be guaranteed. Accordingly,
                    Kernls is not responsible for the security of any
                    information transmitted to or from the Platform.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Prohibited Use/Activities</h3>
                  <p>
                    In addition to any other restrictions or conditions of use,
                    you hereby acknowledge, and represent and warrant, that you
                    will not use the Platform, to:{' '}
                  </p>
                  <ul className="no-item-indicator list-item-flex">
                    <li>
                      <span>(1)</span>
                      <span>
                        violate any applicable local, state, national or
                        international law;
                      </span>
                    </li>
                    <li>
                      <span>(2)</span>{' '}
                      <span>
                        license, sublicense, sell, resell, transfer, assign,
                        distribute or otherwise commercially exploit or make
                        available to any third party the Platform or in any way;
                      </span>
                    </li>
                    <li>
                      <span>(3)</span>{' '}
                      <span>
                        modify or make derivative works based upon the Platform;
                      </span>
                    </li>
                    <li>
                      <span>(4)</span> <span></span>create Internet “links” to
                      the Service or “frame” or “mirror” any Platform on any
                      other server or wireless or Internet-based device; (1)
                    </li>
                    <li>
                      <span>(5)</span>{' '}
                      <span>
                        reverse engineer or access the Platform in order to (a)
                        design or build a competitive product or service, (b)
                        design or build a product using similar ideas, features,
                        functions or graphics of the Platform, or (c) copy any
                        ideas, features, functions or graphics of the Platform;
                      </span>
                    </li>
                    <li>
                      <span>(6)</span>{' '}
                      <span>
                        launch an automated program or script, including, but
                        not limited to, web spiders, web crawlers, web robots,
                        web ants, web indexers, bots, viruses or worms, or any
                        program which may make multiple server requests per
                        second, or unduly burdens or hinders the operation
                        and/or performance of the Platform;
                      </span>
                    </li>
                    <li>
                      <span>(7)</span>{' '}
                      <span>
                        interfere with or disrupt the integrity or performance
                        of the Platform or the data contained therein, or
                        attempt to gain unauthorized access to the Platform or
                        its related systems or networks.
                      </span>
                    </li>
                  </ul>

                  <p>
                    Kernls will have the right to investigate and prosecute
                    violations of any of the above to the fullest extent of the
                    law. You acknowledge that Kernls has no obligation to
                    monitor your access to or use of the Platform, but has the
                    right to do so for the purpose of operating the Platform and
                    providing the Services, to ensure your compliance with these
                    Terms of Service, or to comply with applicable law or the
                    order or requirement of a court, administrative agency or
                    other governmental body.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Monitoring; Termination</h3>
                  <p>
                    Kernls has the right, but not the obligation, to monitor any
                    activity and content associated with the Platform. We may
                    investigate any reported violations of the Platforms
                    policies or complaints and take any action that we deem
                    appropriate. Kernls reserves the right, at any time and
                    without prior notice, to suspend or terminate your account,
                    or restrict, disable or permanently bar your use and access
                    to the Platform (or any portion thereof) if we believe, in
                    our sole discretion, that you have engaged, or may engage,
                    in any activities that violate these Terms of Service, or
                    for any other reason or for no reason.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Disclaimers</h3>
                  <p>
                    WHILE KERNLS ENDEAVORS TO PROVIDE A RELIABLE AND FUNCTIONAL
                    PLATFORM, THE PLATFORM - AND ALL INFORMATION ASSOCIATED WITH
                    THE PLATFORM - ARE PROVIDED ON AN &ldquo;AS-IS&rdquo; AND
                    &ldquo;AS AVAILABLE&rdquo; BASIS AND MAY INCLUDE ERRORS,
                    OMISSIONS, OR OTHER INACCURACIES. YOU ASSUME THE SOLE RISK
                    OF MAKING USE AND/OR RELYING ON THE PLATFORM. KERNLS
                    EXPRESSLY DISCLAIMS ALL WARRANTIES AND CONDITIONS WITH
                    RESPECT TO THE PLATFORM WHETHER IMPLIED, EXPRESS, OR
                    STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF
                    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE,
                    NONINFRINGEMENT OF THIRD-PARTY RIGHTS, SATISFACTORY QUALITY,
                    QUIET ENJOYMENT AND ACCURACY, OR ANY OTHER IMPLIED WARRANTY
                    UNDER THE UNIFORM COMPUTER INFORMATION TRANSACTIONS ACT AS
                    ENACTED BY ANY STATE. KERNLS ALSO MAKES NO REPRESENTATION OR
                    WARRANTY THAT THE PLATFORM WILL OPERATE ERROR FREE OR IN AN
                    UNINTERRUPTED FASHION OR THAT ANY FILES OR INFORMATION THAT
                    YOU DOWNLOAD FROM THE PLATFORM WILL BE FREE OF VIRUSES OR
                    CONTAMINATION OR DESTRUCTIVE FEATURES.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Limitation of Liability</h3>
                  <p>
                    UNDER NO CIRCUMSTANCES SHALL KERNLS (AND ITS SUCCESSORS,
                    PARENTS, SUBSIDIARIES, AFFILIATES, OFFICERS, DIRECTORS,
                    AGENTS, DEVELOPERS) BE LIABLE FOR (i) ANY DIRECT, INDIRECT,
                    PUNITIVE, INCIDENTAL, SPECIAL, EXEMPLARY, CONSEQUENTIAL
                    DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT
                    LIMITATION, DAMAGES FOR LOSS OF USE, DATA, BUSINESS OR
                    PROFITS THAT RESULT FROM THE USE OF, OR THE INABILITY TO
                    USE, THE PLATFORM OR ANY OF THE SERVICES, OR (ii) ANY MISUSE
                    OR UNAUTHORIZED USE OF YOUR ACCOUNT DUE TO, OR RELATED TO,
                    YOUR ACT OR OMISSION, OR (iii) ANY ACTION TAKEN IN
                    CONNECTION WITH AN INVESTIGATION BY KERNLS OR LAW
                    ENFORCEMENT AUTHORITIES REGARDING YOUR OR ANY OTHER
                    PARTY&apos;S USE OF THE PLATFORM, OR (iv) ANY ERRORS OR
                    OMISSIONS IN THE PLATFORM’S OPERATION, OR ANY DAMAGE FROM
                    ANY SECURITY BREACH OR FROM ANY VIRUS, BUGS, TAMPERING,
                    FRAUD, ERROR, OMISSION, INTERRUPTION, DEFECT, DELAY IN
                    OPERATION OR TRANSMISSION, COMPUTER LINE OR NETWORK FAILURE
                    OR ANY OTHER TECHNICAL OR OTHER MALFUNCTION, INCLUDING,
                    WITHOUT LIMITATION, LOSS OF GOODWILL, WHETHER IN AN ACTION
                    OF CONTRACT, NEGLIGENCE, STRICT LIABILITY, TORT OR ANY OTHER
                    ACTION. APPLICABLE LAW MAY NOT ALLOW THE LIMITATION OR
                    EXCLUSION OF LIABILITY OR EXEMPLARY, INCIDENTAL OR
                    CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION
                    MAY NOT APPLY TO YOU. BY USING THIS PLATFORM, YOU EXPRESSLY
                    AGREE TO THE ALLOCATION OF RISK SET FORTH HEREIN; IF YOU DO
                    NOT AGREE TO THIS ALLOCATION OF RISK, YOU MUST NOT USE THE
                    PLATFORM.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Indemnity </h3>
                  <p>
                    You agree to defend, indemnify, and hold harmless Kernls and
                    affiliates and all of their respective employees, funders,
                    parents, subsidiaries, joint ventures, affiliates, agents,
                    developers, directors, officers and attorneys from and
                    against any and all claims, proceedings, damages, injuries,
                    liabilities, losses, costs, and expenses (including
                    reasonable attorneys&apos; fees and litigation expenses)
                    relating to or arising from i) any breach or alleged breach
                    by you of this Terms of Service, or ii) any act or omission
                    related to your use of the Platform.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Governing Law</h3>
                  <p>
                    This Terms of Service has been made in and will be construed
                    and enforced solely in accordance with the laws of the
                    United States of America and the State of New York, as
                    applied to agreements entered into and completely performed
                    in the State of New York. You and Kernls each agree to
                    submit to exclusive subject matter jurisdiction, personal
                    jurisdiction, and venue to the federal and state courts
                    located in New York County, New York.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Arbitration </h3>
                  <p>
                    In our sole discretion, any disputes or claims under this
                    Terms of Service or its breach may be submitted to and
                    resolved exclusively by arbitration conducted in accordance
                    with American Arbitration Association rules. One arbitrator
                    appointed under such rules shall conduct arbitration. Any
                    such arbitration shall be in New York, New York, and the
                    laws of New York shall be applied. Any decision in
                    arbitration shall be final and binding upon the parties.
                    Judgment may be entered thereon in any court of competent
                    jurisdiction. Notwithstanding the above, Kernls may sue in
                    any court for infringement of its proprietary or
                    intellectual property rights. All claims you bring against
                    Kernls must be resolved in accordance with this section. All
                    claims filed or brought contrary to this section shall be
                    considered improperly filed. Any claim or cause of action
                    arising out of or related to use of the Platform and/or any
                    of the services, or the Terms of Service, must be filed
                    within one (1) year after such claim or cause of action
                    arose regardless of any status or law to the contrary. In
                    the event any such claim or cause of action is not filed
                    within such one (1) year period, such claim or cause of
                    action shall be barred. Any failure to act by Kernls with
                    respect to a breach by you or others does not waive our
                    right to act with respect to subsequent or similar breaches.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Term and Termination </h3>
                  <p>
                    This Terms of Service and your right to use the Kernls
                    Platform will take effect at the moment you access the
                    Kernls Platform, and is effective, binding and enforceable
                    for as long as use the Platform. In addition, Kernls
                    reserves all of its legal rights to pursue any and all legal
                    remedies if we believe you are using the Platform for
                    fraudulent or unlawful activity or you are taking any
                    actions or omissions that violate any term or condition of
                    this Terms of Service, or in order to protect its name and
                    goodwill, its business, and/or other users. Additionally,
                    Kernls reserves the right to terminate your use of the
                    Platform at anytime, for any reason or for no reason.
                    Termination will be effective without notice. You may also
                    terminate this Terms of Service at any time by ceasing to
                    use the Platform and all of its related features and, if you
                    have registered with the Platform, by emailing us at{' '}
                    <strong>info@kernls.com</strong> requesting that we delete
                    your account information.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Intellectual Property Complaints </h3>
                  <p>
                    Kernls respects the intellectual property rights of others.
                    If you believe that your work has been used on the Platform
                    in any manner that constitutes infringement, please notify
                    us at <strong>info@kernls.com</strong>.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>No Class Action</h3>
                  <p>
                    YOU AND KERNLS AGREE THAT ANY PROCEEDINGS TO RESOLVE OR
                    LITIGATE ANY DISPUTE WILL BE CONDUCTED SOLELY ON AN
                    INDIVIDUAL BASIS, AND THAT NEITHER YOU NOR KERNLS WILL SEEK
                    TO HAVE ANY DISPUTE HEARD AS A CLASS ACTION, A
                    REPRESENTATIVE ACTION, A COLLECTIVE ACTION, A PRIVATE
                    ATTORNEY-GENERAL ACTION, OR IN ANY PROCEEDING IN WHICH YOU
                    OR KERNLS ACTS OR PROPOSES TO ACT IN A REPRESENTATIVE
                    CAPACITY. YOU AND KERNLS FURTHER AGREE THAT NO PROCEEDING
                    WILL BE JOINED, CONSOLIDATED, OR COMBINED WITH ANOTHER
                    PROCEEDING WITHOUT THE PRIOR WRITTEN CONSENT OF YOU, KERNLS,
                    AND ALL PARTIES TO ANY SUCH PROCEEDING.
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Changes to the Terms of Service </h3>
                  <p>
                    Kernls reserves the right to change, alter, replace or
                    otherwise modify these Terms of Service at any time. The
                    date of last modification is stated at the end of these
                    Terms of Service. It is your responsibility to check this
                    page from time to time for updates, and you hereby
                    acknowledge and agree that you will be bound by the then
                    current posted Terms of Service.{' '}
                  </p>
                </SubSection>
                <SubSection>
                  <h3>Miscellaneous </h3>
                  <p>
                    This Terms of Service constitutes the entire agreement
                    between you and Kernls and governs your use of the Platform,
                    superseding any prior agreements between you and Kernls. You
                    will not assign the Terms of Service or assign any rights or
                    delegate any obligations hereunder, in whole or in part,
                    whether voluntarily or by operation of law, without the
                    prior written consent of Kernls. Any purported assignment or
                    delegation by you without the appropriate prior written
                    consent of Kernls will be null and void. We may assign these
                    Terms of Service or any rights hereunder without your
                    consent. Failure by Kernls to insist on strict performance
                    of any of the terms and conditions of this Terms of Service
                    will not operate as a waiver by Kernls of that or any
                    subsequent default or failure of performance. The Platform
                    is not intended for distribution to or use by any person or
                    entity in any jurisdiction or country where such
                    distribution or use would be contrary to law or regulation
                    or which would subject Kernls to any registration
                    requirement within such jurisdiction or country. We reserve
                    the right to limit the availability of the Platform or any
                    portion of the Platform, to any person, geographic area, or
                    jurisdiction, at any time and in our sole discretion, and to
                    limit the service or other features that the Platform
                    provides. If any provision (or part thereof) contained in
                    this Terms of Service is determined to be void, invalid, or
                    otherwise unenforceable by a court of competent jurisdiction
                    or on account of a conflict with an applicable government
                    regulation, such determination shall not affect the
                    remaining provisions (or parts thereof) contained herein and
                    the illegal, invalid, or unenforceable clause shall be
                    modified in compliance with applicable law in a manner that
                    most closely matches the intent of the original language. No
                    joint venture, partnership, employment, or agency
                    relationship exists between you and Kernls as result of this
                    Terms of Service or your utilization of the Kernls Platform.
                    All provisions that are intended to survive termination of
                    our relationship with you will so survive, including all
                    provisions relating to intellectual property,
                    confidentiality, disputes, representations/warranties,
                    indemnities, and limitations of liability. Headings herein
                    are for convenience only.
                    <br />
                    Terms of Service: last updated November 1, 2020.
                  </p>
                </SubSection>
              </Section>
            </Container>
          </ContentContainer>
        </Wrapper>
      </Layout>
    </Page>
  )
}

export default ProjectPrivacyPolicyPage
