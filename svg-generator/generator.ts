import glob from 'glob';
import { resolve } from 'path';
import { unlinkSync, writeFileSync } from 'fs';
import { Config, defaults } from './types';
import { createTree } from './tree';

export function generateSVGIcons(config: Config | null) {
  if(!config) {
    console.log(`Can't find a config object!`);

    process.exit();
  }

  const mergedConfig: Config = { ...defaults, ...config };

  removeOldIcons(resolve(mergedConfig.outputPath));

  const virtualTree = createTree(mergedConfig.srcPath, mergedConfig.outputPath, mergedConfig);

  virtualTree.forEach(({ path, content }) => {
    writeFileSync(path, content, { encoding: 'utf-8' })
  });
}

function removeOldIcons(outputPath: string) {
  glob.sync(`${outputPath}/**/*.ts`).forEach((file) => unlinkSync(file));
}
