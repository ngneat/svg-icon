import glob from 'glob';
import { join, resolve } from 'path';
import { outputFileSync, unlinkSync } from 'fs-extra';
import { Config, defaults } from './types';
import { createTree, INDEX } from './tree';

export function generateSVGIcons(config: Config | null) {
  if(!config) {
    console.log(`Can't find a config object!`);

    process.exit();
  }

  const mergedConfig: Config = { ...defaults, ...config };

  removeOldIcons(resolve(mergedConfig.outputPath));

  const virtualTree = createTree(mergedConfig.srcPath, mergedConfig.outputPath, mergedConfig);

  if(mergedConfig.rootBarrelFile) {
    const allExports = virtualTree.filter(({ name }) => name !== INDEX).map(({ content }) => content).join('\n\n');
    outputFileSync(join(mergedConfig.outputPath, `${mergedConfig.rootBarrelFileName}.ts`), allExports, { encoding: 'utf-8' });
  } else {
    virtualTree.forEach(({ path, content }) => {
      outputFileSync(path, content, { encoding: 'utf-8' })
    });
  }

}

function removeOldIcons(outputPath: string) {
  glob.sync(`${outputPath}/**/*.ts`).forEach((file) => unlinkSync(file));
}
