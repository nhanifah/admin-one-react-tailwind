import { mdiTrashCan } from "@mdi/js";
const OptionSoal = () => {
    return (
        <>
        <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Pilihan Jawaban</h3>
    <ul className="grid w-full gap-6 md:grid-cols-1">
        <li>
            <input type="radio" id="hosting-small" name="hosting" value="hosting-small" className="hidden peer" required />
            <label className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                <div className="block">
                    <div className="w-full">Pilihan 1</div>
                    <div className="w-full text-lg font-semibold">Hitler mati di garut</div>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-red-500 rounded-full">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
                        <path fill="currentColor" d={mdiTrashCan} />
                    </svg>
                </div>
            </label>
        </li>
    </ul>
    </>
    )
}

export default OptionSoal