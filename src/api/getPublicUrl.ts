import { supabase } from "../../supabaseClient";

export const getPublicUrl = (filePath: string) => {
  const { data } = supabase.storage.from("avatar").getPublicUrl(filePath);
  if (data?.publicUrl) {
    return data?.publicUrl;
  } else {
    return null;
  }
};
