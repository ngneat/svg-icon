import camelcase from 'camelcase';
import kebabCase from 'lodash.kebabcase';
import { createModifier, factory, NodeFlags, SyntaxKind } from 'typescript';

interface Base {
  identifierName: string;
  iconName: string;
  dirName?: string;
}

export function createStatement({ identifierName, svgContent, iconName }: Base & { svgContent: string }) {
  return factory.createVariableStatement(
    [createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [
        factory.createVariableDeclaration(
          factory.createIdentifier(identifierName),
          undefined,
          undefined,
          factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier('data'),
                factory.createNoSubstitutionTemplateLiteral(svgContent)
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier('name'),
                factory.createStringLiteral(kebabCase(iconName), true)
              )
            ],
            true
          )
        )
      ],
      NodeFlags.Const
    )
  );
}

export function createExportDeclaration({ identifierName, iconName, dirName = '' }: Base) {
  return factory.createExportDeclaration(
    undefined,
    undefined,
    false,
    factory.createNamedExports([factory.createExportSpecifier(
      undefined,
      factory.createIdentifier(identifierName)
    )]),
    factory.createStringLiteral(`.${dirName}/${iconName}`, true)
  );
}

export function createImportDeclaration({ identifierName, iconName }: Base) {
  return factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([factory.createImportSpecifier(
        undefined,
        factory.createIdentifier(identifierName)
      )])
    ),
    factory.createStringLiteral(
      `./${iconName}`,
      true
    )
  );

}

export function createArrayExport(arrayName: string, identifiers: string[]) {
  return factory.createVariableStatement(
    [createModifier(SyntaxKind.ExportKeyword)],
    factory.createVariableDeclarationList(
      [factory.createVariableDeclaration(
        factory.createIdentifier(camelcase(`${arrayName}Icons`)),
        undefined,
        undefined,
        factory.createArrayLiteralExpression(
          identifiers.map(id => factory.createIdentifier(id)),
          false
        )
      )],
      NodeFlags.Const
    )
  );
}
