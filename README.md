## Little Pay

A small implamentation of deposits, withdrawals and transfers using node and TS.
And the app is structured in a simple busness domain mindset, composed by
**balance** and **event**. Things there are common between the domains must stay
up on the **source(src)** directory.

## The stack:

### Structural:

- Node
- Express
- Typescript

### Tooling:

- Eslint
- Prettier
- Conventional commits
- Husky

### Running the app

To run the app you need to:

- Run the preserve script: `npm run preserve`
- Run the serve script which already provides hot reload: `npm run serve`
- The application will be served at `localhost:3000`

There are also scripts for linting:

- `npm run lint`
- `npm run lint-and-fix` (this performs file changes)

### Conventional commits

Made by following
[karma commit](http://karma-runner.github.io/6.3/dev/git-commit-msg.html)
principles
