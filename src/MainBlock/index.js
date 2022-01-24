import './index.css';

export const MainBlock = (props) => {
    const text = props.text

    return (
        <div className={"MainBlock"}>
            <div className={"MainBlock-Header"}>
                <div className={"MainBlock-Text"}>{props.title}</div>
                <div className={"MainBlock-Logo"}>Интернет-Провайдер<br/>Пожалуйста-Поставьте-Зачет</div>
            </div>
            <div className={"MainBlock-Info"}>{props.children}</div>
        </div>
    );
}