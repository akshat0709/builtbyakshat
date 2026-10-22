/**
 * Safe whitelist mapping of reference slugs to human-readable project names.
 * Never displays raw, unvalidated query parameters.
 */
export const REF_MAPPINGS: Record<string, string> = {
  "orange-taxi": "Orange Taxi",
  "rescue-robot": "Autonomous Search and Rescue Robot",
  "animal-detection": "Animal Detection in Locomotive Tracks",
  portfolio: "Akshat's Portfolio",
  wheelchair: "Voice-Controlled Wheelchair",
};

/**
 * Sanitizes and resolves a ?ref parameter to a verified project display name.
 * Returns null if the ref is absent, empty, or unmapped.
 */
export function getProjectNameFromRef(
  rawRef: string | null | undefined
): string | null {
  if (!rawRef || typeof rawRef !== "string") {
    return null;
  }

  // Strictly sanitize key to alphanumeric and dashes
  const sanitized = rawRef.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");

  if (Object.prototype.hasOwnProperty.call(REF_MAPPINGS, sanitized)) {
    return REF_MAPPINGS[sanitized];
  }

  return null;
}
