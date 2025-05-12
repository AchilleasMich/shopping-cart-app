import React from "react";
import { useNavigate } from "react-router";
import Button from "./ui/Buttons/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen text-center p-4 mt-12">
      <p className="text-4xl font-bold mb-4">404</p>
      <p className="text-4xl font-bold mb-4">Page Not Found</p>
      <p className="mb-6">The page you’re looking for doesn’t exist.</p>
      <Button onClick={() => navigate("/")}>Continue Shopping</Button>
    </div>
  );
};

export default NotFound;
