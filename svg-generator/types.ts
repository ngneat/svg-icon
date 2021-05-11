export interface Config {
  srcPath: string;
  outputPath: string;
  svgoConfig: object;
  exportable?: boolean;
  prefix?: string;
  postfix?: string;
}

export const defaults: Partial<Config> = {
  prefix: '',
  postfix: 'Icon',
} as const;
