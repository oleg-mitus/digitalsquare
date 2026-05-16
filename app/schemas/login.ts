import * as v from "valibot";

export const LoginFormSchema = v.object({
  email: v.pipe(
    v.string(),
    v.nonEmpty("Введите email"),
    v.email("Некорректный формат email"),
  ),
  password: v.pipe(v.string(), v.nonEmpty("Введите пароль")),
});

export type LoginFormData = v.InferOutput<typeof LoginFormSchema>;
