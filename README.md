# Packs

Download Chest Form UI: [https://bstlar.com/~e/chest-ui](https://bstlar.com/~e/chest-ui)

### Find every creation of mine created for MC Bedrock

**Packs**:
_Because of the scripting changes, some of the packs are not guaranteed to run properly!_
_Deprecated Packs are not working/out of support._

- Extra Recipes
- F1  and F8 (Deprecated)
- Half a Heart Hardcore
- LeGend's Better UI (Deprecated)
- LeGend's Dark UI Pack
- LeGend's UI Pack (Deprecated) (Old Version, New not available Open Source)
- Project LeGend UI Pack (Deprecated)
- Home Potion

- Chest UI - Server Form
It is originally created by me. But **@Herobrine643928** contributed the form scripts and stack size, player inventory, and few changes to UI.

Herobrine64 has written the Description and Usage (this is a copy): [https://github.com/Herobrine643928/Chest-UI](https://github.com/Herobrine643928/Chest-UI)

A Minecraft: Bedrock Script API pack that alters the Action Form UI to look & function like a chest does.

# Benefits

- As fast as vanilla forms
- Java-style UIs
- Cursor-following hover text
- Easy to read
- Good for large numbers of buttons

Note that the inventory section of the form is simply for display, and does not reflect the actual player's inventory. Hopefully coming soon!

Also note that custom UI retextures will not affect these UIs, as they are controlled by `RP/textures/ui/generic_27.png` & `RP/textures/ui/generic_54.png`.

# Usage
Import into file- this example will work for any top-level file. Changes will be needed for nested files.
```js
import { ChestFormData } from './extensions/forms.js';
```

Create a new chest form, like you would for any other form UI. The size can be left out, and will default to `'small'`.
```js
const form = new ChestFormData()
```

Add a name to the UI, to display at the top.
```js
form.title('Form Title')
```
Add buttons!
```js
form.button(0, 'Button Name', ['Button Lore'], 'textures/button', 6)
```
The parameters for the button are as follows:
1. Location. The slot that the item will display in, starting from zero. Max of 26 for a small chest, or 53 for a large.
2. Name. The name of the button.
3. Lore. An array of strings which will display below the item's name.
4. Texture. A texture path that the item will reference. Some options are `textures/items/amethyst_shard`, or `textures/blocks/sponge`. Note that block textures will display as a flat texture rather than a 3D mini-block, like they do in the inventory.
5. Stack size. This is an optional parameter, and will default to 1. Displays a small number in the lower right-hand corner- useful for shops selling multiple of an item at once!

Show it to the player & get a response
```js
form.show(player).then(response)
```

![image](https://github.com/LeGend077/packs/assets/98607285/5d84f1f5-f688-482f-b97b-48dde5d5f189)
![image](https://github.com/LeGend077/packs/assets/98607285/5662673a-2cda-40c1-b768-ef5111ef2525)

- Hive UI Recreated by Me
> I made so it does not work.
> For those losers who will say: "Can I use it?", "How to make like this?".
> It is unoptimized and badly coded as it was speedran by me in 2 hrs 31 mins.
![image](https://user-images.githubusercontent.com/98607285/232242344-ce7ab808-cf5a-4dab-ad19-ff91fdaccd9e.png)

- Recipe Book UI

![image](https://github.com/LeGend077/packs/assets/98607285/c4b6b822-6558-4b7e-83eb-aab54ea9041e)



### Usage Conditions

**You are permitted to:**

- **Examine the code and works to learn more about the creation and development of add-ons.**
- Change the code or works to suit your needs.
- Use the add-on packs as you see fit in-game.

**You are NOT permitted to:**

- Negate the accreditation of the original author.
- Paste the direct download link, negating the this page.
- Take the author's code, works, and textures just to republish them as your own.

