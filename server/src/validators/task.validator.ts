import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { TaskProps } from "../interfaces/task.interface";

type TaskValidatorProps = {
  tasks: TaskProps[];
};

const taskSchema: z.ZodType<TaskValidatorProps> = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      checked: z.boolean(),
    })
  ),
});

export const zTaskValidator = zValidator("json", taskSchema);
