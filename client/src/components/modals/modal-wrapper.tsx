import { FC, PropsWithChildren } from 'react';

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

export const ModalWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  show,
  setShow,
}) => {
  return (
    show && (
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-black/25"
        onClick={() => setShow(false)}
      >
        <div
          className="relative w-auto my-6 mx-auto max-w-3xl"
          onClick={(ev) => ev.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative w-full bg-white outline-none focus:outline-none">
            {children}
          </div>
        </div>
      </div>
    )
  );
};
