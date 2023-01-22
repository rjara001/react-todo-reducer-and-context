import {
  toDoReducer,
  initialState,
  addAction,
  markAction,
  deleteAction
} from "./todo";

describe("Todo", function() {
  it("no change to state", function() {
    const taskList = toDoReducer(initialState, { type: "none" });
    expect(taskList).toEqual(initialState);
  });

  it("add a task", function() {
    const taskList = toDoReducer(initialState, addAction("hello world"));
    expect(taskList).toEqual([
      ...initialState,
      { name: "hello world", done: false }
    ]);
  });

  it("mark a task as done", function() {
    const taskList = toDoReducer(initialState, addAction("hello world"));
    const afterDone = toDoReducer(taskList, markAction(1, true));
    expect(afterDone).toEqual([
      ...initialState,
      { name: "hello world", done: true }
    ]);
  });

  it("undo task as done", function() {
    const taskList = toDoReducer(initialState, markAction(0, true));
    const afterUndo = toDoReducer(taskList, markAction(0, false));
    expect(afterUndo).toEqual(initialState);
  });

  it("remove task from list", function() {
    const taskList = toDoReducer(initialState, addAction("hello world"));
    const afterDelete = toDoReducer(taskList, deleteAction(0));
    expect(afterDelete).toEqual([{ name: "hello world", done: false }]);
  });
});
