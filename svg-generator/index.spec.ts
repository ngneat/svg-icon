import mock from 'mock-fs';
import { createTypeFile } from './create-types';
import { createTree } from './tree';
import { defaults } from './types';

const srcPath = `src/assets/svg`;

describe('createTree', () => {
  it('should create the correct tree', () => {
    mock({
      [`${srcPath}/one.svg`]: '<svg>one</svg>',
      [`${srcPath}/two.svg`]: '<svg>two</svg>',
      [`${srcPath}/group`]: {
        'child.svg': `<svg>child</svg>`,
        'child2.svg': `<svg>child 2</svg>`,
      },
      [`${srcPath}/group-two`]: {
        'child-one.svg': `<svg>child</svg>`,
        'child-two.svg': `<svg>child 2</svg>`,
      },
    });

    const result = createTree(srcPath, `src/app/svg`, defaults);

    mock.restore();

    expect(result).toMatchSnapshot();
  });

  it('should create the type file', () => {
    expect(createTypeFile(['foo', 'bar', 'foo-bar'])).toMatchSnapshot();
  });
});
