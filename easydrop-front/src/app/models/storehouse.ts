export class Storehouse {
  idStorehouse: string;
  idSeller: string;
  storehouseName: string;
  storehouseAddress: string;
  sellerName: string;
  imgURL: string;
  xcoord: number;
  ycoord: number;

  constructor(idSeller: string, storehouseName: string, sellerName: string,
              storehouseAddress: string,  xCoord: number, yCoord: number, imgURL: string) {
    this.idSeller = idSeller;
    this.storehouseName = storehouseName;
    this.storehouseAddress = storehouseAddress;
    this.xcoord = xCoord;
    this.ycoord = yCoord;
    this.imgURL = imgURL;
    this.sellerName = sellerName;
  }

  setIdStorehouse(idStorehouse: string) {
    this.idStorehouse = idStorehouse;
  }

  printDetails() {
    alert(this.idSeller + " " + this.storehouseName + " " + this.storehouseAddress + " " +
          this.xcoord + " " + this.ycoord)
  }
}
