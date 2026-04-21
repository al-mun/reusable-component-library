import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export function renderWithUser(ui: React.ReactNode) {
  return {
    user: userEvent.setup(),
    ...render(ui),
  }
}