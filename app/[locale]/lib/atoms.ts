import { atom } from "jotai";

export const cartAtom = atom([]);
export const formAtom = atom({
  email: "",
  firstName: "",
  secondName: "",
  country: "",
  address: "",
  zipCode: "",
  city: "",
  phoneNumber: "",
});
export const numberAtom = atom("");
export const summaryPriceAtom = atom(0);

export const currentStepAtom = atom("information");
export const checkoutAtom = atom([]);
export const isAuthenticatedAtom = atom(false);

export const searchQueryAtom = atom("");
