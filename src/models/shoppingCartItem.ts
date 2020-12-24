export class ShoppingCartItem {
  itemId: string;
  name: string;
  price: number;
  amount: number;

  constructor(itemId: string, name: string, price: number, amount: number) {
    this.itemId = itemId;
    this.name = name;
    this.price = price;
    this.amount = amount;
  }

  public incrementAmount(): void {
    this.amount++;
  }

  public decrementAmount(): void {
    if ( this.amount != 1 ) {
      this.amount--;
    }
  }

}
