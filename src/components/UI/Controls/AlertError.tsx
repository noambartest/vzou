import { Alert } from "@mui/material";


type AlertErrorProps = {
  error: string;
  onClose: () => void;
};

export function AlertError({ error, onClose }: AlertErrorProps) {
  return (
    <div className="flex absolute top-[48px] inset-0 justify-center py-10 ">
      <Alert
        severity="error"
        color="error"
        className="w-[670px] h-[50px]"
        onClose={onClose}
      >
        {error}
      </Alert>
    </div>
  );
}
