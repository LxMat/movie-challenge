import React from "react";
//might be useful if props are sent too deep. it is simpler than flux.

const GameContext = React.createContext({});

export const GameProvider = GameContext.Provider;
export const GameConsumer = GameContext.Consumer;
