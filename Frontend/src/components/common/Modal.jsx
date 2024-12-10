import "./Modal.css";

export default function Modal(props) {
    let wrapClass = "wrap ";
    if(props.hidden == true) wrapClass += "wrap_hidden";

    function wrapClick(e) {
        if(!e.target.classList.contains("wrap")) return;
        props.wrapClick();
    }

    return (
        <div className={wrapClass} onClick={wrapClick}>
            {props.children}
        </div>
    )
}