## P2 reads

Available on: https://p2-reads.herokuapp.com/
obs: Since the application is unused for a while, its get unloaded from the server memory, so the first time that you will open the app wil take a little longer.

## Guilherme Malfatti - Udacity

The Readable project aims build a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

### Project Requirements

| Requirement | Description
| ------ | ------
| [REQ-001](#install) |  Application easy to install and start |
| [REQ-002](#readme) |  Application include README with clear installation and launch instructions |
| [REQ-003](#redux) | Application state managed by Redux |
| [REQ-004](#state) | The application state update correctly |
| [REQ-005](#posts) | The posts are listed correctly and have the desired functionality in a list view |
| [REQ-006](#users) | The users can add new post and comments on each one |
| [REQ-007](#edit) | The users can edit posts/comments |
| [REQ-008](#app) | The application is navigable |

## The following libraries are used in this project:

- **react**: [React](https://reactjs.org/)
- **lodash**: [Lodash](https://lodash.com/)
- **moment**: [Moment](http://momentjs.com/)
- **redux**: [Redux](https://redux.js.org/)

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and [Git](https://git-scm.com/) installed.

Follow the instructions to start the [API server](https://github.com/udacity/reactnd-project-readable-starter) locally.

```sh
$ git clone git@github.com:udacity/reactnd-project-readable-starter.git # or clone your own fork
$ cd reactnd-project-readable-starter/api-server
$ npm install
$ npm start
```

To get started right away, firts setup the environment variable (DOMAIN) to point to the API server locally and clone the repo:

```sh
export DOMAIN="localhost:3001"
```

```sh
$ git clone git@github.com:guilhermemalfatti/p2-reads.git # or clone your own fork
$ cd p2-reads
$ npm install
$ npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## References

For more information about using Node.js and React, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [React, a JavaScript library for building user interfaces](https://reactjs.org/tutorial/tutorial.html)
- [react-redux](https://redux.js.org/basics/usagewithreact)

## TODO
- Mechanism of error message
- Unit Tests (coverage > 80%)

