import { MockedProvider } from '@apollo/client/testing'
import { GET_DOGS, Dogs } from './Dogs'

import { render, waitFor } from '@/test/testUtils'

describe('<Dogs/>', () => {
  it('should render', async () => {
    const mocks = [
      {
        request: { query: GET_DOGS },
        result: {
          data: {
            dogs: [
              { id: '1', breed: 'husky' },
              { id: '2', breed: 'poodle' },
            ],
          },
        },
      },
    ]

    const onDogSelected = jest.fn()

    const { queryByText } = render(
      <MockedProvider mocks={mocks}>
        <Dogs onDogSelected={onDogSelected} />
      </MockedProvider>
    )

    expect(queryByText('Loading...')).toBeTruthy()

    await waitFor(() => expect(queryByText('Loading...')).toBeFalsy())

    expect(queryByText('husky')).toBeTruthy()
  })
})
