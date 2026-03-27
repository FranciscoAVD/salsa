enum PostgresErrorCode {
  UniqueViolation = "23505",
  ForeignKeyViolation = "23503",
  NotNullViolation = "23502",
  CheckViolation = "23514",
  InvalidTextRepresentation = "22P02",
  NumericValueOutOfRange = "22003",
}

type DatabaseErrorType =
  | "UNIQUE_VIOLATION"
  | "FOREIGN_KEY_VIOLATION"
  | "NOT_NULL_VIOLATION"
  | "CHECK_VIOLATION"
  | "INVALID_INPUT"
  | "UNKNOWN_DATABASE_ERROR";

export class DatabaseError extends Error {
  public readonly type: DatabaseErrorType;
  public readonly code: string | undefined;
  public readonly detail: string | undefined;
  public readonly table: string | undefined;
  public readonly constraint: string | undefined;
  public readonly column: string | undefined;

  constructor(originalError: any) {
    // Extract properties usually provided by 'pg' error objects
    const { message, code, detail, table, constraint, column } =
      originalError;

    super(message || "An unexpected database error occurred");

    this.name = "DatabaseError";
    this.code = code;
    this.detail = detail;
    this.table = table;
    this.constraint = constraint;
    this.column = column;
    this.type = this.parseErrorType(code);

    // Ensure the prototype is set correctly for custom errors in TS
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  private parseErrorType(
    code: string | undefined,
  ): DatabaseErrorType {
    switch (code) {
      case PostgresErrorCode.UniqueViolation:
        return "UNIQUE_VIOLATION";
      case PostgresErrorCode.ForeignKeyViolation:
        return "FOREIGN_KEY_VIOLATION";
      case PostgresErrorCode.NotNullViolation:
        return "NOT_NULL_VIOLATION";
      case PostgresErrorCode.CheckViolation:
        return "CHECK_VIOLATION";
      case PostgresErrorCode.InvalidTextRepresentation:
      case PostgresErrorCode.NumericValueOutOfRange:
        return "INVALID_INPUT";
      default:
        return "UNKNOWN_DATABASE_ERROR";
    }
  }

  public isType(type: DatabaseErrorType): boolean {
    return this.type === type;
  }
}
