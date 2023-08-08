import { useState } from 'react';

export type UseModal = ReturnType<typeof useModal>;

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return { handleClose, handleOpen, open };
};
