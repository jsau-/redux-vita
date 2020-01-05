export interface ActionObject {
  [key: string]:
    | any
    | {
        type: string;
      };
}
