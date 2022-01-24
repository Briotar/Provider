import './index.css';

export const Input = (props) => {
    const {title, onChange, value} = props;

    return (
        <div className="InputWrapper">
            <div className="InputName">{title}</div>
            <input className={'Input'}
                   type={"text"}
                   onChange={onChange}
            />
        </div>
    );
}