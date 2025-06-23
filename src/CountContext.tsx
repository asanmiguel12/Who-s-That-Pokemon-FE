import { createContext, type Dispatch, type SetStateAction } from "react";

interface CountContextType {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export const CountContext = createContext<CountContextType>({
                                                              count: 0,
                                                              setCount: () => {}
                                                            });