# usfm2json 0.2.0
Convert Bibles in USFM format to JSON
----

## CSV

```csv
01O	1	1		10	In the beginning God created the heavens and the earth.
```

## JSON

```json
{
  "chapter":1,
  "verse":1,
  "text":"In the beginning God created the heavens and the earth.",
  "translation_id":"ASV",
  "book_id":"Gen",
  "book_name":"Genesis"
}
```

## Supported translations

### English

#### American Standard Version (ASV)
```
node convert-asv.js
```

#### King James Version (KJV)
```
node convert-kjv.js
```

### Russian

#### Russian Synodal Translation (RST)
```
node convert-rst.js
```

#### Contemporary Russian Translation of the Bible (CRTB)
```
node convert-crtb.js
```

#### The New Russian Translation (NRT)
```
node convert-nrt.js
```

## Development

### Prerequisites
- [Node.js](https://www.nodejs.org)

### Setup
> npm install
