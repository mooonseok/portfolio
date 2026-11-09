import type { OrbitSkin } from '@/constants/orbit';

export interface ActivityCommit {
  date: string;
  title: string;
}

export interface RepoActivity {
  name: string;
  private: boolean;
  count: number;
  last: string;
  commits: ActivityCommit[];
}

export interface ActivitySnapshot {
  asOf: string;
  live: boolean;
  repos: RepoActivity[];
}

export interface ActivityTopic {
  title: string;
  sub: string;
  skin: OrbitSkin;
  tag?: string;
}

export interface ActivityConfig {
  owner: string;
  exclude: string[];
  hideCommits: string[];
  parts: Record<string, string>;
  topics: Record<string, ActivityTopic>;
  fallbackSkin: OrbitSkin;
}

export interface ActivityRepoLink {
  name: string;
  part: string | null;
  href: string | null;
}

export interface ActivityProjectCommit extends ActivityCommit {
  part: string | null;
}

export interface ActivityProject {
  key: string;
  title: string;
  sub: string;
  skin: OrbitSkin;
  tag: string | null;
  count: number;
  last: string;
  private: boolean;
  repos: ActivityRepoLink[];
  commits: ActivityProjectCommit[];
}
