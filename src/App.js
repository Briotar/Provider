import './App.css';
import {Button} from "./Button/index.js";
import {Input} from "./Input/index.js";
import {Select} from "./Select";
import {InfoField} from "./IndoField";
import {BackgroundRectangle} from "./BackgroundRectangle";
import {MainBlock} from "./MainBlock";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useState} from "react";

const options = [
    "kek",
    "lol",
]

function App() {
    const [tariffState, setTariffState] = useState([]);
    const [servicesState, setServicesState] = useState([]);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [select, setSelect] = useState("");
    const [nameService, setNameService] = useState("");
    const [surnameService, setSurnameService] = useState("");

    const [isFirstRender, setIsFirstRender] = useState(true);

    if (isFirstRender) {
        fetch('http://localhost:8081/tariff', {
            method: 'GET'
        }).then((res) => {
            res.json().then((json) => {
                setTariffState(json);
            });
        });
        fetch('http://localhost:8081/services', {
            method: 'GET'
        }).then((res) => {
            res.json().then((json) => {
                setServicesState(json);
            });
        });
        setIsFirstRender(false);
    }


    const setTariff = (tariffList, type) => {
        console.log(tariffList);
        if (type === 'delete') {
            fetch('http://localhost:8081/delete/tariff', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(tariffList)
            });
        } else if (type === 'add') {
            fetch('http://localhost:8081/add/tariff', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(tariffList)
            });
        } else {
            fetch('http://localhost:8081/change/tariff', {
                method: 'PUT',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(tariffList)
            });
        }

        setTariffState(tariffList);
    }

    const setServices = (servicesList, type) => {
        console.log(servicesList);
        if (type === 'delete') {
            fetch('http://localhost:8081/delete/services', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(servicesList)
            });
        } else if (type === 'add') {
            fetch('http://localhost:8081/add/services', {
                method: 'POST',
                headers: {'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify(servicesList)
            });
        }

        setServicesState(servicesList);
    }

    const onSubmitAddForm = (event) => {
        event.preventDefault();
        const array = tariffState.map((value) => {return value;});
        array.push(
            {header: name, description: `${surname} ${select}`}
        );

        setTariff(array);
    };

    const onSubmitAddFormService = (event) => {
        event.preventDefault();
        const array = servicesState.map((value) => {return value;});
        array.push(
            {header: nameService, description: surnameService}
        );

        setServices(array);
    };

    const onChangeName = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }

    const onChangeSurname = (event) => {
        event.preventDefault();
        setSurname(event.target.value);
    }

    const onChangeSelect = (event) => {
        event.preventDefault();
        setSelect(event.target.value);
    }

    const onChangeNameService = (event) => {
        event.preventDefault();
        setNameService(event.target.value);
    }

    const onChangeSurnameService = (event) => {
        event.preventDefault();
        setSurnameService(event.target.value);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={
                        <MainBlock title={"Список тарифов"}>
                            <div className={"MainBlock-InfoField"}>
                                {tariffState.map((value, index) => {
                                    return (
                                        <InfoField
                                            key={index}
                                            info={{header: value.header, description: value.description}}
                                            index={index}
                                            tariff={tariffState}
                                            setTariffState={setTariff}
                                            isTariff={1}
                                            isChangeable={1}
                                        />
                                    );
                                })}
                            </div>
                            <div className={"MainBlock-Buttons"}>
                                <Link to={"/services"}><Button>Список услуг</Button></Link>
                                <Link to={"/tariff"}><Button>Добавить тариф</Button></Link>
                            </div>
                        </MainBlock>
                    }/>
                    <Route path={"/tariff"} element={
                        <MainBlock title={"Добавление тарифа"}>
                            <form onSubmit={onSubmitAddForm} className={"FormSize"}>
                                <div className={"MainBlock-InfoField"}>
                                    <BackgroundRectangle>
                                        <Input title={"Название"}
                                               onChange={onChangeName}
                                        />
                                        <Input title={"Стоимость"}
                                               onChange={onChangeSurname}
                                        />
                                        <Select options={options}
                                                placeholder={"Выбор услуги"}
                                                onChange={onChangeSelect}
                                        />
                                    </BackgroundRectangle>
                                        <div className={"MainBlock-Buttons"}>
                                            <Link to={"/"}><Button>Назад</Button></Link>
                                            <Button submit={true}>Добавить тариф</Button>
                                         </div>
                                </div>
                            </form>
                        </MainBlock>
                    }/>
                    <Route path={"/services"} element={
                        <MainBlock title={"Список услуг"}>
                            <div className={"MainBlock-InfoField"}>
                                {servicesState.map((value, index) => {
                                    return (
                                        <InfoField
                                            key={index}
                                            info={{header: value.header, description: value.description}}
                                            index={index}
                                            services={servicesState}
                                            setServicesState={setServices}
                                        />
                                    );
                                })}
                            </div>
                            <div className={"MainBlock-Buttons"}>
                                <Link to={"/"}><Button>Назад</Button></Link>
                                <Link to={"/newService"}><Button>Добавить услугу</Button></Link>
                            </div>
                        </MainBlock>
                    }/>
                    <Route path={"/newService"} element={
                        <MainBlock title={"Добавление услуги"}>
                            <form onSubmit={onSubmitAddFormService} className={"FormSize"}>
                                <div className={"MainBlock-InfoField"}>
                                    <BackgroundRectangle>
                                        <Input title={"Название"}
                                               onChange={onChangeNameService}
                                        />
                                        <Input title={"Описание"}
                                               onChange={onChangeSurnameService}
                                        />
                                    </BackgroundRectangle>
                                        <div className={"MainBlock-Buttons"}>
                                            <Link to={"/services"}><Button>Назад</Button></Link>
                                            <Button submit={true}>Добавить услугу</Button>
                                        </div>
                                </div>
                            </form>
                        </MainBlock>
                    }/>
                    <Route path={"/changeTariff"} element={
                        <MainBlock title={"Изменение тарифа"}>
                            <form onSubmit={onSubmitAddForm} className={"FormSize"}>
                                <div className={"MainBlock-InfoField"}>
                                        <BackgroundRectangle>
                                        <Input title={"Название"}
                                               onChange={onChangeName}
                                        />
                                        <Input title={"Стоимость"}
                                               onChange={onChangeSurname}
                                        />
                                        <Select options={options}
                                                placeholder={"Выбор услуги"}
                                                onChange={onChangeSelect}
                                        />
                                       </BackgroundRectangle>
                                        <div className={"MainBlock-Buttons"}>
                                            <Link to={"/"}><Button>Назад</Button></Link>
                                            <Button submit={true}>Изменить тариф</Button>
                                        </div>
                                </div>
                            </form>
                        </MainBlock>
                    }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
