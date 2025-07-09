export const parseDuration = (duration: string): number => {
	const trimmed = duration.trim().toLowerCase();

	if (!trimmed) {
		return 0;
	}

	const timeUnits: { [key: string]: number } = {
		ms: 1,
		s: 1000,
		sec: 1000,
		second: 1000,
		seconds: 1000,
		m: 60 * 1000,
		min: 60 * 1000,
		minute: 60 * 1000,
		minutes: 60 * 1000,
		h: 60 * 60 * 1000,
		hr: 60 * 60 * 1000,
		hour: 60 * 60 * 1000,
		hours: 60 * 60 * 1000,
		d: 24 * 60 * 60 * 1000,
		day: 24 * 60 * 60 * 1000,
		days: 24 * 60 * 60 * 1000
	};

	return trimmed.split(/\s+/).reduce((total, part) => {
		// Handle decimal numbers and more flexible unit matching
		const match = part.match(/^(\d+(?:\.\d+)?)([a-z]+)$/);
		if (match) {
			const value = parseFloat(match[1]);
			const unit = match[2];

			// Check if unit exists in timeUnits
			if (unit in timeUnits) {
				return total + value * timeUnits[unit];
			}
		}

		return total;
	}, 0);
};
