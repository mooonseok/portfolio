import type { GroupId } from '@/constants/case';
import type { NavId } from '@/constants/navigation';

export interface NavItem {
  id: NavId;
  label: string;
  href: string;
}

export interface ContentsGroup {
  id: GroupId;
  label: string;
}

export interface GroupTag {
  num: string;
  label: string;
  id: GroupId;
}
