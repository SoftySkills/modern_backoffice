import { supabase } from "../../supabaseClient";
import { StudentDataType } from "../types";

export const addStudent = async (
  body: Omit<StudentDataType, "id" | "created_at" | "course_enrolled">
) => {
  const { data, error } = await supabase
    .from("students")
    .insert([body])
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
