describe("My Vue.js example application", () => {
  it("should be able to complete ToDos", async () => {
    await browser.url("https://todomvc.com/examples/vue/");

    const input = await browser.$(".new-todo");

    await input.setValue([
      "ToDo #1",
      "Enter",
      "ToDo #2",
      "Enter",
      "ToDo #3",
      "Enter",
    ]);

    await browser.pause(2000);

    const todos = await browser.$$(".todo-list li");
    const toggle = await todos[1].$(".toggle");
    await toggle.click();

    const counter = await browser.$(".todo-count strong");
    console.log(await counter.getText());

    const todoCount = await $(".todo-count");
    await expect(todoCount).toHaveText("2 items left");
  });
});
