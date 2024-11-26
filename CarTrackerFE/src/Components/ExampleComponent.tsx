import { HelloResponse } from "../hooks/useHelloWorld";

interface Props {
  messageFromServer?: HelloResponse;
}

export const ExampleComponent = ({ messageFromServer }: Props) => (
  <div>{messageFromServer?.message}</div>
);
