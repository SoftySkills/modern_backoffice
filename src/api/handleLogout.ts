import { supabase } from "../../supabaseClient";

export const handleLogout = async () => {
  await supabase.auth.signOut();
  window.location.href = "/login";
};
