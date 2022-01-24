import './index.css';
import {Button} from "../Button";
import {Link} from "react-router-dom";

export const InfoField = (props) => {
    const {header, description} = props.info
    const {tariff, index, setTariffState, services, setServicesState, isTariff, isChangeable} = props;


    const OnDelete = () => {
        if(isTariff)
            setTariffState(tariff.filter((value, idx) =>{
                return idx !== index;
            }));
        else
            setServicesState(services.filter((value, idx) =>{
                return idx !== index;
            }));
    }

    return (
        <div className="InfoField">
            <div className="InfoField-Text">
                <div className="InfoField-Header">{header}</div>
                <div className="InfoField-Description">{description}</div>
            </div>
            <div className="InfoField-Action">
                <div className="InfoField-Change">
                    {(isChangeable) ? <Link to={"/changeTariff"}><Button type={"change"}>Изменить</Button></Link> : null}
                </div>
                <div className="InfoField-Delete">
                    <Button onClick={OnDelete} type={"action"}>Удалить</Button>
                </div>
            </div>
        </div>
    );
}