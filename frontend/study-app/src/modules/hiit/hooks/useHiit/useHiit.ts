import { HiitPhase } from "@modules/hiit/types";
import { Dispatch, useState } from "react"

export interface UseHiitOptions {}

export interface UseHiitResult {
	phase: HiitPhase|undefined,
	isPlaying: boolean,
	isLastPhase: boolean,
	setPhases: Dispatch<HiitPhase[]|undefined>,
	setIsPlaying: Dispatch<boolean>,
	nextPhase: () => boolean
}

export const useHiit = () : UseHiitResult => {
	const [position, setPosition] = useState(0);
	const [phases, setPhases] = useState<HiitPhase[]|undefined>();
	const [isPlaying, setIsPlaying] = useState(false);

	const phase = phases ? phases[position] : undefined;
	const isLastPhase = phases?.length === position + 1

	const nextPhase = () => {
		if (isLastPhase) return false;
		setPosition(position + 1);
		return true
	};

	return {
		phase,
		isPlaying,
		isLastPhase,
		setPhases,
		setIsPlaying,
		nextPhase,
	}
}