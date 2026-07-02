export function parseSportyBetRawText(rawText: string) {
    const lines = rawText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  
    return {
      lines,
      warning:
        "Parser v1 only separates visible text lines. Structured selection parsing comes next.",
    };
  }