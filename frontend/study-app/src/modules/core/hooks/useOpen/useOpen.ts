import { useState } from "react";

export interface UseOpenResult {
	isOpen: boolean;
	open: VoidFunction;
	close: VoidFunction;
}

export const useOpen = (initialState: boolean) : UseOpenResult => {
	const [isOpen, setOpen] = useState(initialState);

	const open = () => setOpen(true);
	const close = () => setOpen(false);

	return {
		isOpen,
		open,
		close,
	}
}