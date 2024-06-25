import React, { forwardRef } from "react";

export const Modal = forwardRef(
  (
    { children, modalBoxClassName, onBackdropClick, onAccept, onCancel },
    ref
  ) => {
    return (
      <dialog ref={ref} className="modal">
        <div className={`modal-box ${modalBoxClassName ?? ""}`}>
          {children}
          <div className="modal-action mt-3 ml-auto flex w-full">
            <button type="button" className="btn" onClick={onCancel}>
              Cancelar
            </button>
            <button
              type="button ml-3"
              className="btn btn-success"
              onClick={onAccept}
            >
              Aceptar
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            type="button"
            onClick={() => {
              onBackdropClick && onBackdropClick();
            }}
          >
            close
          </button>
        </form>
      </dialog>
    );
  }
);
