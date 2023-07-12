import glob from 'glob';
import { join, resolve } from 'path';
import { outputFileSync, unlinkSync } from 'fs-extra';
import { GeneratorConfig, defaults } from './types';
import { createTree, INDEX } from './tree';
import { createTypeFile } from './create-types';

export function generateSVGIcons(config: GeneratorConfig | null) {
  if (!config) {
    console.log(`Can't find a config object!`);

    process.exit();
  }

  const mergedConfig: Required<GeneratorConfig> = { ...defaults, ...config };

  removeOldIcons(resolve(mergedConfig.outputPath));

  const virtualTree = createTree(mergedConfig.srcPath, mergedConfig.outputPath, mergedConfig);
  let names: string[] = [];

  if (mergedConfig.rootBarrelFile) {
    const allExports = virtualTree
      .filter(({ name }) => name !== INDEX)
      .map(({ content }) => content)
      .join('\n\n');
    outputFileSync(join(mergedConfig.outputPath, `${mergedConfig.rootBarrelFileName}.ts`), allExports, {
      encoding: 'utf-8',
    });

    names = virtualTree.filter(({ name }) => name !== INDEX).map(({ name }) => name);
  } else {
    virtualTree.forEach(({ path, content, name }) => {
      name !== INDEX && names.push(name);
      outputFileSync(path, content, { encoding: 'utf-8' });
    });
  }

  const typeFilePath = resolve(process.cwd(), 'node_modules', '@ngneat', 'svg-icon', 'lib', 'types.d.ts');

  outputFileSync(typeFilePath, createTypeFile(names), {
    encoding: 'utf-8',
  });

  console.log(`🚀 SvgIcons type was updated successfully`);
}

function removeOldIcons(outputPath: string) {
  glob.sync(`${outputPath}/**/*.ts`).forEach((file) => unlinkSync(file));
}
