export class UnAuthorizedError extends Error {
  static generate (message) {
    return new this(message)
  }
}

export class ServerError extends Error {
  static generate () {
    return new this('There was an error in the server, please try again later')
  }
}

export class UnexpectedError extends Error {
  static generate () {
    return new this('There was an error, please try again later')
  }
}