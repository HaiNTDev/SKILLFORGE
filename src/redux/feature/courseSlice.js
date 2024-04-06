import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  chapters: [
    {
      name: null,
      lessons: [
        {
          name: "",
          link: "",
          // quiz: [],
        },
      ],
    },
  ],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    // addNewChapter: (state, action) => {
    //   state.chapters.push(action.payload);
    // },
  },
});

export const { addNewChapter } = courseSlice.actions;

export default courseSlice.reducer;
