import { Button } from "@/components/ui/button";
import React from "react";
import { signout } from "../(auth)/login/actions";

const Dashboard = () => {
  return (
    <div>
      Bliss note taking
      <Button onClick={signout}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
