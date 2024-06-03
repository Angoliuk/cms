import { Button } from "@/ui-shared/components/button";
import { FC, MouseEventHandler } from "react";

export type SavedContentCardProps = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  message: string;
};

export const SavedContentCard: FC<SavedContentCardProps> = ({ handleClick, message }) => {
  return (
    <>
      <p className="text-headlineS mb-4 text-center">{message}</p>
      <div className="mt-4 flex justify-center">
        <Button className="w-full max-w-44" onClick={handleClick}>
          Change
        </Button>
      </div>
    </>
  );
};
