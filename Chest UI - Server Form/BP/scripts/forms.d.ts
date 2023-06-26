
declare class ChestFormData implements Promise<ActionFormResponse> {
	/**
	 * @param size The size of the chest. Can be 'small' or 'large'.
	 */
	constructor(size?: string);
	/**
	 * @remarks This builder method sets the title for the chest ui.
	 * @param text The title text for the chest ui.
	 */
	title(text: string): ChestFormData;
	/**
	 * @remarks Adds a button to this chest ui with an icon from a resource pack.
	 * @param itemName The name of the item to display.
	 * @param itemDesc The item's lore to display.
	 * @param iconPath The icon for the item.
	 */
	button(itemName: string, itemDesc?: string[], iconPath?: string): ChestFormData;
}
export { ChestFormData };