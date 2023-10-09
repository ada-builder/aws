type FormatMessage = {
  action?: string;
  content: any;
  resource?: string;
};

export const formatMessage = ({
  action = 'notification',
  content,
  resource = 'system',
}: FormatMessage) => ({
  action: `${resource}:${action}`,
  content,
});
