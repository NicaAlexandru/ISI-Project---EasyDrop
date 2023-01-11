export class Storehouse {
  idStorehouse: string;
  idSeller: string;
  storehouseName: string;
  storehouseAddress: string
  xCoord: number;
  yCoord: number;

  constructor(idStorehouse: string, idSeller: string, storehouseName: string,
              storehouseAddress: string,  xCoord: number, yCoord: number) {
    this.idStorehouse = idStorehouse;
    this.idSeller = idSeller;
    this.storehouseName = storehouseName;
    this.storehouseAddress = storehouseAddress;
    this.xCoord = xCoord;
    this.yCoord = yCoord;
  }

  setIdStorehouse(idStorehouse: string) {
    this.idStorehouse = idStorehouse;
  }
}
