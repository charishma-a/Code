import React from 'react'

import { TableV2 } from './TableV2'

import { render } from '@/test/testUtils'

const defaultProps = {
  columns: [
    {
      accessor: 'date',
      Header: 'Date',
      styles: `flex: 1 1 0; min-width: 20%;`,
    },
    { accessor: 'description', Header: 'Description', styles: `flex: 4 4 0;` },
  ],
  data: [
    {
      date: 'July 2021',
      description: 'Prepare subjects for neural recordings',
    },
    {
      date: 'Aug - Sept 2021',
      description: 'Collect neural recording data',
    },
    {
      date: 'Oct 2021',
      description: 'Analyze statistics',
    },
  ],
  showHeaderRow: true,
  topPadding: true,
}

describe('<TableV2 />', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<TableV2 {...defaultProps} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
