import {ProductItem} from './product-item.model'
import {Client} from "./Client.model";

export class Caddy{
  public items: Map<number,ProductItem> =new Map()
  public client!:Client;

  constructor(public name:string) {
    this.name=name;
  }
}
