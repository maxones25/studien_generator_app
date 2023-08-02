import { HiitConfig, HiitPhase } from "@modules/hiit/types";
import { Dispatch, useState } from "react"

export interface UseHiitOptions {}

export interface UseHiitResult {
	phase: HiitPhase|undefined,
	isPlaying: boolean,
	isLastPhase: boolean,
	setPhases: Dispatch<HiitPhase[]|undefined>,
	setIsPlaying: Dispatch<boolean>,
	nextPhase: () => boolean,
	createPhases: (value: HiitConfig) => void,
}

export const useHiit = () : UseHiitResult => {
	const [position, setPosition] = useState(0);
	const [phases, setPhases] = useState<HiitPhase[]|undefined>();
	const [isPlaying, setIsPlaying] = useState(false);

	const createPhases = (config: HiitConfig) => {
		const phases: HiitPhase[] = [];
		const warmUpPhase = {
			time: config.warmUp,
			name: 'warm up',
			description: 'warm up description'
		};
		const highIntensityPhase = {
			time: config.highIntensity,
			name: 'high intensity',
			description: 'high intensity description'
		};
		const lowIntensityPhase = {
			time: config.lowIntensity,
			name: 'low intensity',
			description: 'low intensity description',
		};
		const coolDownPhase = {
			time: config.coolDown,
			name: 'cool down',
			description: 'cool down description',
		}
		phases[0] = warmUpPhase;
		for (let i = 0; i < config.repetitions; i++) {
			phases.push(i % 2 === 0 ? highIntensityPhase : lowIntensityPhase);
		};
		phases.push(coolDownPhase);
		console.log(phases)
		setPhases(phases);
	}

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
		createPhases,
	}
}