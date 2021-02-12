import {IconNames} from '@components/icons/icon.types';

export type HeaderProps = {
  title: string;
  hasGoBack?: boolean;

  actionIcon?: IconNames;
  action?(): void;
};
