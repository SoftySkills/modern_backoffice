import { message } from "antd";
import { supabase } from "../../supabaseClient";

export const handleLogin = async (email: string, password: string) => {
  const { data: session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) message.error(error.message);
  else {
    const token = session?.session?.access_token;
    if (token) {
      message.success("Logged in successfully !");
      window.location.href = "/";
    }
  }
};
