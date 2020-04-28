declare type NVPair<V = string> = { name: string; value: V };

declare type PromiseResult<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never;

declare type ResultOf<T extends () => any> = ReturnType<T> extends Promise<
  infer R
>
  ? R
  : ReturnType<T>;
