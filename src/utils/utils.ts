import unorm from "unorm";

export function naturalize(str: string) {
  str = unorm.nfd(str).replace(/[\u0300-\u036f]/g, "");
  str = str.toLowerCase();
  str = str.replace(/[^\w\d]/gi, "");
  return str;
}
