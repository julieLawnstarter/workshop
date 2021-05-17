# Writing an automation script using Standalone Mode

After we have setup everything to automate Chrome on our machine, let's write our first automated script. The objective is as follows: write a simple Node.js script that does the following things:

1. Open the Chrome browser
2. Go to the following page: [http://todomvc.com/examples/vue/](http://todomvc.com/examples/vue/)
3. Enter 3 items into the ToDo list
4. Mark the second item as completed
5. Print out the amount of items left

In order to get started navigate into the project directory you have created in [Chapter 1](./chapter1.md):

```sh
$ cd ~/webdriverio-hands-on
```

Then open your IDE and create file that we call `test.js`. Next step is to init an NPM project so that we can store the dependency that we need to the length of the course:

```sh
$ npm init -y
```

Next, install the WebdriverIO NPM [package](https://www.npmjs.com/package/webdriverio):

```sh
npm install --save-dev webdriverio
```

In your `test.js` file start writing the basic setup. I recommend to leverage the `async/await` functionality of Node.js that allows you to handle async operations in Node. Since every command is an asynchronous HTTP request to the browser driver, we have to make sure that we handle these async operations properly. You can use the following basic setup:

```js
const { remote } = require("webdriverio");

let browser;

(async () => {
  browser = await remote({
    capabilities: {
      browserName: "chrome",
    },
  });

  // add your automation code here
  // ...

  await browser.deleteSession();
})().catch(async (e) => {
  console.error(e);

  // close browser if something in our code went wrong
  await browser.deleteSession();
});
```

You should be able to run the script now by calling:

```sh
$ node test.js
```

This script now should open and close the browser again. You can now work on the assignment to create an automation script that does the steps outlined at the top of this chapter. You find all commands that are available in WebdriverIO in the [API docs](https://webdriver.io/docs/api.html).

**Note:** All code examples in the API docs assume your are running the WDIO testrunner using synchronous commands. This exercise is running WebdriverIO as standalone version. Synchronous commands are not supported here. Ensure that call every command with the `await` operator so that [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) are being resolved properly. You can read more about different modes and setup types of WebdriverIO [in the docs](https://webdriver.io/docs/setuptypes.html).

## Extra #1

Sending many WebDriver requests can be expensive especially if you use a cloud vendor like Sauce Labs where you have to connect with a server in the cloud. Single WebDriver calls can have latencies of multiple hundreds of milliseconds. In order to keep the test execution time low, it is recommended to keep the number of WebDriver requests small.

To speed up the test with our current example try to send all 3 Todo items with one single WebDriver call.

## Extra #2

WebdriverIO allows to automate the browser using a different protocol called [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/). You can switch to that by installing the [`devtools`](https://www.npmjs.com/package/devtools) NPM package:

```sh
$ npm i devtools
```

And setting the option `automationProtocol` to `'devtools'`:

```js
const browser = await remote({
  automationProtocol: "devtools",
  capabilities: {
    browserName: "chrome",
  },
});
```

You can then interact with the browser using the [WebdriverIO API](https://webdriver.io/docs/api.html) as well as the [Puppeteer](https://pptr.dev/) framework.

**Task:** run WebdriverIO using the `devtools` automation protocol and pre-populate the local storage with items so that if you open the page it should have already have 3 ToDos stored. The local storage key for these items is `todos-vuejs` and should contain a list like:

```json
[
  {
    "id": 1,
    "title": "Foo",
    "completed": false
  },
  {
    "id": 2,
    "title": "Bar",
    "completed": false
  },
  {
    "id": 3,
    "title": "Loo",
    "completed": false
  }
]
```

## Extra #3

In case your application is using a REST API you can also leverage WebdriverIO's [mock capabilities](https://webdriver.io/docs/api/browser/mock). This avoids switching between Protractor and WebDriver code and just makes you use the native WebdriverIO interface.

**Task:** modify your **Extra 2** solution to use a TodoMVC app with a REST API backend, e.g. [https://www.todobackend.com/client/index.html?https://todo-backend-node-koa.herokuapp.com/todos](https://www.todobackend.com/client/index.html?https://todo-backend-node-koa.herokuapp.com/todos), and simplify your script to make use of the [mock](https://webdriver.io/docs/api/browser/mock) command.

Note:

- the app url is now `https://www.todobackend.com/client/index.html?https://todo-backend-node-koa.herokuapp.com/todos`
- the todobackend app uses a slightly outdated TodoMVC app, adjust your element selectors from `$$('.todo')` -> `$$('#todo-list li')` and `$('.todo-count')` to `$('#todo-count')`

If everything is working you should see the app loading ToDos defined in your tests rather than accessing the API.
