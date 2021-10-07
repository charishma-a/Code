import { Maybe, Profile } from '@/generated/graphql'
import { CSSProperties } from 'styled-components'

export interface BaseComponentProps {
  classNames?: string
  style?: CSSProperties
}
export interface BaseSecurePageProps {
  accessToken: string
  me: Maybe<Profile>
  redirectUrl: string
}
export type RenderIcon = (props: React.SVGProps<SVGSVGElement>) => JSX.Element
