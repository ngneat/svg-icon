import {
  createPrinter,
  NewLineKind,
  createSourceFile,
  ScriptTarget,
  ScriptKind,
  factory,
  NodeFlags,
  SyntaxKind,
} from 'typescript';

const printer = createPrinter({
  newLine: NewLineKind.LineFeed,
});

const sourceFile = createSourceFile('types.ts', '', ScriptTarget.Latest, false, ScriptKind.TS);

export function createTypeFile(names: string[]) {
  const block = [
    factory.createExportDeclaration(undefined, false, factory.createNamedExports([]), undefined, undefined),
    factory.createModuleDeclaration(
      [factory.createModifier(SyntaxKind.DeclareKeyword)],
      factory.createIdentifier('global'),
      factory.createModuleBlock([
        factory.createInterfaceDeclaration(undefined, factory.createIdentifier('SvgIcons'), undefined, undefined, [
          factory.createPropertySignature(
            undefined,
            factory.createIdentifier('icons'),
            undefined,
            factory.createUnionTypeNode(
              names.map((name) => {
                return factory.createLiteralTypeNode(factory.createStringLiteral(name, true));
              })
            )
          ),
        ]),
      ]),
      NodeFlags.ExportContext | NodeFlags.GlobalAugmentation | NodeFlags.ContextFlags
    ),
  ];

  const file = factory.updateSourceFile(sourceFile, block);

  return printer.printFile(file);
}
