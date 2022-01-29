# React Localization Plugin

## Installation

Clone this repo in your favourite folder

## Setup

```js
// Langs
import ENLangJSON from "app/assets/lang/en.json";
import RULangJSON from "app/assets/lang/ru.json";
// Controller
import Localization from "plugins/react-plugin-localization/controller";

// Add languages
Localization.add("en", ENLangJSON);
Localization.add("ru", RULangJSON);
// Set default language
Localization.setDefault("en");
```

Declare explicit language type (_better to use default language_) to have suggestions, when selecting

```ts
// Declare explicit language type
type DefaultLang = typeof ENLangJSON;
declare module "plugins/react-plugin-localization" {
  interface LocalizationJSONRaw extends DefaultLang {}
}
```

## Usage

```ts
// Methods of Localization

// Use it to get current language pack, however may return undefined
public static get(): LocalizationJSON | undefined
// Use it to change current language
public static transit(lang: string)
// Use it to listen on transition
public static onTransition(listener: () => void) // returns callback to remove the listener
```

You should use these utils, they will help you always get object. They also give you `selector` and take care if there is no such `selector`

```ts
// Utility
const ll = Localize(ll => ll);
ll.lang; // English

// React hook
const ll = useLocalization(ll => ll);
ll.lang; // English
```
