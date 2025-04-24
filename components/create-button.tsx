import React from "react";
import { Button } from "./ui/button";

import { FilePlus2 } from "lucide-react";

const CreateButton = () => {
  const handleNoteCreate = async () => {};

  return (
    <Button
      variant="outline"
      size="icon"
      className="cursor-pointer"
      onClick={handleNoteCreate}
    >
      <FilePlus2 />
    </Button>
  );
};

export default CreateButton;
