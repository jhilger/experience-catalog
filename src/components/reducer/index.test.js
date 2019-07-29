/* env jest */
import reducer from ".";
import defaultState from "../defaultState";

test("Check to see if I can get a reducer returns correct state", () => {
  const dispatchAction = action => [action].reduce(reducer, defaultState);
  const state = dispatchAction({
    type: "CONT/Id",
    payload: {
      Id: "BOBBIN"
    }
  });
  expect(state.contactId).toBeDefined();
});
