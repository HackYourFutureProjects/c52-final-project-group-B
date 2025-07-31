export function validateRequestBody(schema, req) {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    throw result.error; // create an error for Zod
  }

  return result.data;
}

export function validateRequestParams(schema, req) {
  const result = schema.safeParse(req.params);

  if (!result.success) {
    throw result.error;
  }

  return result.data;
}
