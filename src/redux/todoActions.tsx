export const addTodo = (data: string) => {
    return {
      type: "ADD_TODO", // returned type property
      payload: data,
    };
  };