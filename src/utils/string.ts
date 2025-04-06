import unorm from "unorm";

export function naturalize(value: string) {
  value = unorm.nfd(value).replace(/[\u0300-\u036f]/g, "");
  value = value.toLowerCase();
  value = value.replace(/[^\w\d]/gi, "");
  return value;
}

export function capitalize(value: string) {
  if (!value) return "";
  value = String(value);
  return value[0].toUpperCase() + value.slice(1);
}
