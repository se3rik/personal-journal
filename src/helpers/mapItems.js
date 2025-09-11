export function mapItems(items) {
	if(!items) {
		return [];
	}
	return items.map(item => ({
		...item,
		date: new Date(item.date)
	}));
}
