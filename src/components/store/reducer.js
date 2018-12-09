import * as actionTypes from "./action_types";

const initialState = {
  users: [],
  markers: [],
  piechart: [["User Name", "Posts", "userId"]],
  posts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USERS:
      return {
        ...state,
        users: action.payload
      };

    case actionTypes.FETCH_POSTS:
      return {
        ...state,
        posts: action.payload
      };

    case actionTypes.ADD_MARKERS:
      return {
        ...state,
        markers: [...state.markers, action.payload]
      };

    case actionTypes.REMOVE_MARKERS:
      return {
        ...state,
        markers: state.markers.filter(item => item.userId !== action.payload)
      };

    case actionTypes.ADD_ALL_MARKERS:
      const users = state.users;
      return {
        ...state,
        markers: users.map(user => ({ ...user.address.geo, userId: user.id }))
      };

    case actionTypes.REMOVE_ALL_MARKERS:
      return {
        ...state,
        markers: []
      };

    case actionTypes.ADD_PIE:
      const postsOfUser = state.posts.filter(
        item => item.userId === action.userId
      );
      return {
        ...state,
        piechart: [
          ...state.piechart,
          [action.name, postsOfUser.length, action.userId]
        ]
      };

    case actionTypes.REMOVE_PIE:
      return {
        ...state,
        piechart: state.piechart.filter(item => item[2] !== action.userId)
      };

    case actionTypes.ADD_ALL_PIE:
      let pieData = [["User Name", "Posts", "userId"]];
      state.users.forEach(user => {
        const postOfUser = state.posts.filter(item => item.userId === user.id);
        pieData.push([user.name, postOfUser.length, user.id]);
      });
      return {
        ...state,
        piechart: pieData
      };

    case actionTypes.REMOVE_ALL_PIE:
      return {
        ...state,
        piechart: [["User Name", "Posts", "userId"]]
      };

    default:
      return state;
  }
};

export default reducer;
