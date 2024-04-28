import { create } from "zustand"

interface SearchModalStore {
    isOpen: boolean,
    onOpen: () => void,
    onClose: () => void
}
1
const useSearchModal = create<SearchModalStore>((set) => ({
    isOpen: false,
    onClose: () => set({isOpen: false}),
    onOpen: () => set({isOpen: true})
}))

export default useSearchModal