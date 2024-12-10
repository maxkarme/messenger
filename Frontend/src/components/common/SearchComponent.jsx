import { useEffect, useState } from "react";
import "./SearchComponent.css";

export default function SearchComponent(props) {
    let [filter, setFilter] = useState("");
    let [result, setResult] = useState([]);

    useEffect(() => {
        props.getResult("")
            .then(res => setResult(res));
    }, []);

    function changeHandler(e) {
        setFilter(e.target.value);

        props.getResult(e.target.value)
            .then(res => setResult(res));
    }

    function itemClick(selected) {
        props.onSelect(selected);
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
            </div>
        </>
    )
}