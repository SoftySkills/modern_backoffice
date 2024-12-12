import { supabase } from "../../supabaseClient";
import { StudentDataType } from "../types";

export const editStudent = async (updatedata: Partial<StudentDataType>) => {
  const { id, ...body } = updatedata;
  const { data, error } = await supabase
    .from("students")
    .update(body)
    .eq("id", id)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
