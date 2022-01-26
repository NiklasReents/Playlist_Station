import Cookies from "universal-cookie";

export default function UserFormHead(props) {
  const { title, message } = props;
  const cookie = new Cookies();

  return (
    <div className="formhead-container">
      <h1>{title}</h1>
      <span>{message}</span>
    </div>
  );
}
