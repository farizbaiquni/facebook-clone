export function formatRelativeTime(sqlDate: string): string {
  const now = Date.now();
  const date = new Date(sqlDate).getTime();

  const diffInSeconds = Math.floor((now - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return diffInMinutes === 1
      ? `${diffInMinutes} minute ago`
      : `${diffInMinutes} minutes ago`;
  } else if (diffInHours < 24) {
    return diffInHours === 1
      ? `${diffInHours} hour ago`
      : `${diffInHours} hours ago`;
  } else if (diffInDays < 30) {
    return diffInDays === 1
      ? `${diffInDays} day ago`
      : `${diffInDays} days ago`;
  } else if (diffInYears < 1) {
    return diffInMonths === 1
      ? `${diffInMonths} month ago`
      : `${diffInMonths} months ago`;
  } else {
    return diffInYears === 1
      ? `${diffInYears} year ago`
      : `${diffInYears} years ago`;
  }
}
