import kebabCase from 'lodash.kebabcase';
import { factory, NodeFlags, SyntaxKind } from 'typescript';
import camelcase from 'camelcase';

interface Base {
  identifierName: string;
  iconName: string;
}

// export const eyeSlashIcon = {
//   data: ``,
//   name: 'eye-slash'
// };
export function createStatement({ identifierName, svgContent, iconName }: Base & { svgContent: string }) {
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
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

// import { eyeSlashIcon } from './eye-slash';
export function createImportDeclaration({ identifierName, iconName }: Base) {
  return factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([factory.createImportSpecifier(
        false,
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

// export const authIcons = [eyeSlashIcon, eyeIcon, googleLogoIcon];
export function createArrayExport(arrayName: string, identifiers: string[]) {
  return factory.createVariableStatement(
    [factory.createModifier(SyntaxKind.ExportKeyword)],
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
