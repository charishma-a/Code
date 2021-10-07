import { BreadcrumbItem } from '@/components/Breadcrumb'
import {
  ROUTE_SECURE_CHAMPION_PAYMENTS,
  ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT,
  ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_CREATE,
  ROUTE_SECURE_CHAMPION_PAYMENTS_CREDIT,
} from '../config'

export const paymentsBreadcrumb: BreadcrumbItem = {
  name: 'payment',
  label: 'Payment',
  linkUrl: ROUTE_SECURE_CHAMPION_PAYMENTS,
}
export const paymentsDepositBreadcrumb: BreadcrumbItem = {
  name: 'payments-deposit',
  label: 'Direct Deposit',
  linkUrl: ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT,
}
export const paymentsDepositCreateBreadcrumb: BreadcrumbItem = {
  name: 'payments-deposit-create',
  label: 'Deposit',
  linkUrl: ROUTE_SECURE_CHAMPION_PAYMENTS_DIRECT_CREATE,
}
export const paymentsBreadcrumbCredit: BreadcrumbItem = {
  name: 'payments-credit',
  label: 'Credit Card',
  linkUrl: ROUTE_SECURE_CHAMPION_PAYMENTS_CREDIT,
}
