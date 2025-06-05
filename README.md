# Transkribus Web Client

* branch "edition-eugen-huber" wurde von Transkribus entwickelt
* im branch "uzh-features" fügen wir unsere features hinzu. 
* via merge request wird uzh-features zu edition-eugen-huber gemerged
* branch ziviligesetzbuch unterstütz multi-language via vue i18n plugin.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### ESLint

We use [ES-Lint](https://eslint.org/) to achieve unified code-guidelines and a consistent codebase, which also helps us implement best-practices automatically. The style-guides and the individual rules are located in the ```.eslintrc.js``` file. 

As style-guides and code-guidelines, we use the Vue.Js [official style-guide](https://vuejs.org/v2/style-guide/) to lint the vue components and the [airbnb style-guide](https://github.com/airbnb/javascript) to lint Java-Script in general. 

#### Usage with VS-Code

When using VSCode, you should first install the [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). Then, you should configure your ```settings.json``` file to automatically lint your files when saving so that you don't have to lint every file manually. To do that, edit the following to your ```settings.json``` file 

```
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
 }
 ```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Documentation 

### Timeline 

We use a global vuex store to set the edition-variable. This decides which edition we are using and sets the corresponding links for the router. The edition names are in the events.json file and the edition-variable on the vuex store is set in the TimelineEvent.vue component.

### Color Codes
We apply the scss `lighten()` and `darken()` functions with a value of 25% to achieve the light and dark shades of the primary color. 

### Model 

In order to achieve variability for different editions, the text of several components has been placed in the model. In order for Vue.js to be able to render this text and its containing links as proper html elements, this specific structure of the respective parameters has to be followed: 

1. Every parameter is an array. 
2. Every element in the array is an object, containing the **title** and **text** fields. 
3. The **title** field should be used for headers of a section, if one is needed (like in the Privacy-part of the edition for example). It can also be left as an empty string if no header is needed. However, it needs to be specified, since no error-handling logic has been implemented yet. 
4. The **text** field is a 2-dimensional array, i.e. an array of arrays. 
5. Every array inside the upper **text** array represents a paragraph to be rendered in the component. It was defined as an array to be able to differentiate between text and links, which both have to be contained within the same paragraph. The text parts of a paragraph are represented as strings, while the links are represented as objects. 
6. There are two types of links, external and internal links. External links are used to route to other webpages (like UZH for example), while internal links route to other parts of the same webpage. Internal links shouldn't be used unless completely necessary, since most of them are dynamic, needing specific parameters that need to be set. However, if they are needed, the parameters defined in **router.js** should be used. 
7. The Home-Component and its respective parameter **homeText** are structured a little differently, since they won't be rendered in the Dynamic-Component. There, the array doesn't contain an object, but rather other arrays representing the paragraphs, since in the home-component no headers will be needed.  