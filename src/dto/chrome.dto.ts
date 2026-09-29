import type { ReactNode, RefObject } from 'react';
import type { AriaCurrent } from '@/constants/aria';
import type { NavId } from '@/constants/navigation';
import type { NavItem } from '@/dto/navigation.dto';
import type { Contact } from '@/dto/site.dto';

export interface SiteHeaderProps {
  dark?: boolean;
  back?: boolean;
  current?: NavId;
  spy?: boolean;
}

export interface SiteHeaderViewProps {
  dark: boolean;
  back?: boolean;
  name: string;
  nav: ReactNode;
  menu: ReactNode;
}

export interface SiteHeaderNavProps {
  items: NavItem[];
  current?: NavId;
  spy?: boolean;
}

export interface SiteHeaderNavViewProps {
  items: NavItem[];
  activeId?: NavId;
  activeAria: AriaCurrent;
}

export interface MobileMenuProps {
  items: NavItem[];
  current?: NavId;
  contact: Contact;
}

export interface MobileMenuState {
  open: boolean;
  panelId: string;
  openMenu: () => void;
  close: () => void;
  btnRef: RefObject<HTMLButtonElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;
  panelRef: RefObject<HTMLDivElement | null>;
}

export interface MobileMenuEntry {
  item: NavItem;
  label: string;
  index: string;
  current: boolean;
}

export interface MobileMenuViewProps extends MobileMenuState {
  entries: MobileMenuEntry[];
  contact: Contact;
  hasContact: boolean;
}

export interface SiteFooterViewProps {
  name: string;
  email: string;
  github: string;
  contact: boolean;
}
