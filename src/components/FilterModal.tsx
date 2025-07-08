interface FilterModalProps {
    isOpen: boolean;
    closeModal: () => void;
    minPrice: number;
    maxPrice: number;
    minPopularity: number;
    maxPopularity: number;
    setMinPrice: (value: number) => void;
    setMaxPrice: (value: number) => void;
    setMinPopularity: (value: number) => void;
    setMaxPopularity: (value: number) => void;
    handleFilter: () => void;
}

function FilterModal({
                         isOpen,
                         closeModal,
                         minPrice,
                         maxPrice,
                         minPopularity,
                         maxPopularity,
                         setMinPrice,
                         setMaxPrice,
                         setMinPopularity,
                         setMaxPopularity,
                         handleFilter,
                     }: FilterModalProps) {
    if (!isOpen) return null;

    const onApply = () => {
        handleFilter();
        closeModal();
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black opacity-50 z-40"
                onClick={closeModal}
            ></div>

            <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
                <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md pointer-events-auto">
                    <h2 className="text-xl font-avenir-book mb-4">Filter Products</h2>

                    <div className="space-y-6">
                        <div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-montserrat-medium mb-1">Min Price</label>
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={e => setMinPrice(Number(e.target.value))}
                                        className="border rounded p-1 w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-montserrat-medium mb-1">Max Price</label>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={e => setMaxPrice(Number(e.target.value))}
                                        className="border rounded p-1 w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="block text-xs font-montserrat-medium mb-1">Min Popularity</label>
                                    <input
                                        type="number"
                                        value={minPopularity}
                                        onChange={e => setMinPopularity(Number(e.target.value))}
                                        className="border rounded p-1 w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-montserrat-medium mb-1">Max Popularity</label>
                                    <input
                                        type="number"
                                        value={maxPopularity}
                                        onChange={e => setMaxPopularity(Number(e.target.value))}
                                        className="border rounded p-1 w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onApply}
                            className="px-4 py-2 bg-black text-white rounded"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FilterModal;