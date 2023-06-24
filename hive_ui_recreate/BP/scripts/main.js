import { world, system, EntityInventoryComponent, EntityHealthComponent } from "@minecraft/server"
import { ActionFormData } from "@minecraft/server-ui"

world.beforeEvents.itemUse.subscribe(ev => {
    let a = system.run(() => {
        if (ev.item.typeId === "minecraft:stick" && ev.source.typeId === "minecraft:player") {
        let form = new ActionFormData()
            .body("§bWhere would you like to go?§r Choose from our selection of games or a quick travel location.")
            .title("HIVE GAMES")
            .button("SKYWARS", "textures/items/diamond_sword")
            .button("MURDER MYSTERY", "textures/items/iron_sword")
            .button("SKYWARS KITS", "textures/items/feather")
            .button("TREASURE WARS", "textures/items/blaze_rod")
            .button("JUST BUILD", "textures/items/beetroot")
            .button("HIDE AND SEEK", "textures/items/amethyst_shard")
            .button("DEATH RUN", "textures/items/netherite_sword")
            .button("CUSTOM 1", "textures/ui/wtf")
            .button("CUSTOM 2", "textures/ui/wtf")
            .button("CUSTOM 3", "textures/ui/wtf")
            .button("CUSTOM 4", "textures/ui/wtf")
            .button("CUSTOM 5", "textures/ui/wtf")
            .show(ev.source).then(res => {
                if (res.selection === 2) {
                    world.sendMessage("2nd")
                }
            })
    }
        system.clearRun(a)
    })
})
