import { createEnv } from "@t3-oss/env-core";
import Config from 'react-native-config';
import { z } from "zod";
 
export const env = createEnv({
  clientPrefix: "",
  server: {
  },
  client: {
    API_URL: z.string().url(),
    API_KEY: z.string().min(1)
  },
  runtimeEnv: Config
});