export async function sendFeedback(message: string): Promise<void> {
  const emailBody = encodeURIComponent(message);
  const mailtoLink = `mailto:jcmarketmindsconsulting@gmail.com?subject=SwapNest Feedback&body=${emailBody}`;
  
  // Open default email client
  window.location.href = mailtoLink;
}