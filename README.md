# Site extractor

Extract metadata from URL

## Features extracted

- canonical url
- article (@mozilla/readability):
  - title
  - content
- main image
- thumbnail
- colors (ColorThief)
  - main color
  - color palette
- screenshot

## Installation

```
$ npm install
```

## Usage

### Command line

```
$ node index.js --url https://www.w3.org/ --output /tmp/output.json
```

### REST Api

```
$ node index.js --port 5000
```

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"url":"https://www.w3.org"}' \
  http://localhost:5000/
```
