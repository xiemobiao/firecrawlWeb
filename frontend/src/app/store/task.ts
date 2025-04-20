import { createSlice, createAsyncThunk, configureStore, PayloadAction } from '@reduxjs/toolkit'; // 导入 Redux Toolkit 相关函数，用于创建 slice、异步 action 和存储配置
import { useDispatch as useDispatchHook, useSelector as useSelectorHook, TypedUseSelectorHook } from 'react-redux'; // 导入 react-redux 的钩子，用于创建类型化 dispatch 和 selector
import { api } from '../services/api'; // 导入 API 服务，用于处理 HTTP 请求和数据交互

// 定义 Task 接口，描述任务对象的结构，包括 ID、名称、状态等属性
interface Task {
  id: number; // 任务的唯一标识 ID，由服务器分配
  name: string; // 任务的名称，用户输入
  status: string; // 任务的当前状态，如 'pending' (等待中)、'running' (运行中)、'completed' (完成) 或 'failed' (失败)
  // 可以添加其他属性，如 URL、进度、创建时间等，以扩展任务功能，例如 url: string; progress: number;
}

// 定义 State 接口，描述 Redux 状态的结构，包括任务列表、异步操作状态和错误消息
interface State {
  tasks: Task[]; // 存储任务列表的数组，包含所有任务对象
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // 异步操作的状态，表示操作的当前阶段
  error: string | null; // 存储错误消息，如果异步操作失败
}

// 导出 AppDispatch 和 RootState 类型，用于组件中类型推断，确保类型安全
export type AppDispatch = typeof store.dispatch; // AppDispatch 类型，定义存储的 dispatch 类型
export type RootState = ReturnType<typeof store.getState>; // RootState 类型，定义存储的状态类型

// 创建异步 action: fetching 任务列表，从服务器获取任务数据
export const fetchTasks = createAsyncThunk('task/fetchTasks', async () => {
  const response = await api.get('/tasks'); // 向服务器发送 GET 请求获取任务列表，假设 API 端点为 /tasks
  return response.data; // 返回服务器响应数据，作为 fulfilled payload
});

// 创建异步 action: 创建新任务，向服务器发送新任务数据
export const createTask = createAsyncThunk('task/createTask', async (newTask: Omit<Task, 'id'>, thunkAPI) => {
  try {
    const response = await api.post('/tasks', newTask); // 向服务器发送 POST 请求创建新任务，假设 API 端点为 /tasks
    return response.data; // 返回创建成功后的任务数据
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to create task'); // 处理错误，返回错误值，使用 rejectWithValue
  }
});

// 初始状态定义，设置默认值
const initialState: State = {
  tasks: [], // 初始任务列表为空数组
  status: 'idle', // 初始状态为空闲，表示无操作正在进行
  error: null, // 初始错误消息为 null
};

// 创建 Slice 管理 reducer 和 action
const taskSlice = createSlice({
  name: 'task', // Slice 名称，用于标识 reducer
  initialState, // 初始状态对象
  reducers: {
    updateTask: (state, action: PayloadAction<{ id: number; updates: Partial<Task> }>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id); // 查找任务在数组中的索引基于 ID
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload.updates }; // 更新指定任务的属性，使用展开运算符合并更新
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'; // 设置状态为加载中，表示数据 fetching 正在进行
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'; // 设置状态为成功
        state.tasks = action.payload; // 更新任务列表为 fetching 到的数据
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'; // 设置状态为失败
        state.error = action.error.message as string || 'Failed to fetch tasks'; // 设置错误消息
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // 添加新任务到列表
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed'; // 设置状态为失败
        state.error = action.payload as string || 'Failed to create task'; // 设置错误消息
      });
  },
});

// 导出 action
export const { updateTask } = taskSlice.actions; // 导出 updateTask action，用于组件中更新任务状态

// 配置 Redux 存储
export const store = configureStore({
  reducer: taskSlice.reducer, // 使用 taskSlice 管理的 reducer
});

// 自定义钩子，用于类型化 dispatch 和 selector
export const useAppDispatch = () => useDispatchHook<AppDispatch>(); // 创建 useAppDispatch 钩子，类型化 dispatch 函数，确保组件中 dispatch 类型正确
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelectorHook; // 创建 useAppSelector 钩子，类型化 selector 函数，确保组件中 selector 类型正确