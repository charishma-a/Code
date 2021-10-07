export interface DonationReason {
  id: string
  code: string
  reason: string
}

export const DONATION_REASONS: DonationReason[] = [
  {
    id: 'd33c8e39-350c-4a5f-94a4-183c626d2083',
    code: 'referred-researcher',
    reason: 'I was referred here by a researcher or clinician',
  },
  {
    id: '2e2225b7-d54a-4a09-ba61-7e76ec2c2e9f',
    code: 'personal-experience',
    reason: 'I’ve had a personal experience with this disease',
  },
  {
    id: 'c4314743-5415-462d-be15-755bf70dae2a',
    code: 'interested-supporting',
    reason: 'I’m generally interested in supporting this research',
  },
  {
    id: 'a64e6ccf-27ba-45f9-8737-ee35c782b18f',
    code: 'tax-benefit',
    reason: 'I’d like the tax benefit',
  },
  {
    id: '6d7a06d7-ae65-487f-82a0-5ec70837eeb7',
    code: 'other',
    reason: 'Other',
  },
]
