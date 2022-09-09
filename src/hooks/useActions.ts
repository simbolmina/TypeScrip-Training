import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../state";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
  //first argument of this function is action creators.
  //second argument is dispatch function
  //this function returns an object which contains action creators with dispatch funtions
  //* {searchRepositories: dispatch(searchRepositories)}
};
