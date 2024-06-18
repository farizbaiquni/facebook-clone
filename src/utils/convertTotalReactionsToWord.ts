export function convertTotalReactionsToWord(reactions: number): string {
  if (reactions < 1000) {
    return reactions.toString();
  } else if (reactions >= 1000 && reactions < 1000000) {
    return (reactions / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else if (reactions >= 1000000 && reactions < 1000000000) {
    return (reactions / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (reactions >= 1000000000) {
    return (reactions / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  } else {
    return reactions.toString();
  }
}
