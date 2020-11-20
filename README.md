# FETCH TS TYPE

## Running fetch-type without installing

### Running fetch-type without the config file

```bash
npx @irfan7junior/fetch-type -n filename.ts -f folderpath -u some_url
```

### Running fetch-type with config file

```bash
npx @irfan7junior/fetch-type -c config.json
```

> This should be the config.json

```json
{
  "url": "URL",
  "params": {
    "apikey": "SOMEKEY",
    "amount": 15
  },
  "folder": "src/components/@interfaces",
  "filename": "IInterface.ts"
}
```

## Running fetch-type as a dev-dependency

> Create an npm script

```npm
fetch-type with-the-flags
```

## All flags

- -f, --folder
- -n, --filename
- -u, --url
- -c, --config
