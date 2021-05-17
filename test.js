const { remote } = require("webdriverio");
const { default: $ } = require("webdriverio/build/commands/browser/$");
const {
  default: selectByAttribute,
} = require("webdriverio/build/commands/element/selectByAttribute");

let browser;

(async () => {
  browser = await remote({
    capabilities: {
      browserName: "chrome",
    },
  });

  await browser.url("https://todomvc.com/examples/vue/");
  const input = await browser.$(".new-todo");
  //await input.setValue(["Milk", "Enter"]);
  //await input.setValue(["Banana", "Enter"]);
  //await input.setValue(["Cherry", "Enter"]);

  await input.setValue(["Milk", "Enter", "Banana", "Enter", "Cherry", "Enter"]);

  const todos = await browser.$$(".todo-list li");
  const toggle = await todos[1].$(".toggle");
  await toggle.click();

  const counter = await browser.$(".todo-count strong");
  console.log(await counter.getText());

  await browser.pause(2000);

  // close browser if something in our code went wrong
  await browser.deleteSession();
})().catch(async (e) => {
  console.error(e);
});
