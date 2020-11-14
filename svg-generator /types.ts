export interface Config {
  srcPath: string;
  outputPath: string;
  svgoConfig: object;
  prefix?: string;
  postfix?: string;
}

export const defaults: Partial<Config> = {
  prefix: '',
  postfix: 'Icon',
} as const;
