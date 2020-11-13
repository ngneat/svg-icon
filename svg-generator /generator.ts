import glob from 'glob';
import camelcase from 'camelcase';
import SVGO from 'svgo';
import { readFileSync } from 'fs';
import { basename, extname, resolve } from 'path';
import { createPrinter, createSourceFile, EmitHint, NewLineKind, ScriptKind, ScriptTarget, Statement, updateSourceFileNode } from 'typescript';
import { mkdirpSync, outputFileSync, removeSync } from 'fs-extra';
import { createArrayExport, createExportDeclaration, createImportDeclaration, createStatement } from './ast';
import { Config, defaults } from './types';

export default function run(config: Config | null) {

  if(!config) {
    console.log(`Cant find a config object!`);

    process.exit();
  }

  const {
    outputDirectory,
    dirName: rootDirName,
    prefix,
    postfix,
    svgoConfig,
    srcFiles
  }: Config = { ...defaults, ...config };
  const rootDirPath = resolve(outputDirectory, rootDirName!);

  removeSync(rootDirPath);
  mkdirpSync(rootDirPath);

  const printer = createPrinter({
    newLine: NewLineKind.LineFeed
  });

  const sourceFile = createSourceFile(
    'generator.ts',
    '',
    ScriptTarget.Latest,
    false,
    ScriptKind.TS
  );

  const generateIcons = function generateIcons(iconsPath: string, dirName = '', isDir = false) {
    const filesList = glob.sync(`${iconsPath}/*`);
    const exportDeclarations: Statement[] = [];
    const rootDirPath = resolve(outputDirectory, rootDirName!, dirName!);
    let fileIndex = 0;
    const identifiers: string[] = [];

    filesList.forEach(async (path) => {
      const extension = extname(path);
      const filesSize = filesList.filter(v => !!extname(v)).length;

      // It means it's a file
      if(!!extension) {
        const svgContent = readFileSync(path, { encoding: 'utf8' });
        const optimizedContent = await new SVGO(svgoConfig).optimize(svgContent);
        fileIndex++;

        const iconName = basename(path, extension);
        const identifierName = camelcase(`${prefix}-${iconName}-${postfix}`);

        const statement = createStatement({
          svgContent: optimizedContent.data,
          iconName,
          identifierName
        });

        const tsCode = printer.printNode(EmitHint.Unspecified, statement, sourceFile);
        outputFileSync(`${rootDirPath}/${iconName}.ts`, tsCode, { encoding: 'utf8' });

        if(isDir) {
          exportDeclarations.push(createImportDeclaration({ identifierName, iconName }));
          identifiers.push(identifierName);
        } else {
          exportDeclarations.push(createExportDeclaration({ identifierName, iconName }));
        }

        if(fileIndex === filesSize) {
          if(isDir) {
            exportDeclarations.push(createArrayExport(dirName, identifiers));
          }
          const barrelFile = updateSourceFileNode(sourceFile, exportDeclarations);
          outputFileSync(`${rootDirPath}/index.ts`, printer.printFile(barrelFile), { encoding: 'utf8' });
        }
      } else {
        // Otherwise it's a directory
        const dirName = path.substring(path.lastIndexOf('/') + 1);
        generateIcons(path, dirName, true);
      }
    });

  };

  generateIcons(srcFiles);

}



