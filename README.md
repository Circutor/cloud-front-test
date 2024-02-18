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

    **SOLUTION**: Remove line 29.

  - Variable shadowing. State setter `setInterval` shadows `window`'s `setInterval` API.

    **FOUND IN**: web/src/layouts/buildings_metrics.jsx(20)

    **SOLUTION**: Rename `setInterval` to `setDateInterval`
  - Unnecessary jwt decoding.

    **FOUND IN**: web/src/api/auth.js(28)

    **SOLUTION**: Remove line 28.

- How you would make this application maintainable and scalable. Write here all the steps you would take.

## Test submission

Please, submit this test as a new repository (a fork or a new one) in any free platform you want (bitbucket, gitlab, github, ..)
