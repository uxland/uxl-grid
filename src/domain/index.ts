export interface IColumns {
	property?: string;
	displayName?: string;
	renderCell?: (item: any) => any;
	order?: IOrder;
	disabled?: boolean
}

export type IOrder = "ASC" | "DES";
