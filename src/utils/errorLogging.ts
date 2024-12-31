export function logError(context: string, error: unknown) {
  console.error(`[${context}] Error:`, {
    name: error instanceof Error ? error.name : 'Unknown',
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    details: error instanceof Object ? error : undefined
  });
}