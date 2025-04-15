export function getAutocompleteOptionId(index: number) {
  return `ac-item-${index}`;
}

export function getActiveDescendent(focusedIndex: number) {
  if (focusedIndex >= 0) {
    return getAutocompleteOptionId(focusedIndex);
  }
  return undefined;
}
