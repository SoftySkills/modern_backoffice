import { supabase } from "../../supabaseClient";

export const deleteStudent = async (studentId: string) => {
  const { data, error } = await supabase
    .from("students")
    .delete()
    .eq("id", studentId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
