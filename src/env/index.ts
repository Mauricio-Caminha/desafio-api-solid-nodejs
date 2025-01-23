import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  HOST: z.string().default("0.0.0.0"),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().default("secret"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log("⚠️ Invalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
