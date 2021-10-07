import { BreadcrumbItem } from '@/components/Breadcrumb'
import {
  ROUTE_SECURE_CHAMPION_CONTACTS,
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE,
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE_REVIEW,
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_PASTE,
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_PASTE_REVIEW,
  ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_SINGLE,
} from '../config'

export const contactsBreadcrumb: BreadcrumbItem = {
  name: 'contacts',
  label: 'Contacts',
  linkUrl: ROUTE_SECURE_CHAMPION_CONTACTS,
}
export const contactsBreadcrumbSingle: BreadcrumbItem = {
  name: 'single-contact',
  label: 'Add contacts',
  linkUrl: ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_SINGLE,
}
export const contactsBreadcrumbPaste: BreadcrumbItem = {
  name: 'paste-multiple',
  label: 'Copy-paste multiple',
  linkUrl: ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_PASTE,
}
export const contactsBreadcrumbPasteReview: BreadcrumbItem = {
  name: 'paste-multiple',
  label: 'Copy-paste multiple',
  linkUrl: ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_PASTE_REVIEW,
}
export const contactsBreadcrumbFile: BreadcrumbItem = {
  name: 'file-multiple',
  label: 'Upload multiple',
  linkUrl: ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE,
}
export const contactsBreadcrumbFileReview: BreadcrumbItem = {
  name: 'file-multiple-review',
  label: 'Review and organize',
  linkUrl: ROUTE_SECURE_CHAMPION_CONTACTS_CREATE_FILE_REVIEW,
}
