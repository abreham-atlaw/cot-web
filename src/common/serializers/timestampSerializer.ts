import Serializer from "./serializer";

export default class TimeStampSerializer extends Serializer<Date, number> {
  
  serialize(instance: Date): number {
    return instance.getTime();
  }

  public deserialize(timestamp: number): Date {
    return new Date(timestamp * 1000);
  }

  
}