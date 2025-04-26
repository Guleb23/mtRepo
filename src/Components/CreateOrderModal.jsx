import React from "react";

export default function CreateOrderModal({ open, onClose, onSubmit }) {
    const [address, setAddress] = React.useState("");
    const [kadastrNumber, setKadastrNumber] = React.useState("");

    if (!open) return null;

    const handleSubmit = () => {
        if (address && kadastrNumber) {
            onSubmit({ address, kadastrNumber });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
                <h2 className="text-xl font-semibold mb-4">Для создания заказа необходимы следующие данные:</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Адрес</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Введите адрес"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Кадастровый номер</label>
                        <input
                            type="text"
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Введите кадастровый номер"
                            value={kadastrNumber}
                            onChange={(e) => setKadastrNumber(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6 space-x-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Создать заказ
                    </button>
                </div>
            </div>
        </div>
    );
}
