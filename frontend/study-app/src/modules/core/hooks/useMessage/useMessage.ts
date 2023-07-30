import { useAccessTokenContext } from "@modules/auth/contexts"
import { MessageType } from "@modules/core/types";  
export interface UseMessageOptions {}

export interface UseMessageResult {
	postMessage: (type: MessageType, endpoint?: string) => void;
}

export type MessageHeader = {
  [key: string]: string;
};

export type MessageBody = {
  [key: string]: unknown;
};

export const useMessage = () : UseMessageResult => {
	const accessToken = useAccessTokenContext();
	const headers: MessageHeader = {};

	if (accessToken.isValid) {
		headers["Authorization"] = `Bearer ${accessToken.value}`;
	}

	const postMessage = (
		type: MessageType,
		endpoint?: string,
	) => {

		navigator.serviceWorker.ready.then((registration) => {
			registration?.active?.postMessage({
					type: type,
					headers: headers,
					endpoint: endpoint
			});
		});
	}

	return {
		postMessage
	}
}