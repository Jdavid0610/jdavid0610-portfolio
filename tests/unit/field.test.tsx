import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'

describe('Field', () => {
  it('links the error to the control for screen readers', () => {
    render(
      <Field id="email" label="Email" errors={['That email is taken.']}>
        {(props) => <Input {...props} name="email" />}
      </Field>,
    )

    const input = screen.getByLabelText('Email')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.getAttribute('aria-describedby')).toContain('email-error')
    expect(screen.getByRole('alert').textContent).toBe('That email is taken.')
  })

  it('keeps the required marker out of the accessible name', () => {
    render(
      <Field id="password" label="Password" required>
        {(props) => <Input {...props} name="password" type="password" />}
      </Field>,
    )

    // Exact match: the visual asterisk must not leak into the label.
    expect(screen.getByLabelText('Password')).toBeTruthy()
  })

  it('stays quiet when there is no error', () => {
    render(
      <Field id="name" label="Name" hint="Your full name">
        {(props) => <Input {...props} name="name" />}
      </Field>,
    )

    const input = screen.getByLabelText('Name')
    expect(input.getAttribute('aria-invalid')).toBeNull()
    expect(input.getAttribute('aria-describedby')).toBe('name-hint')
    expect(screen.queryByRole('alert')).toBeNull()
  })
})
