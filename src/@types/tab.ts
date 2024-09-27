export type TTabTime = {
  time_second: number;
};

export type TTabTimingRandom = {
  max_second?: number;
  min_second?: number;
};

export type TTab = {
  tabId: string | number;
  hostname: string;
  full_url: string;
  path_name?: string;
  time: TTabTime;
  random: TTabTimingRandom | undefined;
};
