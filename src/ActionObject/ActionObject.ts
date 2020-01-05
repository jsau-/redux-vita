interface ActionObject {
  [key : string]: any | {
    type: string;
  }
};

export default ActionObject;
