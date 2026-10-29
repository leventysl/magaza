import { requireSecret } from "../secrets";

const strong = "x".repeat(32);

describe("requireSecret", () => {
  it("returns the value as is outside production", () => {
    expect(requireSecret("JWT_SECRET", { NODE_ENV: "development" })).toBeUndefined();
    expect(requireSecret("JWT_SECRET", { NODE_ENV: "development", JWT_SECRET: "supersecret" })).toBe(
      "supersecret"
    );
  });

  it("accepts a long random value in production", () => {
    expect(requireSecret("JWT_SECRET", { NODE_ENV: "production", JWT_SECRET: strong })).toBe(strong);
  });

  it.each([
    ["missing", undefined],
    ["short", "abc123"],
    ["well-known", "supersecret"],
  ])("rejects a %s value in production", (_case, value) => {
    expect(() => requireSecret("JWT_SECRET", { NODE_ENV: "production", JWT_SECRET: value })).toThrow(
      "JWT_SECRET"
    );
  });
});
