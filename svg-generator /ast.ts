import { createModifier, factory, NodeFlags, SyntaxKind } from 'typescript';
import kebabCase from 'lodash.kebabcase';
import camelcase from 'camelcase';

export function createStatement({ identifierName, svgContent, iconName }: any) {
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

export function createExportDeclaration({ identifierName, iconName }: any) {
  return factory.createExportDeclaration(
    undefined,
    undefined,
    false,
    factory.createNamedExports([factory.createExportSpecifier(
      undefined,
      factory.createIdentifier(identifierName)
    )]),
    factory.createStringLiteral(`./${iconName}`, true)
  );
}

export function createImportDeclaration({ identifierName, iconName }: any) {
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
        factory.createIdentifier(camelcase(arrayName)),
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
