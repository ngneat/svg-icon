import camelcase from 'camelcase';
import { readFileSync } from 'fs';
import { outputFileSync, removeSync } from 'fs-extra';
import glob from 'glob';
import { basename, extname, resolve } from 'path';
import SVGO from 'svgo';
import {
  createPrinter,
  createSourceFile,
  EmitHint,
  NewLineKind,
  ScriptKind,
  ScriptTarget,
  Statement,
  updateSourceFileNode,
} from 'typescript';

import { createArrayExport, createExportDeclaration, createImportDeclaration, createStatement } from './ast';
import { Config, defaults } from './types';

export function generateSVGIcons(config: Config | null) {
  if (!config) {
    console.log(`Cant find a config object!`);

    process.exit();
  }

  const { outputPath, prefix, postfix, svgoConfig, srcPath, exportable }: Config = { ...defaults, ...config };

  const rootPath = resolve(outputPath);
  
  removeOldIcons(resolve(outputPath));

  const printer = createPrinter({
    newLine: NewLineKind.LineFeed,
  });

  const sourceFile = createSourceFile('generator.ts', '', ScriptTarget.Latest, false, ScriptKind.TS);

  const baseExportDeclarations: Statement[] = [];

  const generateIcons = function generateIcons(srcPath: string, outputPath: string, isDir = false, isRoot = false) {
    const dirName = getDirName(srcPath);
    const filesList = glob.sync(`${srcPath}/*`);
    const exportDeclarations: Statement[] = [];

    let fileIndex = 0;
    const identifiers: string[] = [];

    filesList.forEach(async (path) => {
      const extension = extname(path);
      const filesSize = filesList.filter((v) => !!extname(v)).length;

      // It means it's a file
      if (!!extension) { 
        if (extension === '.svg') {
          const svgContent = readFileSync(path, { encoding: 'utf8' });
          const optimizedContent = await new SVGO(svgoConfig).optimize(svgContent);
          fileIndex++;

          const iconName = basename(path, extension);
          const identifierName = camelcase(`${prefix}-${iconName}-${postfix}`);

          const statement = createStatement({
            svgContent: optimizedContent.data,
            iconName,
            identifierName,
          });

          const tsCode = printer.printNode(EmitHint.Unspecified, statement, sourceFile);
          outputFileSync(`${outputPath}/${iconName}.ts`, tsCode, { encoding: 'utf8' });

          if (isDir) {
            exportDeclarations.push(createImportDeclaration({ identifierName, iconName }));
            identifiers.push(identifierName);

            if (exportable) {
              const dirName = outputPath.replace(rootPath, '');
              baseExportDeclarations.push(createExportDeclaration({ identifierName, iconName, dirName }));
              exportDeclarations.push(createExportDeclaration({ identifierName, iconName }));
            }
          } else {
            exportDeclarations.push(createExportDeclaration({ identifierName, iconName }));
          }

          if (fileIndex === filesSize && isDir) {
              exportDeclarations.push(createArrayExport(dirName, identifiers));
              const barrelFile = updateSourceFileNode(sourceFile, exportDeclarations);
              outputFileSync(`${outputPath}/index.ts`, printer.printFile(barrelFile), { encoding: 'utf8' });
          }
        }
      } else {
        // Otherwise it's a directory
        const srcPath = path;
        const dirName = getDirName(srcPath);
        const output = resolve(outputPath, dirName);

        generateIcons(srcPath, output, true, false);
      }

      if (isRoot && exportable) {
        const baseBarrelFile = updateSourceFileNode(sourceFile, baseExportDeclarations);
        outputFileSync(`${outputPath}/index.ts`, printer.printFile(baseBarrelFile), { encoding: 'utf8' });
      }
    });
  };

  generateIcons(srcPath, resolve(outputPath), false, true);
}

function getDirName(srcPath: string) {
  return srcPath.substring(srcPath.lastIndexOf('/') + 1);
}

function removeOldIcons(outputPath: string) {
  glob.sync(`${outputPath}/**/*.ts`).forEach((file) => removeSync(file));
}
