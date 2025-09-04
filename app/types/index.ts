export interface KeyUsage {
  key: string;
  routes: string[];
}

export interface DataFile {
  keyUsage: KeyUsage[];
}

export interface KeyUsageWithSource extends KeyUsage {
  source: string;
}
