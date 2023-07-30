import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {  itemsCount } from "../common/selectors";

const Form = () => {
    const ref = useRef();
    const [list, setList] = useRecoilState(listState);
    const [all, setAll] = useRecoilState(allState);
    const [input, setInput] = useRecoilState(inputValue);
    const filtering = useSetRecoilState(filterState);
    const isVisible = useRecoilValue(itemsCount);

    const onSubmit = (e) => {
      e.preventDefault();
      if (!input) {
        return false;
      }
      const newItem = {
        id: new Date().getMilliseconds(),
        task: input,
        done: false,
      };
      setAll([...all, newItem]);
      setList([...list, newItem]);
      setInput("");
      ref.current.value = null;
    };
    const show = (e) => filtering(e.target.checked);
    
    const archive = () => {
      const all_filtered = all.filter((item) => !item.done);
      const filtered = list.filter((item) => !item.done);
      setList(filtered);
      setAll(all_filtered);
    };

    
    return (
      <form onSubmit={onSubmit} className="mb-4">
        <input
          ref={ref}
          className="form-control mb-4"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="d-flex justify-content-between">
          <div className="form-check">
            <input
              id="show"
              type="checkbox"
              className="form-check-input"
              onChange={show}
            />
            <label className="form-check-label" for="show">
              {" "}
              show completed
            </label>
          </div>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            style={{ visibility: `${isVisible ? "visible" : "hidden"} ` }}
            onClick={archive}
          >
            archive completed
          </button>
        </div>
      </form>
    );
  }
);
export default Form;
