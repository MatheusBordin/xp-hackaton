/**
 * Enum with HTTP status' code.
 *
 * @export
 * @enum {number}
 */
export enum HttpStatus {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,

    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,

    InternalServerError = 500,
    NotImplemented = 501,
    ServiceUnavailable = 502,
}
