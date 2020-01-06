export type APIState = Readonly<{
  is_loading: boolean,
  loaded_todos: Todo[],
}>;

export type APIFetchFinish = {
  loaded_todos: Todo[]
};

export type Todo = {
  userId: string,
  id: string,
  title: string,
  completed: boolean,
};
