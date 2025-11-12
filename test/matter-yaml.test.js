import { describe, test, expect } from 'vitest';
import { parse, serialize, validate } from '../src/index.js';

describe('matter-yaml', () => {
    const validYaml = `---
title: "Hello World"
tags:
  - yaml
  - front-matter
published: true
---
This is the document content.`;

    const validYamlWithoutContent = `---
title: "Only YAML"
tags:
  - example
published: false
---`;

    const invalidYaml = `---
title: "Hello World"
tags:
  - yaml
  - front-matter
published: true
invalid_yaml: !!someinvalid
---
This is the document content.`;

    const noFrontMatter = `This is just content without front matter.`;

    const malformedFrontMatter = `---
title: "Hello
tags:
  - missing
  - quote
published: true
---
Oops, this YAML is malformed.`;

    test('parse() should extract front matter and content correctly', () => {
        const result = parse(validYaml);
        expect(result).toEqual({
            data: {
                title: 'Hello World',
                tags: ['yaml', 'front-matter'],
                published: true,
            },
            content: 'This is the document content.',
        });
    });

    test('parse() should handle front matter without content', () => {
        const result = parse(validYamlWithoutContent);
        expect(result).toEqual({
            data: {
                title: 'Only YAML',
                tags: ['example'],
                published: false,
            },
            content: '',
        });
    });

    test('parse() should throw an error on invalid YAML syntax', () => {
        expect(() => parse(invalidYaml)).toThrowError(/YAML Parsing Error:/);
    });

    test('parse() should throw an error if no front matter is found', () => {
        expect(() => parse(noFrontMatter)).toThrowError(
            /Invalid front matter format/,
        );
    });

    test('parse() should throw an error if front matter is malformed', () => {
        expect(() => parse(malformedFrontMatter)).toThrowError(
            /YAML Parsing Error:/,
        );
    });

    test('serialize() should generate a valid front matter string', () => {
        const data = {
            title: 'Serialized YAML',
            tags: ['test', 'serialization'],
            published: true,
        };
        const content = 'This is a test document.';
        const result = serialize(data, content);

        expect(result).toBe(
            `---\ntitle: Serialized YAML\ntags:\n  - test\n  - serialization\npublished: true\n---\nThis is a test document.`,
        );
    });

    test('serialize() should throw an error when data is not an object', () => {
        expect(() => serialize(null, 'Some content')).toThrowError(
            /serialize expected an object/,
        );
        expect(() => serialize('invalid', 'Some content')).toThrowError(
            /serialize expected an object/,
        );
    });

    test('serialize() should throw an error when content is not a string', () => {
        expect(() => serialize({}, null)).toThrowError(
            /serialize expected a string/,
        );
        expect(() => serialize({}, 123)).toThrowError(
            /serialize expected a string/,
        );
    });

    test('validate() should return true for valid front matter', () => {
        expect(validate(validYaml)).toBe(true);
    });

    test('validate() should return false for invalid front matter', () => {
        expect(validate(invalidYaml)).toBe(false);
        expect(validate(malformedFrontMatter)).toBe(false);
        expect(validate(noFrontMatter)).toBe(false);
    });

    test('validate() should return false for empty input', () => {
        expect(validate('')).toBe(false);
        expect(validate(null)).toBe(false);
        expect(validate(undefined)).toBe(false);
    });
});
