const initialState = {
  token: null,
  apiUrl: "https://uxcandy.com/~shapoval/test-task-backend/v2/",
};

const task_storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, token: action.payload.token };
    case "RESET":
      return { ...state, token: null };
    default:
      return { ...state };
  }
};

export default task_storeReducer;
