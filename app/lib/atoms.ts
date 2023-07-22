import { atom } from "jotai";

export const cartAtom = atom([]);
export const emailAtom = atom("");
export const addressAtom = atom("");
export const countryAtom = atom("");
export const nameAtom = atom("");
export const secondNameAtom = atom("");
export const zipcodeAtom = atom("");
export const cityAtom = atom("");
export const numberAtom = atom("");
export const summaryPriceAtom = atom(0);

export const currentStepAtom = atom("information");
export const checkoutAtom = atom([]);
export const isAuthenticatedAtom = atom(false);
