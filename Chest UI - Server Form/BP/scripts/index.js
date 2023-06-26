import { system, world, Player } from '@minecraft/server'
import { ChestFormData } from "forms.js"

world.afterEvents.itemUse.subscribe(event => {
     if (event.itemStack.typeId == "minecraft:compass" && event.itemStack.nameTag == "Teleporter") {

          let form = new ChestFormData()
          .title("LeGend Form")
          .button("Test Item", ["test lore", "test lore 1"], "textures/items/apple", 4)
          .show(event.source).then(response => {
               console.warn(response.selection)
          })
          
     } else { return; }
})
