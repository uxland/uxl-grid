export interface IColumns {
	property: string;
	displayName: string;
	order?: IOrder;
	disabled?: boolean
}

export type IOrder = "ASC" | "DES";
