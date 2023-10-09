import AWS from 'aws-sdk';

const sns = new AWS.SNS();

type SendSnsMessageArgs = {
  message: any;
  topic: string;
};
export const sendSnsMessage = ({ message, topic }: SendSnsMessageArgs) => {
  return sns
    .publish({
      Message: JSON.stringify(message),
      TopicArn: topic,
    })
    .promise();
};
