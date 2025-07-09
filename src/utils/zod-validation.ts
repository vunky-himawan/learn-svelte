import { type ZodSchema, ZodError } from 'zod';

export async function validateZodSchema<T>(
	schema: ZodSchema<T>,
	data: unknown
): Promise<{ success: true; data: T } | { success: false; errors: Record<string, string> }> {
	try {
		const parsed = await schema.parseAsync(data);

		return { success: true, data: parsed };
	} catch (err) {
		if (err instanceof ZodError) {
			const fieldErrors: Record<string, string> = {};
			for (const issue of err.issues) {
				fieldErrors[issue.path[0] as string] = issue.message;
			}
			return { success: false, errors: fieldErrors };
		}
		return { success: false, errors: { _form: 'Unknown validation error' } };
	}
}
