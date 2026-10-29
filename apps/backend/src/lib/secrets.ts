import { MedusaError } from "@medusajs/framework/utils";

const MIN_SECRET_LENGTH = 32;
const KNOWN_WEAK_SECRETS = new Set(["supersecret", "secret", "changeme"]);

/**
 * Reads a signing secret from the environment. Outside production a missing value falls back to
 * Medusa's development default; in production a missing, short or well-known value stops startup
 * so the server never signs tokens with a guessable key.
 */
export function requireSecret(
  name: string,
  env: NodeJS.ProcessEnv = process.env
): string | undefined {
  const value = env[name];
  if (env.NODE_ENV !== "production") {
    return value;
  }
  if (!value || value.length < MIN_SECRET_LENGTH || KNOWN_WEAK_SECRETS.has(value)) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      `${name} must be set to a random value of at least ${MIN_SECRET_LENGTH} characters in production.`
    );
  }
  return value;
}
