enum TokenType {
  LEFT_BRACE,
  RIGHT_BRACE,
  LEFT_BRACKET,
  RIGHT_BRACKET,
  COLON,
  COMMA,
  TRUE,
  FALSE,
  NULL,
  STRING,
  NUMBER,
  SEPARATOR,
}

export function TokenTypeToString(tokenType: TokenType): string {
  return [
    "LEFT_BRACE",
    "RIGHT_BRACE",
    "LEFT_BRACKET",
    "RIGHT_BRACKET",
    "COLON",
    "COMMA",
    "TRUE",
    "FALSE",
    "NULL",
    "STRING",
    "NUMBER",
    "SEPARATOR",
  ][tokenType];
}

export default TokenType;
