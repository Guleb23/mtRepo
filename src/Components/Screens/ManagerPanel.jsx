const ManagerPanel = ({ text }) => {
    console.log(text);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Панель менеджера</h1>
            <p>Здесь будут специальные функции для менеджеров</p>
            <p>{text}</p>
        </div>
    );
};

export default ManagerPanel;