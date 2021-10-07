import { BreadcrumbItem } from '@/components/Breadcrumb'

export const PaymentBreadcrumb1: BreadcrumbItem = {
  name: 'payment',
  label: 'Payment',
  linkUrl: '/PaymentPages/Payment',
}
export const PaymentBreadcrumb2: BreadcrumbItem = {
  name: 'direct-deposit',
  label: 'Direct Deposit',
  linkUrl: '/PaymentPages/DirectDeposit',
}
export const PaymentBreadcrumb3: BreadcrumbItem = {
  name: 'deposit',
  label: 'Deposit',
  linkUrl: '/PaymentPages/DDeposit',
}

export const PaymentBreadcrumbs = [
  PaymentBreadcrumb1,
  PaymentBreadcrumb2,
  PaymentBreadcrumb3,
]
