import * as v from "valibot";

export function useValidation<T extends Record<string, any>>(
  formData: Ref<T>,
  schema: v.BaseSchema<any, T, any>,
) {
  const errors = ref<Partial<Record<keyof T, string>>>({});
  const isValid = ref(true);

  const validate = () => {
    const result = v.safeParse(schema, formData.value);

    errors.value = {};

    if (!result.success) {
      isValid.value = false;
      for (const issue of result.issues) {
        if (issue.path && issue.path[0]) {
          const fieldName = issue.path[0].key as keyof T;
          if (!errors.value[fieldName]) {
            errors.value[fieldName] = issue.message;
          }
        }
      }
      return false;
    }

    isValid.value = true;
    return true;
  };

  watch(formData, () => validate(), { deep: true });

  return { errors, isValid, validate };
}
