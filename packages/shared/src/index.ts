// Model and channel IDs used by frontend and API
export const MODEL_IDS = ["claude-opus-4.5", "gpt-5.2", "gemini-3-flash"] as const;
export const CHANNEL_IDS = ["telegram", "discord", "whatsapp"] as const;

export type ModelId = (typeof MODEL_IDS)[number];
export type ChannelId = (typeof CHANNEL_IDS)[number];
