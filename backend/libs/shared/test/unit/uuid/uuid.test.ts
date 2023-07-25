import { validateUUID } from "@shared/modules/uuid/uuid";

describe('UUID validation', () => {
  it('should return true for a valid UUID', () => {
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    expect(validateUUID(uuid)).toBe(true);
  });

  it('should return false for an invalid UUID', () => {
    const uuid = 'invalid uuid';
    expect(validateUUID(uuid)).toBe(false);
  });

  it('should return false for a null', () => {
    const uuid = null;
    expect(validateUUID(uuid)).toBe(false);
  });

  it('should return false for an undefined', () => {
    const uuid = undefined;
    expect(validateUUID(uuid)).toBe(false);
  });
});
