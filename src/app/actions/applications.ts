"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseApplicationForm, type FormErrors } from "@/lib/validators";

export type ActionState = {
  errors?: FormErrors;
  message?: string;
};

export async function createApplication(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseApplicationForm(formData);
  if (!parsed.data) {
    return { errors: parsed.errors };
  }

  await prisma.application.create({ data: parsed.data });
  revalidatePath("/");
  revalidatePath("/applications");
  redirect("/applications?toast=created");
}

export async function updateApplication(
  id: string,
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = parseApplicationForm(formData);
  if (!parsed.data) {
    return { errors: parsed.errors };
  }

  await prisma.application.update({
    where: { id },
    data: parsed.data,
  });
  revalidatePath("/");
  revalidatePath("/applications");
  revalidatePath(`/applications/${id}`);
  redirect(`/applications/${id}?toast=updated`);
}

export async function deleteApplication(id: string) {
  await prisma.application.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/applications");
  redirect("/applications?toast=deleted");
}
