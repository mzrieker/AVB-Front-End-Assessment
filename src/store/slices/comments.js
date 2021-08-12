import {
  createSlice,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { fetchComments, mockComments } from "../api";

export const name = "comments";

const generateTopThreeCommenters = (comments) => {
  // first make a dictionary with all the commenters names as the keys
  // as we make the dictionary count up the comments
  const countNames = [...comments].reduce((prev, curr) => {
    if (!prev[curr.name]) return { ...prev, [curr.name]: 1 };
    return { ...prev, [curr.name]: prev[curr.name] + 1 };
  }, {});

  // decided not to import a new package for sorting as this case was pretty simple
  // we sort by count descending, then we take the top 3, then we map it to a simple structure of name and count
  return Object.entries(countNames)
    .sort((a, b) => b.count - a.count)
    .slice(0, 3)
    .map(([key, value]) => ({ name: key, count: value }));
};

const initialState = {
  comments: [],
  topThreeCommenters: [],
};

// try to get the data from
export const loadComments = createAsyncThunk(
  `${name}/loadComments`,
  (arg, thunkAPI) =>
    fetchComments().catch((err) => thunkAPI.rejectWithValue(mockComments))
);

const commentsSlice = createSlice({
  name,
  initialState,
  reducers: {
    // when adding a comment, update the topThreeCommenters at the same time
    addComment(state, action) {
      const { name, comment } = action.payload;
      state.comments = [
        ...state.comments,
        { id: state.comments.length + 1, name, comment },
      ];
      state.topThreeCommenters = generateTopThreeCommenters(state.comments);
    },
  },
  extraReducers: {
    // when done loading from the api, update the comments and topThreeCommenters
    [loadComments.fulfilled]: (state, action) => {
      state.comments = [...action.payload];
      state.topThreeCommenters = generateTopThreeCommenters(action.payload);
    },
    [loadComments.rejected]: (state, action) => {
      state.comments = [...action.payload];
      state.topThreeCommenters = generateTopThreeCommenters(action.payload);
    },
  },
});

const getSlice = (state) => state[name] || {};

export const getComments = createSelector(getSlice, (slice) => slice.comments);

export const getTopThreeCommenters = createSelector(
  getSlice,
  (slice) => slice.topThreeCommenters
);

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
