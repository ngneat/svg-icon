export interface Config {
  srcPath: string;
  outputPath: string;
  svgoConfig: { plugins: any[] };
  prefix?: string;
  postfix?: string;
  rootBarrelFile?: boolean;
  rootBarrelFileName?: string;
  typesPath?: string;
}

export const defaults: Config = {
  prefix: '',
  postfix: 'Icon',
  svgoConfig: { plugins: [] },
  srcPath: '',
  outputPath: '',
  rootBarrelFile: false,
  rootBarrelFileName: 'index',
  typesPath: './src',
};
