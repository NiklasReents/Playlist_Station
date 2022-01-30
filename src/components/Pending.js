export default function Pending(props) {
  const { bodyState } = props;
  return (
    <tr id="pending">
      <td>
        <strong>{bodyState}</strong>
      </td>
    </tr>
  );
}
