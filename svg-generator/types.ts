export interface Config {
  srcPath: string;
  outputPath: string;
  svgoConfig: { plugins: any[]};
  prefix?: string;
  postfix?: string;
}

export const defaults: Config = {
  prefix: '',
  postfix: 'Icon',
  svgoConfig: { plugins: [] },
  srcPath: '',
  outputPath: ''
};
