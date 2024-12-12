import { supabase } from "../../supabaseClient";

export const validateToken = async () => {
  const authToken = localStorage.getItem("sb-rvqndyyuktiqbjamkpwo-auth-token");
  if (!authToken) return false;

  try {
    const session = JSON.parse(authToken);
    const { access_token } = session;
    if (!access_token) return false;

    const { data, error } = await supabase.auth.getUser(access_token);

    if (error) return false;
    return !!data;
  } catch (err) {
    return false;
  }
};
