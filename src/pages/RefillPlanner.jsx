import { useState } from "react";
import refillitems from "../data/refillitems";

export default function RefillPlanner() {

    /* ------------------ STATES ------------------ */
    const [search, setSearch] = useState("");
    const [cart, setCart] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [copied, setCopied] = useState(false);
    const [cleared, setCleared] = useState(false);

    /* ------------------ FILTER ------------------ */
    const filteredItems = refillitems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    )
        .sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())

        );

    /* ------------------ ADD TO CART ------------------ */
    const confirmAdd = () => {
        if (!quantity || quantity <= 0) return;

        const existing = cart.find((c) => c.name === selectedItem.name);

        if (existing) {
            setCart(
                cart.map((c) =>
                    c.name === selectedItem.name
                        ? { ...c, quantity: c.quantity + Number(quantity) }
                        : c
                )
            );
        } else {
            setCart([...cart, { ...selectedItem, quantity: Number(quantity) }]);
        }

        setSelectedItem(null);
        setQuantity("");
    };

    const removeItem = (name) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.name !== name)
        );
    };

    /* ------------------ CLEAR ------------------ */
    const clearCart = () => {
        if (!cart.length) return;

        setCart([]);
        setCleared(true);
        setTimeout(() => setCleared(false), 2000);
    };

    /* ------------------ COPY ------------------ */
    const copyCart = async () => {
        if (!cart.length) return;

        const text = cart
            .map((item) => `${item.name} x${item.quantity}`)
            .join("\n");

        await navigator.clipboard.writeText(text);

        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    /* ------------------ TOTALS ------------------ */
    const totalItems = cart.length;
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 justify-center pt-16 px-4">

            {/* ------------------ TOP SECTION ------------------ */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-5 space-y-4">
                <h2 className="text-lg font-semibold text-center">
                    Vending Machine Refill Planner
                </h2>

                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search item..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-black/30 rounded-full px-4 py-2 text-sm outline-none"
                />

                {/* SCROLLABLE ITEM GRID */}
                <div className="bg-black/30 rounded-xl p-3 max-h-96 overflow-y-auto">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {filteredItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setSelectedItem(item)}
                                className="bg-black/40 rounded-xl p-4 flex flex-col items-center hover:bg-black/50 transition"
                            >
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-16 h-16 object-contain mb-2"
                                />
                                <span className="text-sm text-center">{item.name}</span>
                            </button>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <p className="text-white/40 text-sm text-center py-6">
                            No items found...
                        </p>
                    )}
                </div>
            </div>

            {/* ------------------ CART SECTION ------------------ */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[32px] p-5 space-y-4">
                <h3 className="text-md font-semibold">Your Refill List</h3>

                {/* SCROLLABLE BOX */}
                <div className="bg-black/30 rounded-xl p-3 max-h-48 overflow-y-auto space-y-2">
                    {cart.length === 0 && (
                        <p className="text-white/40 text-sm">
                            No items selected yet...
                        </p>
                    )}

                    {cart.map((item) => (
                        <div
                            key={item.name}
                            className="flex justify-between items-center text-sm bg-black/40 px-3 py-2 rounded-lg"
                        >
                            <span>
                                {item.name} x{item.quantity}
                            </span>

                            <button
                                type="button"
                                onClick={() => removeItem(item.name)}
                                className="ml-3 w-6 h-6 flex items-center justify-center rounded-full 
                       hover:bg-red-500/40 
                       text-red-400 hover:text-red-200 
                       transition-all duration-200"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* TOTALS + BUTTONS */}
                {cart.length > 0 && (
                    <>
                        <div className="text-sm text-white/70 pt-2 border-t border-white/10">
                            <p>Total Unique Items: {totalItems}</p>
                            <p>Total Quantity: {totalQuantity}</p>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={clearCart}
                                className={`flex-1 py-2 rounded-lg text-sm transition-all duration-300 ${cleared
                                    ? "bg-red-600 text-white"
                                    : "bg-red-500/40 hover:bg-red-500/60"
                                    }`}
                            >
                                {cleared ? "Cleared!" : "Clear"}
                            </button>

                            <button
                                onClick={copyCart}
                                className={`flex-1 py-2 rounded-lg text-sm transition-all duration-300 ${copied
                                    ? "bg-green-600 text-white"
                                    : "bg-green-500/40 hover:bg-green-500/60"
                                    }`}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* ------------------ POPUP MODAL ------------------ */}
            {selectedItem && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-80 space-y-4">
                        <h4 className="text-center font-semibold">
                            {selectedItem.name}
                        </h4>

                        <input
                            type="number"
                            min="1"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full bg-black/30 rounded-full px-4 py-2 text-sm outline-none"
                        />

                        <div className="flex gap-3">
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="flex-1 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmAdd}
                                className="flex-1 py-2 rounded-lg bg-green-500/40 hover:bg-green-500/60 text-sm"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}