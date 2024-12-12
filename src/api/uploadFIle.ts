import { RcFile } from "antd/es/upload";
import { supabase } from "../../supabaseClient";

export const uploadFile = async (file?: RcFile) => {
  if (!file) return;
  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(`private/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return null;
  }

  return data?.path;
};
