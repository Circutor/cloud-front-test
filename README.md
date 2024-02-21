## Circutor Technical Test

This is a very simple application that shows some energy data Helsinki buildings from 1st January 2021 to around 28 Feb 2022.

It has an API written in GO and a frontend written in React. It uses the UI library ant design (https://ant.design/)

## Launch

Clone/Fork the repo with git clone <url>
Build the docker containers and launch the project with:
```sh
docker-compose up --build
```

The api is accessible on `http://localhost:1234/docs/index.html`
The frontend is accessible on `localhost:3001`

## Tasks

### Programming
- Implement an error message when login fails
- Implement a small test for this new feature
- Change the border radius of all components (button, input, ...)
- Change the default color from blue to green

Feel free to implement any other improvement as long as you write a test for it.

### Writing (modify this readme)
- Write in this all red flags that you find in the code. Any examples that would stop a code review. If you want to fix some of them, go on.

  - App.js and App.jsx are duped files. App.js does not hold an import to its App.css file. CRA (create-react-app), which uses react-scripts under the hood, has a very specific way of resolving files. [The order can be checked here](https://github.com/facebook/create-react-app/blob/0a827f69ab0d2ee3871ba9b71350031d8a81b7ae/packages/react-scripts/config/paths.js#L34C1-L34C6)
    ```javascript
    const moduleFileExtensions = [
      'web.mjs',
      'mjs',
      'web.js',
      'js',
      'web.ts',
      'ts',
      'web.tsx',
      'tsx',
      'json',
      'web.jsx',
      'jsx',
    ];
    ```
    So `App.js` will be resolved first before `App.jsx`. In any case, `App.css` does seem like a [template file from CRA](https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/src/App.css), which is unused. This is a red flag since App styles will not be applied (although not needed) and, obviously, having duped files is not intended. Also, although CRA doesn't care, files with JSX use the `.jsx` extension by convention.
    
    **SOLUTION**: Remove `App.js` and `App.css` and rename all .js files that use the JSX syntax to .jsx.

  - Non throttling resize events. Callback will be called each time the viewport is resized, which is a performance issue.

    **FOUND IN**: web/src/layouts/buildings_metrics.jsx(23)

    **SOLUTION**: Throttle resize events.

  - Navigating to current path in the history stack just after pushing it. It's a noop, doesn't do anything.

      ```javascript
      navigate("/login");
      navigate(0);
      ```

    **FOUND IN**: web/src/layouts/buildings_metrics.jsx(39-85)

    **SOLUTION**: Remove `navigate(0)` lines.

  - Variable shadowing. State setter `setInterval` shadows `window`'s `setInterval` API.

    **FOUND IN**: web/src/layouts/buildings_metrics.jsx(20)

    **SOLUTION**: Rename `setInterval` to `setDateInterval`
  - Docker is using 13.12.0 node version. [react-scripts@5.0.1 requires node >= 14.0.0](https://github.com/facebook/create-react-app/blob/0a827f69ab0d2ee3871ba9b71350031d8a81b7ae/packages/react-scripts/package.json#L12). Also, `react-scripts@3.4.1` is being added, not respecting the dependency tree.

    **SOLUTION**: Use LTS node version and remove react-scripts installation.

  - All API calls are pointing to the current window.origin (relative paths like `/login`), which is wrong since the backend is running in port 1234.

    **FOUND IN**: All of web/src/api/*

    **SOLUTION**: Point to http://localhost:1234/ instead of window.origin. Set endpoints by environment variables.

  - Accessing token with `token`, not `Token`.

    **FOUND IN**: web/src/layouts/login.jsx(24)

    **SOLUTION**: Rename to `Token`.

  - Not allowed Authorization header.

    **FOUND IN**: api/main.go(77)

- How you would make this application maintainable and scalable. Write here all the steps you would take.

  - I've found the declarative paradigm to be the best way to keep a codebase maintainable. Abstracting away every piece of logic into reusable components/hooks avoids duplication of code and enforces both Single Responsibility and Single Source of Truth principles.
  - Reactive global state pattern like Redux, at least for user auth, and inject each reducer into the store dynamically, or inject all reducers on first load, depends on how we want to scale. I'd just use the `redux` library and build all react bindings on top, since `useSyncExternalStore` already provides a way to sync an observer with react without tearing.
  - Provide just `login` and `register` pages and lazily load the rest. Make use of react's `lazy` and `Suspense`.
  - Add localization (i18n).
  - Move to a more robust styling solution, like preprocessors (`SASS`) or css-in-js (`styled-components`).
  - Add pagination to all the tables.

## Test submission

Please, submit this test as a new repository (a fork or a new one) in any free platform you want (bitbucket, gitlab, github, ..)
