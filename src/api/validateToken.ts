import { supabase } from "../../supabaseClient";

export const validateToken = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) return false;

  return true;
};
