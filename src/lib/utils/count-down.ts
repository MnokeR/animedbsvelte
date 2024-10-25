function calculateTime(totalSeconds: number) {
	const days = Math.floor(totalSeconds / (24 * 60 * 60));
	totalSeconds %= 24 * 60 * 60;
	const hours = Math.floor(totalSeconds / (60 * 60));
	totalSeconds %= 60 * 60;
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return { days, hours, minutes, seconds };
}

export function countDown(
	totalSeconds: number,
	onTick: (time: { days: number; hours: number; minutes: number; seconds: number }) => void
) {
	const startTime = Date.now();

	function tick() {
		const elapsed = Math.floor((Date.now() - startTime) / 1000);
		const remainingTime = totalSeconds - elapsed;

		if (remainingTime >= 0) {
			const { days, hours, minutes, seconds } = calculateTime(remainingTime);
			onTick({ days, hours, minutes, seconds });
			setTimeout(tick, 1000);
		} else {
			onTick({ days: 0, hours: 0, minutes: 0, seconds: 0 });
		}
	}
	tick();
}
