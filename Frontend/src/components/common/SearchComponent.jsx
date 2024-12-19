import { useEffect, useState } from "react";
import "./SearchComponent.css";

export default function SearchComponent(props) {
    let [filter, setFilter] = useState("");
    let [result, setResult] = useState([]);
    let [page, setPage] = useState(0);

    useEffect(() => {
        props.getResult("", page, 3)
            .then(res => setResult(res));
    }, []);

    function changeHandler(e) {
        setFilter(e.target.value);
        setResult([]);
        setPage(0);

        props.getResult(e.target.value, 0, 3)
            .then(res => setResult(res));
    }

    function itemClick(selected) {
        props.onSelect(selected);
    }

    function load(e) {
        e.preventDefault();

        props.getResult(filter, page + 1, 3)
            .then(res => setResult([...result, ...res]));

        setPage(p => p + 1);
        
    }

    return (
        <>
            <input type="text" className="search__input" onChange={changeHandler} value={filter}/>
            <div className="search__result">
                {result.map(res => (
                    <div className="search__item" key={res.id}
                        onClick={itemClick.bind(null, res)}>
                        <p className="search__item-text">{res.text}</p>
                    </div>
                ))}
                {result.length > 0 && <button className="search__load" onClick={load}>Зугрузить ещё</button>}
            </div>
        </>
    )
}