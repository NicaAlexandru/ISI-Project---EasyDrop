export class Product {
  idProduct: string;
  idSeller: string;
  idStorehouse: string;
  storehouseName: string;
  productName: string;
  productDescription: string;
  productPrice:number;

  constructor(idSeller: string, idStorehouse: string, storehouseName: string,
              productName: string, productDescription: string, productPrice: number) {
    this.idSeller = idSeller;
    this.idStorehouse = idStorehouse;
    this.storehouseName = storehouseName;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productPrice = productPrice;
  }

  setProductId(idProduct: string) {
    this.idProduct = idProduct;
  }
}
