import {ReactChild} from 'react';

export type ButtonProps = {
  children: ReactChild | Text;
  onPress?(): void;
};
