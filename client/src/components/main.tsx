import { FC, PropsWithChildren } from 'react';

export const Main: FC<PropsWithChildren> = ({ children }) => {
  return <main className="p-6 mx-auto max-w-7xl">{children}</main>;
};
