export class InsertItem {
  sellerId: number;
  sellerEmail: string;
  price: number;
  itemName: string;
  imageUrl: string;

  constructor(sellerId: number, sellerEmail: string, price: number, itemName: string, imageUrl: string) {
    this.sellerId = sellerId;
    this.sellerEmail = sellerEmail;
    this.price = price;
    this.itemName = itemName;
    this.imageUrl = imageUrl;
  }
}
