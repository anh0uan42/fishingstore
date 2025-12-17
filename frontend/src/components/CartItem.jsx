import { useDispatch } from "react-redux"
import { updateQuantity, removeItem, updateAmountQuantity } from "../features/slices/cartSlice"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

function CartItem({ item }) {

    const dispatch = useDispatch()
    const increaseAmount = () => {
        dispatch(updateQuantity({ id: item._id, quantity: 1 }))
    }
    const decreaseAmount = () => {
        dispatch(updateQuantity({ id: item._id, quantity: -1 }))
    }

    const [amount, setAmount] = useState(item.quantity)
    
  return (
    <div className="rounded-lg border p-4 shadow-sm border-gray-700 bg-gray-800 md:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
            <div className="shrink-0 md:order-1">
                <img className="h-20 md:h-32 rounded object-cover" src={item.image} />
            </div>
            <label className="sr-only" >Choose quantity:</label>
            <div className="flex flex-col items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center gap-2">
                    <button
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95"
                        onClick={decreaseAmount}
                    >
                        <Minus className="text-gray-300"/>
                    </button>
                    <div>
                        <input
                            type='text'
                            className="w-5 text-center"
                            value={amount}
                            placeholder={item.quantity}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        
                    </div>
                    <button
                        className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95"
                        onClick={increaseAmount}
                    >
                        <Plus className="text-gray-300"/>
                    </button>
                </div>
                <button
                    className="shrink-0 px-2 my-2 items-center justify-center rounded-md bg-emerald-700 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 active:scale-95"
                    onClick={() => dispatch(updateAmountQuantity({ id: item._id, newQuantity: amount}))}
                >
                    Update amount
                </button>
            </div>
        </div>
    </div>
  )
}

export default CartItem
