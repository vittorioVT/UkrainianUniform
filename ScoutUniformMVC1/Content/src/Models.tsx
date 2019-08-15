export interface ProductModel {

    Id: number;
    Name: string;
    Description: string;
    Picture: string;
    Price: number;
    Quantity: number;
}

export interface IAppState {
    items: ProductModel[];
    myOrder: ProductModel[];
    showPopup: boolean;
    userId: number;
    orderPlaced: boolean;
}