import React, { FC, useEffect, useState } from "react";
import { validateToken } from "../api/validateToken";
import { Spin } from "antd";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      setIsAuthenticated(isValid);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center ">
        <Spin />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AuthGuard;
