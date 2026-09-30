import ts from 'typescript';
import { ENUM_KEYS, RAW_TAGS } from './config.mjs';

export const parse = (text) =>
  ts.createSourceFile(
    'source.tsx',
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX
  );

export function regexRanges(text) {
  const source = parse(text);
  const ranges = new Map();
  const visit = (node) => {
    if (ts.isRegularExpressionLiteral(node))
      ranges.set(node.getStart(source), node.end);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return ranges;
}

export function syntaxRules(text, pure, allowRaw, allowLiteral) {
  const source = parse(text);
  const imports = new Map();
  const namespaces = new Set();
  const result = [];
  for (const node of source.statements) {
    if (!ts.isImportDeclaration(node) || node.moduleSpecifier.text !== 'react')
      continue;
    const clause = node.importClause;
    if (clause?.name) namespaces.add(clause.name.text);
    const bindings = clause?.namedBindings;
    if (bindings && ts.isNamespaceImport(bindings))
      namespaces.add(bindings.name.text);
    if (bindings && ts.isNamedImports(bindings))
      for (const item of bindings.elements)
        imports.set(item.name.text, item.propertyName?.text ?? item.name.text);
  }
  const add = (node, message) =>
    result.push([
      source.getLineAndCharacterOfPosition(node.getStart(source)).line + 1,
      message,
    ]);
  const nameOf = (node) =>
    ts.isIdentifier(node)
      ? imports.get(node.text)
      : ts.isPropertyAccessExpression(node) &&
          namespaces.has(node.expression.getText(source))
        ? node.name.text
        : undefined;
  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const name = nameOf(node.expression);
      if (
        pure &&
        name &&
        /^use[A-Z]/.test(name) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text !== name
      )
        add(node, `presentational file calls aliased hook ${name}`);
      if (
        !allowRaw &&
        name === 'createElement' &&
        node.arguments[0] &&
        ts.isStringLiteral(node.arguments[0]) &&
        RAW_TAGS.has(node.arguments[0].text)
      )
        add(node, 'raw createElement tag; use an atom primitive');
    }
    if (
      !allowLiteral &&
      ts.isBinaryExpression(node) &&
      ts.isStringLiteral(node.left) &&
      [
        ts.SyntaxKind.EqualsEqualsToken,
        ts.SyntaxKind.EqualsEqualsEqualsToken,
        ts.SyntaxKind.ExclamationEqualsToken,
        ts.SyntaxKind.ExclamationEqualsEqualsToken,
      ].includes(node.operatorToken.kind)
    ) {
      const key = ts.isPropertyAccessExpression(node.right)
        ? node.right.name.text
        : ts.isIdentifier(node.right)
          ? node.right.text
          : '';
      if (ENUM_KEYS.split('|').includes(key))
        add(
          node,
          'compares an enumerated value with a reversed string literal'
        );
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return result;
}
