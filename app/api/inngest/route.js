import { serve } from "inngest/next";
import { inngest } from "@/lib/actions/inngest";
import {
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdatation,
} from "@/lib/actions/inngest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [syncUserCreation, syncUserDeletion, syncUserUpdatation],
});
