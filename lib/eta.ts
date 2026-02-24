export function etaWindow(scheduledAt: Date) {
  const start = new Date(scheduledAt.getTime() - 30 * 60 * 1000);
  const end = new Date(scheduledAt.getTime() + 30 * 60 * 1000);
  return `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
