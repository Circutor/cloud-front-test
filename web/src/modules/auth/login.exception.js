export const SERVER_ERROR_MESSAGE = 'There was an error in the server, please try again later'
export const UNEXPECTED_ERROR_MESSAGE = 'There was an error, please try again later'

export class UnAuthorizedError extends Error {
  static generate (message) {
    return new this(message)
  }
}

export class ServerError extends Error {
  static generate () {
    return new this(SERVER_ERROR_MESSAGE)
  }
}

export class UnexpectedError extends Error {
  static generate () {
    return new this(UNEXPECTED_ERROR_MESSAGE)
  }
}