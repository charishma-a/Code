import { Address } from './address'

export interface Backer {
  id: string
  profileId: string
  first_name: string
  last_name: string
  gender?: 'male' | 'female'
  email: string
  address?: Address
  avatar: string
  anonymous?: boolean
  dedicatedNote?: string
}

export interface ProjectBacker extends Backer {
  matched: number
  matching: number
}

export const BACKERS: Backer[] = [
  {
    id: '69b03076-768f-4d28-83f5-67b7990000a2',
    profileId: '69b03076-768f-4d28-83f5-67b7990000a2',
    first_name: 'Mike',
    last_name: 'Haughton',
    gender: 'male',
    email: 'mike@kernls.com',
    avatar: 'avatar-mike.png',
    dedicatedNote: 'Dedicated to Maggie',
  },
  {
    id: '27eb219e-5d57-47b2-a5e5-ff0864bbf0d2',
    profileId: '27eb219e-5d57-47b2-a5e5-ff0864bbf0d2',
    first_name: 'Russ',
    last_name: 'Browne',
    gender: 'male',
    email: 'russbrown@gmail.com',
    avatar: 'avatar-russel-browne.png',
    dedicatedNote: 'Dedicated to Dr. Phyllis Browne',
  },
  {
    id: '567ca5e1-838d-4b7a-89cd-3b6455ae7b04',
    profileId: '567ca5e1-838d-4b7a-89cd-3b6455ae7b04',
    first_name: '',
    last_name: '',
    email: '',
    anonymous: true,
    avatar: 'avatar-anonymous.png',
    dedicatedNote: '',
  },
  {
    id: 'c374f040-4912-424b-a870-3b74a3ef46b7',
    profileId: 'c374f040-4912-424b-a870-3b74a3ef46b7',
    first_name: 'Ross',
    last_name: 'Blum',
    gender: 'male',
    email: '',
    avatar: 'avatar-ross-blum.png',
    dedicatedNote: 'Dedicated to Abbey Blum',
  },
  {
    id: '2234bc2b-a37d-4551-bfb7-c5ae7b8f38f8',
    profileId: '2234bc2b-a37d-4551-bfb7-c5ae7b8f38f8',
    first_name: 'Kensington Place',
    last_name: '',
    gender: 'male',
    email: 'sevans@kensingtonsl.com',
    avatar: 'avatar-kensington-place.png',
    dedicatedNote: 'Assisted Living and Memory Care',
  },
]
