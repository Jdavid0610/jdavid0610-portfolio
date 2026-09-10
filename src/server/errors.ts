/**
 * Error taxonomy. Services throw these; the action/route boundary maps them
 * to a status code or a user-facing message. Nothing else is ever leaked.
 *
 * `message` holds a message *key* (see `shared/i18n/messages.ts`), not prose:
 * an error thrown deep in a service has no access to the request's locale, so
 * translation happens once at the boundary. A key that is not in the catalogue
 * is rendered verbatim, which keeps third-party messages working.
 */
export class AppError extends Error {
  constructor(
    message: string,
    readonly code: string = 'app_error',
    readonly status: number = 400,
  ) {
    super(message)
    this.name = new.target.name
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'error.unauthorized') {
    super(message, 'unauthorized', 401)
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'error.forbidden') {
    super(message, 'forbidden', 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'error.notFound') {
    super(message, 'not_found', 404)
  }
}

export class ValidationError extends AppError {
  constructor(
    message = 'error.fields',
    readonly fieldErrors: Record<string, string[]> = {},
  ) {
    super(message, 'validation_error', 422)
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}

/** Next's `redirect()`/`notFound()` signal by throwing; never swallow those. */
export function isFrameworkError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'digest' in error &&
    typeof (error as { digest?: unknown }).digest === 'string' &&
    ((error as { digest: string }).digest.startsWith('NEXT_REDIRECT') ||
      (error as { digest: string }).digest === 'NEXT_NOT_FOUND')
  )
}
