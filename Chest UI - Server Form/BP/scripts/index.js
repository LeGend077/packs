import { world } from '@minecraft/server'
import { ChestFormData } from './extensions/forms.js';

world.afterEvents.itemUse.subscribe(event => {
	const player = event.source;
	if (event.itemStack.typeId == "minecraft:compass") {
		const form = new ChestFormData('large')
			.title('Testing')
			.button('Test Item', ['Test lore', 'Test lore 2'], 'textures/items/stick', 4)
			.show(player).then(response => {
				if (response.canceled) return;
				console.warn(response.selection)
			})
	}
});