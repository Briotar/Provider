import './index.css';

export const Button = (props) => {
    const {type, className, onClick, submit} = props;

    let typeSubmit;
    if(typeSubmit){
        typeSubmit = "submit";
    }

    return (
        <button type={typeSubmit} onClick={onClick} className={`Button Button_type_${type} ${className}`}>{props.children}</button>
    );
}