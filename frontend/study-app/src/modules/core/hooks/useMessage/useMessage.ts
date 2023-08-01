import { MessageType } from "@modules/core/types";  
export interface UseMessageOptions {}

export interface UseMessageResult {
	postMessage: (type: MessageType) => void;
}

export const useMessage = () : UseMessageResult => {

	const postMessage = (
		type: MessageType,
	) => {
		navigator.serviceWorker.ready.then((registration) => {
			registration?.active?.postMessage({
					type: type,
			});
		});
	}

	return {
		postMessage
	}
}