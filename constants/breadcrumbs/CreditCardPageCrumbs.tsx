import { BreadcrumbItem } from '@/components/Breadcrumb'

export const PaymentBreadcrumb1: BreadcrumbItem = {
  name: 'payment',
  label: 'Payment',
  linkUrl: '/PaymentPages/Payment',
}
export const PaymentBreadcrumb2: BreadcrumbItem = {
  name: 'credit-card',
  label: 'Credit Card',
  linkUrl: '/PaymentPages/Creditcard',
}

export const PaymentBreadcrumbs = [PaymentBreadcrumb1, PaymentBreadcrumb2]
