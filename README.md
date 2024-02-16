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

  - The navigation when the login fails occurs and also there are some unnecessary api calls that fails because there's no token.
  - Having layouts instead of pages.
  - The repeated code like header components in every layout page.
  - Not having a proper error handling in the frontend when the status code is different from 200.

- How you would make this application maintainable and scalable. Write here all the steps you would take.
  - Turn this monorepo in a micro-frontend architecture to enable all teams collaborate in separate projects with separate dependencies.
  - Convert the design primitive components like button, inputs, etc. in a private npm package and also a storybook to test/visit them.
  - Use a library like React Query or SWR to handle HTTP requests, cache and state management.
  - Use a e2e testing library like Cypress/Playwright to test e2e features.
  - Setup git hooks to run tests and linting before pushing code.
  - Use a CI/CD pipeline like Jenkis/Travis to deploy the application in a cloud provider like AWS, GCP, Azure, etc.

## Test submission

Please, submit this test as a new repository (a fork or a new one) in any free platform you want (bitbucket, gitlab, github, ..)
