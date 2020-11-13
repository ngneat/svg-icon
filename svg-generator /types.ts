export interface Config {
  srcFiles: string;
  outputDirectory: string;
  svgoConfig: object;
  prefix?: string;
  postfix?: string;
  dirName?: string;
}

export const defaults: Partial<Config> = {
  prefix: '',
  postfix: 'Icon',
  dirName: 'svg'
} as const;
