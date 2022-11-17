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
    factory.createTypeAliasDeclaration(
      [factory.createModifier(SyntaxKind.ExportKeyword), factory.createModifier(SyntaxKind.DeclareKeyword)],
      factory.createIdentifier('SvgIcons'),
      undefined,
      factory.createUnionTypeNode(
        names.map((name) => {
          return factory.createLiteralTypeNode(factory.createStringLiteral(name, true));
        })
      )
    ),
  ];

  const file = factory.updateSourceFile(sourceFile, block);

  return printer.printFile(file);
}
