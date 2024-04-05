export class LateCheckInValidationError extends Error {
  constructor() {
    super('You can only validate check-ins 20 minutes in the future')
  }
}