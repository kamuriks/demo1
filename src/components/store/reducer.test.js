import reducer from "./reducer";
import * as actionTypes from "./action_types";

describe("reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      users: [],
      markers: [],
      piechart: [["User Name", "Posts", "userId"]],
      posts: []
    });
  });
});
