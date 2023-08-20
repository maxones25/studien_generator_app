export const ParticipantAttribute = {
  StartedAt: 'startedAt',
  EndedAt: 'endedAt',
} as const;

export type ParticipantAttributeType = (typeof ParticipantAttribute)[keyof typeof ParticipantAttribute];
