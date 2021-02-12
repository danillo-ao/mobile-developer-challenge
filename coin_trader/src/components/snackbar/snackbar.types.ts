import {ReactChild} from 'react';

export enum snackbarTypes {
  success = 'success',
  error = 'error',
  info = 'info'
}

export type SnackbarTypes = keyof typeof snackbarTypes;

export type SnackbarContextValues = {
  show(message: string, type?: SnackbarTypes): void;
  close(): void;
};

export type SnackbarContextProps = {
  children?: ReactChild | ReactChild[];
};
