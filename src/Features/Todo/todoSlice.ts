import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Types
interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}
interface TodoState {
  loading: boolean;
  todos: TodoType[];
  error: string;
}

// Axios configuration
const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Async Thunks
export const getAsyncTodos = createAsyncThunk<
  TodoType[],
  void,
  { rejectValue: string }
>("todos/getAsyncTodos", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<TodoType[]>("/todos");
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addAsyncTodo = createAsyncThunk<
  TodoType,
  { title: string },
  { rejectValue: string }
>("todos/addAsyncTodo", async (payload, { rejectWithValue }) => {
  const newTodo = {
    id: Date.now(),
    title: payload.title,
    completed: false,
  };

  try {
    const { data } = await api.post<TodoType>("/todos", newTodo);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const toggleAsyncTodo = createAsyncThunk<
  TodoType,
  { completed: boolean; id: number },
  { rejectValue: string }
>("todos/toggleAsyncTodo", async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.patch<TodoType>(`/todos/${payload.id}`, {
      completed: payload.completed,
    });

    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteAsyncTodo = createAsyncThunk<
  { id: number },
  { id: number },
  { rejectValue: string }
>("todos/deleteAsyncTodo", async (payload, { rejectWithValue }) => {
  try {
    await api.delete<TodoType>(`/todos/${payload.id}`);
    return { id: payload.id };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Todo Slice
const initialState: TodoState = {
  loading: false,
  todos: [],
  error: "",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get TODOS
    builder.addCase(getAsyncTodos.pending, (state) => {
      state.loading = true;
      state.todos = [];
      state.error = "";
    });
    builder.addCase(getAsyncTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    });
    builder.addCase(getAsyncTodos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });

    // Add TODO
    builder.addCase(addAsyncTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(addAsyncTodo.rejected, (state, action) => {
      state.error = action.payload || "Something went wrong";
    });

    // Toggle TODO
    builder.addCase(toggleAsyncTodo.fulfilled, (state, action) => {
      const selectedTodo = state.todos.find(
        (item) => item.id === Number(action.payload.id)
      );
      selectedTodo!.completed = action.payload.completed;
    });
    builder.addCase(toggleAsyncTodo.rejected, (state, action) => {
      state.error = action.payload || "Something went wrong";
    });

    // Delete TODO
    builder.addCase(deleteAsyncTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter(
        (item) => item.id !== Number(action.payload.id)
      );
    });
    builder.addCase(deleteAsyncTodo.rejected, (state, action) => {
      state.error = action.payload || "Something went wrong";
    });
  },
});

export default todoSlice.reducer;
