# matter-yaml

**Canonical URL:** [https://alexstevovich.com/a/matter-yaml-nodejs](https://alexstevovich.com/a/matter-yaml-nodejs)  
**Software URL:** [https://midnightcitylights.com/software/matter-yaml-nodejs](https://midnightcitylights.com/software/matter-yaml-nodejs)

A Node.js package for parsing, serializing, and validating YAML front matter in text documents. This is useful for processing files like markdown documents that include YAML metadata in the front matter.

---

## Installation

```sh
npm install matter-yaml
```

## Example

```js
import { parse, serialize, validate } from 'matter-yaml';

// Example content with YAML front matter
const text = `---
title: "My Document"
author: "Alex Stevovich"
---
This is the content of the document.`;

// Parse front matter and content
const { data, content } = parse(text);
console.log(data); // { title: "My Document", author: "Alex Stevovich" }
console.log(content); // "This is the content of the document."

// Serialize data and content back into front matter format
const serializedText = serialize(data, content);
console.log(serializedText);

// Validate the front matter format
const isValid = validate(text);
console.log(isValid); // true or false
```

## API

### `parse(text)`

Parses YAML front matter from a string and returns an object containing the parsed data and the content.

| Parameter | Type   | Description                                        |
| --------- | ------ | -------------------------------------------------- |
| text      | string | The full text containing front matter and content. |

**Returns**: `{ data: object, content: string }`

Throws an error if the input is not a string or if the front matter format is invalid.

---

### `serialize(data, content, [options = {}])`

Serializes the data and content into a front matter formatted string.

| Parameter | Type   | Description                                     |
| --------- | ------ | ----------------------------------------------- |
| data      | object | The front matter YAML data.                     |
| content   | string | The document content.                           |
| options   | object | (Optional) The YAML dump configuration options. |

**Returns**: `string` - The formatted front matter and content.

Throws an error if data is not an object or content is not a string.

---

### `validate(text)`

Validates whether the given text contains properly formatted YAML front matter.

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| text      | string | The text to validate. |

**Returns**: `boolean` - `true` if the front matter is valid, `false` otherwise.

---

## Notes

- This package is useful for processing text files with YAML metadata in the front matter, often seen in markdown or YAML-based formats.
- Minimal and dependency-free.
- Can be used for various text processing, including document generation and static site generation.

## License

Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
