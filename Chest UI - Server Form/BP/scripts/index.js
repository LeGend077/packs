import { system, world, Player } from '@minecraft/server'
import { ActionFormData } from '@minecraft/server-ui';
/**
 * @param {string} chest_type Type of the Chest: small or large
 * @param {string} title Form Title
 * @param {[[string, string, number]]} buttonsArr Arrays of Buttons and their properties inside an Array.
 * 
 * For Example: [ ["buttontext", "texturepath", "slotspace(space b/w the slots))"], ... ]
 * @param {Player} player Player to show the Form to
 */
function CreateForm(chest_type = "small", title, buttonsArr, player) {
     let form = new ActionFormData()
     if (chest_type == "small") {
          form.title(`§c§h§e§s§t§s§m§a§l§l§r${title}`)
     } else if (chest_type == "large") {
          form.title(`§c§h§e§s§t§l§a§r§g§e§r${title}`)
     }
     buttonsArr.forEach(x => {
          let i = 0
          let slotVal = x[2]
          while (i < slotVal) {
               if (i == (slotVal - 1)) {
                    form.button(x[0], x[1])
                    break;
               }
               form.button("", "")
               i++
          }
     })
     return (form.show(player))
}

world.afterEvents.itemUse.subscribe(event => {
     if (event.itemStack.typeId == "minecraft:compass" && event.itemStack.nameTag == "Teleporter") {

          // This is a bit complicated. The buttons/slots are arrays with 3 elements inside a single array. And their selection Id is the slot they are in from 0-53 / 0-26

          CreateForm("large", "LeGend Form", [
               ["§6PVP §gArena§r", "textures/items/diamond_sword", 21], // 21 ahead from 1st
               ["§dHardcore §rSurvival", "textures/ui/health_boost_effect", 2], // 2 ahead from 21st
               ["§9Hub", "textures/ui/realmsparkle", 2] // 2 ahead from 25
          ], event.source).then(ev => {
               console.warn(ev.selection)
               if (ev.selection == 20) {
                    event.source.runCommand("tp @s 174.57 -60.00 -71.51")
               } else if (ev.selection == 22) {
                    event.source.runCommand("tp @s 187.59 -60.00 -71.40")
               } else if (ev.selection == 24) {
                    event.source.runCommand("tp @s 181.42 -60.00 -71.38")
               }
          })
     } else { return; }
})