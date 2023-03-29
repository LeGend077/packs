import {
	world,
	system,
	Player,
	MinecraftEntityTypes,
	DynamicPropertiesDefinition,
	EntityInventoryComponent,
	MinecraftDimensionTypes
} from "@minecraft/server"

system.events.beforeWatchdogTerminate.subscribe(ev => {
	ev.cancel = true
})

world.events.worldInitialize.subscribe(event => {
	let properties = new DynamicPropertiesDefinition()
	properties.defineNumber("homeCoordinatesX")
	properties.defineNumber("homeCoordinatesY")
	properties.defineNumber("homeCoordinatesZ")
	properties.defineString("dimension", 100)

	event.propertyRegistry.registerEntityTypeDynamicProperties(properties, MinecraftEntityTypes.player)
})

const IdtoDimension = function(id) {
	this.convert = function() {
		if (id === MinecraftDimensionTypes.overworld) {
			return world.getDimension("overworld")
		}
		if (id === MinecraftDimensionTypes.nether) {
			return world.getDimension("nether")
		}
		if (id === MinecraftDimensionTypes.theEnd) {
			return world.getDimension("the_end")
		}
	}
}

/**
 * @param {Player} player
 */

const PlayerMethods = {
	getCurrentItem(player) {
		/**
		 * @type {EntityInventoryComponent}
		 */
		let component = player.getComponent("inventory")
		let inventory = component.container

		return inventory.getItem(player.selectedSlot)
			.typeId
	},
	getName(player) {
		return player.name
	}
}

const IdtoName = function(id) {
	this.convert = function() {
		if (id === MinecraftDimensionTypes.overworld) {
			return "The Overworld"
		}
		if (id === MinecraftDimensionTypes.nether) {
			return "The Nether"
		}
		if (id === MinecraftDimensionTypes.theEnd) {
			return "The End"
		}
	}
}

// world.events.playerSpawn.subscribe(event => {
//     if (event.initialSpawn) {
//         event.player.setDynamicProperty("homeCoordinatesX", Math.floor(event.player.location.x))
//         event.player.setDynamicProperty("homeCoordinatesY", Math.floor(event.player.location.x))
//         event.player.setDynamicProperty("homeCoordinatesZ", Math.floor(event.player.location.x))
//         event.player.setDynamicProperty("dimension", event.player.dimension.id)
//     } else { return }
// })

world.events.blockBreak.subscribe(event => {
	/**
	 * @type {EntityInventoryComponent}
	 */
	let inv = event.player.getComponent("inventory")
	try {
		if (inv.container.getItem(event.player.selectedSlot)
			.typeId == "home:potion_bottle_teleport_full" || inv.container.getItem(event.player.selectedSlot)
			.typeId == "home:potion_bottle_teleport_half" && event.player.typeId === "minecraft:player") {
			event.player.setDynamicProperty("homeCoordinatesX", Math.floor(event.player.getBlockFromViewDirection()
				.location.x))
			event.player.setDynamicProperty("homeCoordinatesY", Math.floor(event.player.getBlockFromViewDirection()
				.location.y + 1))
			event.player.setDynamicProperty("homeCoordinatesZ", Math.floor(event.player.getBlockFromViewDirection()
				.location.z))
			event.player.setDynamicProperty("dimension", event.player.dimension.id)
			event.player.sendMessage(`§6${PlayerMethods.getName(event.player)}§r, Your Home Potion Teleport Location is set to: §g${event.player.getDynamicProperty("homeCoordinatesX")}§r, §g${event.player.getDynamicProperty("homeCoordinatesY")}§r, §g${event.player.getDynamicProperty("homeCoordinatesZ")}§r in ${new IdtoName(event.player.getDynamicProperty("dimension")).convert()}.`)
		} else {
			return
		}
	} catch (err) {
		return err
	}
})

world.events.itemCompleteCharge.subscribe(event => {
	if ((event.itemStack.typeId === "home:potion_bottle_teleport_full" || event.itemStack.typeId === "home:potion_bottle_teleport_half") && event.source.typeId === "minecraft:player") {

		/**
		 * @type {EntityInventoryComponent}
		 */
		event.source.runCommandAsync("particle home:teleport_particle ~ ~1 ~")
		event.source.runCommandAsync("playsound portal.travel @s ~~~ 0.7 2 0.7")
		const run = system.runInterval(() => {
			try {
				event.source.sendMessage("Teleporting...")
				event.source.teleport({
						x: event.source.getDynamicProperty("homeCoordinatesX"),
						y: event.source.getDynamicProperty("homeCoordinatesY"),
						z: event.source.getDynamicProperty("homeCoordinatesZ")
					}, new IdtoDimension(event.source.getDynamicProperty("dimension"))
					.convert(), 1, 1)
				event.source.runCommandAsync("playsound random.pop2 @s ~~~ 1 1 1")
			} catch (err) {
				event.source.sendMessage("Break a Block to set the Teleport Location before Using!")
			} finally {
				system.clearRun(run)
			}
		}, 60)

	} else {
		return
	}
})