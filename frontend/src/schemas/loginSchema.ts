
import { z } from "zod";


export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().length(6, {message: "Password must be 6 characters long"}),
});


