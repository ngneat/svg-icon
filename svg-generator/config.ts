export interface GeneratorConfig {
  srcPath: string;
  outputPath: string;
  svgoConfig: { plugins: any[] };
  prefix?: string;
  postfix?: string;
  rootBarrelFile?: boolean;
  rootBarrelFileName?: string;
  invalidCharReplacer?: (invalidChar: string) => string;
}

export const defaultConfig: Required<GeneratorConfig> = {
  prefix: '',
  postfix: 'Icon',
  svgoConfig: { plugins: [] },
  srcPath: '',
  outputPath: '',
  rootBarrelFile: false,
  rootBarrelFileName: 'index',
  invalidCharReplacer: () => '$'
};
