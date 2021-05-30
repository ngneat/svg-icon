import { optimize } from 'svgo';
import { basename, join } from 'path';
import { createPrinter, createSourceFile, EmitHint, factory, NewLineKind, ScriptKind, ScriptTarget, Statement } from 'typescript';
import { readdirSync, readFileSync } from 'fs-extra';
import { createArrayExport, createImportDeclaration, createStatement } from './ast';
import { Config } from './types';
import camelcase from 'camelcase';

const printer = createPrinter({
  newLine: NewLineKind.LineFeed,
});

const sourceFile = createSourceFile('generator.ts', '', ScriptTarget.Latest, false, ScriptKind.TS);

type VirtualFile = {
  path: string;
  content: string;
  name: string;
  identifierName: string;
}

export const INDEX = `__INDEX__`;

export function createTree(srcPath: string, outputPath: string, config: Omit<Config, 'srcPath' | 'outputPath'>): VirtualFile[] {
  const tree: VirtualFile[] = [];
  const result = readdirSync(srcPath, { withFileTypes: true });
  const plugins = config.svgoConfig?.plugins ?? [];

  for(const file of result) {

    if(file.isDirectory()) {
      const children = createTree(join(srcPath, file.name), join(outputPath, file.name), config);

      const exportDeclarations: Statement[] = [];
      const identifiers: string[] = [];

      for(const { identifierName, name } of children) {
        exportDeclarations.push(createImportDeclaration({ identifierName, iconName: name }));
        identifiers.push(identifierName);
      }

      exportDeclarations.push(createArrayExport(file.name, identifiers));
      const barrelFile = factory.updateSourceFile(sourceFile, exportDeclarations);

      tree.push(...children, {
        path: join(outputPath, file.name, `index.ts`),
        content: printer.printFile(barrelFile),
        identifierName: 'index',
        name: INDEX
      });

    } else {
      if(file.name.endsWith('.svg')) {
        const iconName = basename(file.name, '.svg');
        const path = join(outputPath, file.name).replace('.svg', '.ts');
        const identifierName = camelcase(`${config.prefix}-${iconName}-${config.postfix}`);
        const svgContent = readFileSync(join(srcPath, file.name)).toString();

        const statement = createStatement({
          svgContent: optimize(svgContent, { plugins }).data,
          iconName,
          identifierName,
        });

        tree.push({
          path,
          content: printer.printNode(EmitHint.Unspecified, statement, sourceFile),
          name: iconName,
          identifierName
        });
      }

    }
  }

  return tree;
}
