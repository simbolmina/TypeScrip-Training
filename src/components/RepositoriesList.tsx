import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { actionCreators } from "../state";
import { useActions } from "../hooks/useActions";
// import { useSelector } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  // const dispatch = useDispatch();
  const { SearchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    // const { data, error, loading } = useSelector(
    // (state: any) => state.repositories
    (state) => state.repositories
  );

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // dispatch(actionCreators.SearchRepositories(term) as any);
    SearchRepositories(term);
    //we are using a custom hook for this event submit.
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input value={term} onChange={changeHandler} />
        <button>Search</button>
      </form>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      {!error && !loading && data.map((name) => <div key={name}>{name}</div>)}
    </div>
  );
};

export default RepositoriesList;
