import { ReactNode, useState } from 'react';

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => ReactNode;
}

const SidebarLinkGroup = ({ children }: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return <>{children(handleClick, open)}</>;
};

export default SidebarLinkGroup;
