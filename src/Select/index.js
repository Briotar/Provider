import './index.css';

export const Select = (props) => {
    const options = props.options;
    const placeholder = props.placeholder;

    const {onChange, value} = props;

    return (
        <select size="1" className={"Select"} onChange={onChange}>
            <option disabled selected> {placeholder} </option>
            {options.map((value) => {
                return (
                    <option value={value}>{value}</option>
                );
            })}
        </select>
    );
}